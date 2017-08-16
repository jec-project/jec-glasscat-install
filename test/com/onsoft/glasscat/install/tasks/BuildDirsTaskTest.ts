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

import { TestSuite, Test, TestSorters, BeforeAll, AfterAll, Async } from "jec-juta";
import { expect } from "chai";
import { SingletonError, LoggerProxy } from "jec-commons";
import { BuildDirsTask } from "../../../../../../src/com/onsoft/glasscat/install/tasks/BuildDirsTask";
import { InstallTaskError } from "../../../../../../src/com/onsoft/glasscat/install/exceptions/InstallTaskError";
import { BuildDirsTaskProps } from "../../../../../../src/com/onsoft/glasscat/install/utils/BuildDirsTaskProps";
import * as fs from "fs";

// utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/BuildDirsTaskTestUtils";

@TestSuite({
  description: "Test the BuildDirsTask class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class BuildDirsTaskTest {
  
  public task:BuildDirsTask = null;

  @BeforeAll()
  public initTest():void {
    this.task = new BuildDirsTask();
    utils.deleteTestFolders();
  }

  @AfterAll()
  public resetTest():void {
    this.task = null;
    utils.deleteTestFolders();
  }

  @Test({
    description: "should return an instance of the BuildDirsTaskProps class",
    order: 0
  })
  public getPropertiesTypeTest():void {
    expect(this.task.getProperties()).to.be.an.instanceOf(BuildDirsTaskProps);
  }
  
  @Test({
    description: "should return an object that contains a list of directories to create",
    order: 1
  })
  public getPropertiesDefaultTest():void {
    let props:any = this.task.getProperties();
    expect(props.directories).to.be.an("array");
  }
  
  @Test({
    description: "should return the correct list of directories to create",
    order: 2
  })
  public directoryListTest():void {
    let dirs:string[] = this.task.getProperties().directories;
    let dirsString:string = dirs.join();
    dirs = utils.DIRECTORIES;
    let len:number = dirs.length;
    let dir:string = null;
    while(len--) {
      dir = dirs[len];
      expect(dirsString).to.contain(dir);
    }
  }
  
  @Test({
    description: "should override the list of directories to create",
    order: 3
  })
  public setPropertiesTest():void {
    let newProps:any = {
      directories: utils.NEW_DIRECTORIES
    };
    let doAddProps:Function = function():boolean {
      this.task.setProperties(newProps);
      return true;
    };
    expect(doAddProps.apply(this)).to.be.ok;
  }
  
  @Test({
    description: "should return the new list of directories to create",
    order: 4
  })
  public getPropertiesTest():void {
    expect(
      this.task.getProperties().directories
    ).to.equal(utils.NEW_DIRECTORIES);
  }

  @Test({
    description: "should create the directories specified in the properties object",
    order: 5
  })
  public runTest(@Async done:Function):void {
    this.task.run((errors:InstallTaskError[])=>{
      expect(fs.existsSync(utils.PATH)).to.be.true;
      expect(fs.existsSync(utils.PATH + "/inner-folder")).to.be.true;
      done();
    });
  }
}