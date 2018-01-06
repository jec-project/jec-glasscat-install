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

import {AbstractInstallTask} from "../../../src/com/onsoft/glasscat/install/core/AbstractInstallTask";
import {InstallTaskError} from "../../../src/com/onsoft/glasscat/install/exceptions/InstallTaskError";

export class FailTask extends AbstractInstallTask {
  constructor(){
    super();
  }
  public run(complete:(errors:InstallTaskError[]) => void):void {
    let errorList:InstallTaskError[] = new Array<InstallTaskError>();
    let errorMessage:string = "task error"
    let orininalError:Error = new Error(errorMessage);
    let error:InstallTaskError =
                              new InstallTaskError(errorMessage, orininalError);
    errorList.push(error);
    complete(errorList);
  }
}