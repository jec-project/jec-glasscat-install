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

import { TestSuite, Test, TestSorters, BeforeAll, AfterAll, Async } from "jec-juta";
import { expect } from "chai";
import { SingletonError, LoggerProxy } from "jec-commons";
import { CreateMetadataTask } from "../../../../../../src/com/onsoft/glasscat/install/tasks/CreateMetadataTask";
import { InstallTaskError } from "../../../../../../src/com/onsoft/glasscat/install/exceptions/InstallTaskError";
import * as fs from "fs";
import * as path from "path";

// utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/CreateMetadataTaskTestUtils";

@TestSuite({
  description: "Test the CreateMetadataTask class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class CreateMetadataTaskTest {
  
  public task:CreateMetadataTask = null;

  @BeforeAll()
  public initTest():void {
    utils.deleteTestFolders();
    this.task = new CreateMetadataTask();
  }

  @AfterAll()
  public resetTest():void {
    this.task = null;
    utils.deleteTestFolders();
  }

  @Test({
    description: "should return 'null'",
    order: 0
  })
  public getPropertiesTypeTest():void {
    expect(this.task.getProperties()).to.be.null;
  }

  @Test({
    description: "should create a new 'metadata.json' file",
    order: 1
  })
  public runTest(@Async done:Function):void {
    this.task.setProperties({ path:utils.PATH } )
    this.task.run((errors:InstallTaskError[])=>{
      expect(
        fs.existsSync(
          path.join(process.cwd() + utils.PATH + "/metadata.json"))
        ).to.be.true;
      done();
    });
  }
}