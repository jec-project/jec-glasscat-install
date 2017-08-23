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

import {InstallTask} from "../core/InstallTask";
import {AbstractInstallTask} from "../core/AbstractInstallTask";
import {InstallTaskError} from "../exceptions/InstallTaskError";
import {BuildConsoleTaskProps} from "../utils/BuildConsoleTaskProps";
import * as fs from "fs";
import * as cp from "child_process";
import * as path from "path";

/**
 * The task that builds the GlassCat Admin Console at the end of the
 * installation process.
 */
export class BuildConsoleTask extends AbstractInstallTask
                                                        implements InstallTask {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BuildConsoleTask</code> instance.
   */
  constructor(){
    super();
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this.__properties = new BuildConsoleTaskProps();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public run(complete:(errors:InstallTaskError[])=>void):void {
    let buildErrors:InstallTaskError[] = new Array<InstallTaskError>();
    let error:InstallTaskError = null;
    let target:string = process.cwd() + this.__properties.projectPath;
    let options:any = {
      cwd: target,
      env: process.env,
      stdio: "inherit"
    };
    //console.log(target)
    try {
      cp.execSync("npm install --only=production", options);
    } catch(e) {
      error = new InstallTaskError(
        "An error occured while installing admin console dependencies",
        e
      );
      buildErrors.push(error);
    }
    target = process.cwd() + this.__properties.tsconfigPath;
    try {
      cp.execSync("tsc -p " + target, options);
    } catch(e) {
      error = new InstallTaskError(
        "An error occured while compiling admin console TypeScript files",
        e
      );
      buildErrors.push(error);
    }
    complete(buildErrors);
  }
}

