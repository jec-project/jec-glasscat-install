//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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

import { TestSuite, Test, BeforeAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { InstallTaskRunner } from "../../../../../src/com/onsoft/glasscat/install/InstallTaskRunner";
import { InstallTaskError } from "../../../../../src/com/onsoft/glasscat/install/exceptions/InstallTaskError";

@TestSuite({
  description: "Test the InstallTaskRunner class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class InstallTaskRunnerTest {

  public runner:InstallTaskRunner = null;

  @BeforeAll()
  public initTest():void {
    this.runner = new InstallTaskRunner();
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
  
}