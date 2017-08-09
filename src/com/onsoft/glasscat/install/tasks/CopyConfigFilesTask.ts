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
import {CopyConfigFilesTaskProps} from "../utils/CopyConfigFilesTaskProps";
import {ConfigFilePathSolver} from "../utils/ConfigFilePathSolver";
import {FilePath} from "../utils/FilePath";
import * as fs from "fs";

/**
 * The task that is responsible for copying GlassCat configuration files from
 * the resource folder to their final repositories.
 */
export class CopyConfigFilesTask extends AbstractInstallTask
                                                        implements InstallTask {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CopyConfigFilesTask</code> instance.
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
    this.__properties = new CopyConfigFilesTaskProps();
    this._solver = new ConfigFilePathSolver();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>ConfigFilePathSolver</code> instance used by this object.
   */
  private _solver:ConfigFilePathSolver = null;

  /**
   * A reference to the encoding used by this object to create config files.
   */
  private readonly ENCODING:string = "utf-8";
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public run(complete:(errors:InstallTaskError[])=>void):void {
    let buildErrors:InstallTaskError[] = new Array<InstallTaskError>();
    let rootPath:string = process.cwd();
    let srcPath:string = rootPath + this.__properties.src;
    let filePath:FilePath = null;
    let data:string = null;
    let error:InstallTaskError = null;
    fs.readdir(srcPath, (err:NodeJS.ErrnoException, files:string[]) => {
      files.forEach(file => {
        filePath = this._solver.extractFilePath(file);
        try{
          data = fs.readFileSync(srcPath + file, this.ENCODING);
          fs.writeFileSync(rootPath + filePath.path + filePath.name, data);
        } catch(e) {
          error = new InstallTaskError(
            "An error occured while creating a config file: " + file,
            e
          );
          buildErrors.push(error);
        }
      });
      complete(buildErrors);
    });
  }
}

