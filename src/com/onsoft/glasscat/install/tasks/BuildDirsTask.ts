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
import {BuildDirsTaskProps} from "../utils/BuildDirsTaskProps";
import * as fs from "fs";

/**
 * The task that is responsible for creating GlassCat repositories.
 */
export class BuildDirsTask extends AbstractInstallTask implements InstallTask {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BuildDirsTask</code> instance.
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
    this.__properties = new BuildDirsTaskProps();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public run(complete:(errors:InstallTaskError[])=>void):void {
    let buildErrors:InstallTaskError[] = new Array<InstallTaskError>();
    let directories:string[] = this.__properties.directories;
    let len:number = directories.length;
    let dir:string = null;
    let error:InstallTaskError = null;
    while(len--) {
      dir = directories[len];
      try {
        if(!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
      } catch(e) {
        error = new InstallTaskError(
          "An error occured while creating a directory: " + dir,
          e
        );
        buildErrors.push(error);
      }
    }
    complete(buildErrors);
  }
}

