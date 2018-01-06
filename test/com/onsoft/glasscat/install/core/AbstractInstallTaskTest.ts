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

import { TestSuite, Test, TestSorters, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { AbstractInstallTask } from "../../../../../../src/com/onsoft/glasscat/install/core/AbstractInstallTask";
import { AbstractInstallTaskImpl } from "../../../../../../utils/test-utils/classes/AbstractInstallTaskImpl";

@TestSuite({
  description: "Test the AbstractInstallTask class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class AbstractInstallTaskTest {
  
  public impl:AbstractInstallTaskImpl = null;
  public props:any = null;

  @BeforeAll()
  public initTest():void{
    this.impl = new AbstractInstallTaskImpl();
    this.props = { foo: "bar" };
  }
  
  @Test({
    description: "should extends the AbstractInstallTask class",
    order: 0
  })
  public instanceOfTest():void {
    expect(this.impl).to.be.an.instanceOf(AbstractInstallTask);
  }
  
  @Test({
    description: "should return 'null' by default",
    order: 1
  })
  public getPropertiesDefaultTest():void {
    expect(this.impl.getProperties()).to.be.null;
  }
  
  @Test({
    description: "should set the properties with no error",
    order: 2
  })
  public setPropertiesTest():void {
    expect(this.impl.setProperties(this.props)).to.be.OK;
  }

  @Test({
    description: "should return the same object as passed as parameter of the by default",
    order: 3
  })
  public getPropertiesTest():void {
    expect(this.impl.getProperties()).to.equal(this.props);
  }
  
  @Test({
    description: "should throw an error since abstract method have no default implementations",
    order: 4
  })
  public runTest():void {
    let doRun:Function = function():void {
      this.impl.run(null);
    };
    expect(doRun).to.throw(Error);
  }
}