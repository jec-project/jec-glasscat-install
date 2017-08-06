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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { InstallTaskError } from "../../../../../../src/com/onsoft/glasscat/install/exceptions/InstallTaskError";

@TestSuite({
  description: "Test the InstallTaskError class methods"
})
export class InstallTaskErrorTest {
  
  @Test({
    description: "should return the same message as passed to the constructor function"
  })
  public getMessageTest():void {
    let message:string = "foo bar";
    let originalError:any = null;
    let error:InstallTaskError = new InstallTaskError(message, originalError);
    expect(error.getMessage()).to.equal(message);
  }
  
  @Test({
    description: "should return the same excption as passed to the constructor function"
  })
  public getOriginalErrorTest():void {
    let message:string = "foo bar";
    let originalError:any = new Error();
    let error:InstallTaskError = new InstallTaskError(message, originalError);
    expect(error.getOriginalError()).to.equal(originalError);
  }
}