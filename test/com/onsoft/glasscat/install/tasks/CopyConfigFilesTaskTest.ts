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
import { CopyConfigFilesTask } from "../../../../../../src/com/onsoft/glasscat/install/tasks/CopyConfigFilesTask";
import { InstallTaskError } from "../../../../../../src/com/onsoft/glasscat/install/exceptions/InstallTaskError";
import { CopyConfigFilesTaskProps } from "../../../../../../src/com/onsoft/glasscat/install/utils/CopyConfigFilesTaskProps";
import * as fs from "fs";

// utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/CopyConfigFilesTaskTestUtils";

@TestSuite({
  description: "Test the CopyConfigFilesTask class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class CopyConfigFilesTaskTest {
  
  public task:CopyConfigFilesTask = null;

  @BeforeAll()
  public initTest():void {
    utils.deleteTestFolders();
    this.task = new CopyConfigFilesTask();
  }

  @AfterAll()
  public resetTest():void {
    this.task = null;
    utils.deleteTestFolders();
  }

  @Test({
    description: "should return an instance of the CopyConfigFilesTaskProps class",
    order: 0
  })
  public getPropertiesTypeTest():void {
    expect(
      this.task.getProperties()
    ).to.be.an.instanceOf(CopyConfigFilesTaskProps);
  }
  
  @Test({
    description: "should return a string that represents the path to the source directory to copy",
    order: 1
  })
  public getPropertiesDefaultTest():void {
    let props:any = this.task.getProperties();
    expect(props.src).to.be.a("string");
  }
   
  @Test({
    description: "should return the correct path to the source directory to copy",
    order: 2
  })
  public srcTest():void {
    let props:any = this.task.getProperties();
    expect(props.src).to.equal(utils.SRC);
  }
  
  @Test({
    description: "should override the path to the source directory to copy",
    order: 3
  })
  public setPropertiesTest():void {
    let newProps:any = {
      src: utils.NEW_SRC
    };
    let doAddProps:Function = function():boolean {
      this.task.setProperties(newProps);
      return true;
    };
    expect(doAddProps.apply(this)).to.be.ok;
  }
  
  @Test({
    description: "should return the new path to the source directory to copy",
    order: 4
  })
  public getPropertiesTest():void {
    expect(this.task.getProperties().src).to.equal(utils.NEW_SRC);
  }

  @Test({
    description: "should copy the files from the path specified in the properties object to their destination",
    order: 5
  })
  public runTest(@Async done:Function):void {
    utils.createTestFolders();
    this.task.run((errors:InstallTaskError[])=>{
      expect(fs.existsSync(utils.PATH + "/file.json")).to.be.true;
      expect(fs.existsSync(utils.PATH + "/file.xml")).to.be.true;
      done();
    });
  }
}