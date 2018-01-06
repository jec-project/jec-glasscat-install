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

import { TestSuite, Test, BeforeAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { ConfigFilePathSolver } from "../../../../../../src/com/onsoft/glasscat/install/utils/ConfigFilePathSolver";
import { FilePath } from "../../../../../../src/com/onsoft/glasscat/install/utils/FilePath";

@TestSuite({
  description: "Test the ConfigFilePathSolver class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class ConfigFilePathSolverTest {
  
  public solver:ConfigFilePathSolver = null;
  public readonly FILE_REF:string = "app+foo+bar+name.ext";

  @BeforeAll()
  public initTest():void {
    this.solver = new ConfigFilePathSolver();
  }

  @Test({
    description: "should return an instance of the FilePath class",
    order: 0
  })
  public extractFilePathTest():void {
    expect(
      this.solver.extractFilePath(this.FILE_REF)
    ).to.be.an.instanceOf(FilePath);
  }
  
  @Test({
    description: "should return a FilePath object with the correct file name",
    order: 1
  })
  public nameTest():void {
    expect(
      this.solver.extractFilePath(this.FILE_REF).name
    ).to.equal("name.ext");
  }
  
  @Test({
    description: "should return a FilePath object with the correct file path",
    order: 2
  })
  public pathTest():void {
    expect(
      this.solver.extractFilePath(this.FILE_REF).path
    ).to.equal("/app/foo/bar/");
  }
}