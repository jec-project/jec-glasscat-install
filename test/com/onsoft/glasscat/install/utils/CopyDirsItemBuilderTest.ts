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
import { CopyDirsItemBuilder } from "../../../../../../src/com/onsoft/glasscat/install/utils/CopyDirsItemBuilder";
import { CopyDirsItem } from "../../../../../../src/com/onsoft/glasscat/install/utils/CopyDirsItem";

@TestSuite({
  description: "Test the CopyDirsItemBuilder class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class CopyDirsItemBuilderTest {
  
  public builder:CopyDirsItemBuilder = null;
  public readonly SRC:string = "path/to/src";
  public readonly DEST:string = "path/to/dest";

  @BeforeAll()
  public initTest():void {
    this.builder = new CopyDirsItemBuilder();
  }

  @Test({
    description: "should return an instance of the CopyDirsItem class",
    order: 0
  })
  public buildTest():void {
    expect(
      this.builder.build(this.SRC, this.DEST)
    ).to.be.an.instanceOf(CopyDirsItem);
  }
  
  @Test({
    description: "should return an instance of the CopyDirsItem class with the correct 'src' property value",
    order: 1
  })
  public srcTest():void {
    let item:CopyDirsItem = this.builder.build(this.SRC, this.DEST);
    expect(item.src).to.equal(this.SRC);
  }
  
  @Test({
    description: "should return an instance of the CopyDirsItem class with the correct 'dest' property value",
    order: 2
  })
  public destTest():void {
    let item:CopyDirsItem = this.builder.build(this.SRC, this.DEST);
    expect(item.dest).to.equal(this.DEST);
  }
}