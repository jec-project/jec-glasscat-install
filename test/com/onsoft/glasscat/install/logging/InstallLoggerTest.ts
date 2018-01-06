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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { SingletonError, LoggerProxy } from "jec-commons";
import { InstallLogger } from "../../../../../../src/com/onsoft/glasscat/install/logging/InstallLogger";

@TestSuite({
  description: "Test the InstallLogger class methods"
})
export class InstallLoggerTest {
  
  @Test({
    description: "should throw a singleton error when calling the constructor function"
  })
  public singletonErrorTest():void {
    let buildInstance:Function = function():void {
      new InstallLogger();
    };
    expect(buildInstance).to.throw(SingletonError);
  }
  
  @Test({
    description: "should return an InstallLogger instance"
  })
  public getOriginalErrorTest():void {
    let logger:LoggerProxy = InstallLogger.getInstance();
    expect(logger).to.be.an.instanceOf(InstallLogger);
  }
    
  @Test({
    description: "should return a singleton reference"
  })
  public singletonTest():void {
    let logger1:LoggerProxy = InstallLogger.getInstance();
    let logger2:LoggerProxy = InstallLogger.getInstance();
    expect(logger1).to.equal(logger2);
  }
}