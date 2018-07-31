//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import { TestSuite, Test, BeforeAll, TestSorters, Async } from "jec-juta";
import { LoggerProxy } from "jec-commons";
import { expect } from "chai";
import * as sinon from "sinon";
import { InstallTaskRunner } from "../../../../../src/com/onsoft/glasscat/install/InstallTaskRunner";
import { InstallTaskError } from "../../../../../src/com/onsoft/glasscat/install/exceptions/InstallTaskError";
import { InstallLogger } from "../../../../../src/com/onsoft/glasscat/install/logging/InstallLogger";
import { InstallTask } from "../../../../../src/com/onsoft/glasscat/install/core/InstallTask";

// utilities:
import { FakeTask1 } from "../../../../../utils/test-utils/classes/FakeTask1";
import { FakeTask2 } from "../../../../../utils/test-utils/classes/FakeTask2";
import { FailTask } from "../../../../../utils/test-utils/classes/FailTask";

@TestSuite({
  description: "Test the InstallTaskRunner class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class InstallTaskRunnerTest {

  public runner:InstallTaskRunner = null;
  public task1:InstallTask = null;
  public task2:InstallTask = null;
  public errorTask:InstallTask = null;

  @BeforeAll()
  public initTest():void {
    this.runner = new InstallTaskRunner();
    this.task1 = new FakeTask1();
    this.task2 = new FakeTask2();
    this.errorTask = new FailTask();
  }

  @Test({
    description: "should return an empty array of tasks",
    order: 0
  })
  public getTasksDefaultTest():void {
    expect(this.runner.getTasks()).to.have.a.lengthOf(0);
  }

  @Test({
    description: "should invoke the callback method with an empty errors list",
    order: 1
  })
  public runTasksEmptyTest():void {
    this.runner.runTasks((errors:InstallTaskError[])=>{
      expect(errors).to.have.a.lengthOf(0);
    });
  }
  
  @Test({
    description: "should invoke the logger proxy when the process starts",
    order: 2
  })
  public logStartTest():void {
    const logger:LoggerProxy = InstallLogger.getInstance();
    const spy:any = sinon.spy(logger, "log");
    this.runner.runTasks((errors:InstallTaskError[])=>{
      sinon.assert.calledWith(spy, "running tasks:");
      sinon.restore();
    });
  }
  
  @Test({
    description: "should add the specified array of tasks to the task runner in reverse order",
    order: 3
  })
  public addTasksTest():void {
    const tasks:InstallTask[] = [ this.task1, this.task2 ];
    this.runner.addTasks(tasks);
    const result:InstallTask[] = this.runner.getTasks();
    expect(result[0]).to.equal(this.task2);
    expect(result[1]).to.equal(this.task1);
  }
  
  @Test({
    description: "should invoke the callback method with no errors",
    order: 4
  })
  public runTasksTest(@Async done:Function):void {
    this.runner.runTasks((errors:InstallTaskError[])=>{
      expect(errors).to.have.a.lengthOf(0);
      done();
    });
  }
  
  @Test({
    description: "should invoke the run() method for each task",
    order: 5
  })
  public runTest(@Async done:Function):void {
    const spy1:any = sinon.spy(this.task1, "run");
    const spy2:any = sinon.spy(this.task2, "run");
    this.runner.runTasks((errors:InstallTaskError[])=>{
      sinon.assert.calledOnce(spy1);
      sinon.assert.calledOnce(spy2);
      sinon.restore();
      done();
    });
  }
  
  @Test({
    description: "should add the new array of tasks to the task runner",
    order: 6
  })
  public addAdditionalTasksTest():void {
    const tasks:InstallTask[] = [ this.errorTask ];
    this.runner.addTasks(tasks);
    const result:InstallTask[] = this.runner.getTasks();
    expect(result).to.contain(this.errorTask);
    expect(result).to.contain(this.task1);
    expect(result).to.contain(this.task2);
  }
  
  @Test({
    description: "should invoke the callback method with one error",
    order: 7
  })
  public runTasksErrorTest(@Async done:Function):void {
    this.runner.runTasks((errors:InstallTaskError[])=>{
      expect(errors).to.have.a.lengthOf(1);
      done();
    });
  }
}