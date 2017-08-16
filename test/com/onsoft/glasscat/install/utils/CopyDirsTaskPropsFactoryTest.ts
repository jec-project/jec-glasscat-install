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
import { CopyDirsTaskPropsFactory } from "../../../../../../src/com/onsoft/glasscat/install/utils/CopyDirsTaskPropsFactory";
import { CopyDirsTaskProps } from "../../../../../../src/com/onsoft/glasscat/install/utils/CopyDirsTaskProps";
import { CopyDirsItem } from "../../../../../../src/com/onsoft/glasscat/install/utils/CopyDirsItem";

// utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/CopyDirsTaskPropsFactoryTestUtils";

@TestSuite({
  description: "Test the CopyDirsTaskPropsFactory class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class CopyDirsTaskPropsFactoryTest {
  
  public props:CopyDirsTaskPropsFactory = null;

  @BeforeAll()
  public initTest():void {
    this.props = new CopyDirsTaskPropsFactory();
  }

  @Test({
    description: "should return an instance of the CopyDirsTaskProps class",
    order: 0
  })
  public createInstanceOfTest():void {
    expect(this.props.create()).to.be.an.instanceOf(CopyDirsTaskProps);
  }
  
  @Test({
    description: "should contains an array composed of 2 items",
    order: 1
  })
  public itemsDefaultNumTest():void {
    expect(
      this.props.create().items
    ).to.have.a.lengthOf(utils.DEFAULT_ITEMS_NUM);
  }
  
  @Test({
    description: "should contains an array composed of 2 CopyDirsItem instances",
    order: 2
  })
  public itemsDefaultTypeTest():void {
    let items:Array<any> = this.props.create().items;
    expect(items[0]).to.be.an.instanceOf(CopyDirsItem);
    expect(items[1]).to.be.an.instanceOf(CopyDirsItem);
  }
  
  @Test({
    description: "should return the correct list of default CopyDirsItem instances",
    order: 2
  })
  public itemsDefaultTest():void {
    let items:Array<CopyDirsItem> = this.props.create().items;
    let item:CopyDirsItem = items[0];
    expect(item.dest).to.equal(utils.ITEM_1.dest);
    expect(item.src).to.equal(utils.ITEM_1.src);
    item = items[1];
    expect(item.dest).to.equal(utils.ITEM_2.dest);
    expect(item.src).to.equal(utils.ITEM_2.src);
  }
}