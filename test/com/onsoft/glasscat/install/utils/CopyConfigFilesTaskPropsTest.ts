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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { CopyConfigFilesTaskProps } from "../../../../../../src/com/onsoft/glasscat/install/utils/CopyConfigFilesTaskProps";

@TestSuite({
  description: "Test the CopyConfigFilesTaskProps class properties"
})
export class CopyConfigFilesTaskPropsTest {
  
  public props:CopyConfigFilesTaskProps = null;

  @BeforeAll()
  public initTest():void {
    this.props = new CopyConfigFilesTaskProps();
  }

  @Test({
    description: "should have a 'src' property not 'null'"
  })
  public srcTest():void {
    expect(this.props).to.have.property("src");
  }
}