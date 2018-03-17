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

import {InstallTask} from "../core/InstallTask";
import {AbstractInstallTask} from "../core/AbstractInstallTask";
import {InstallTaskError} from "../exceptions/InstallTaskError";
import {DefaultGpmPropsFactory} from "../utils/DefaultGpmPropsFactory";
import * as fs from "fs";
import * as cp from "child_process";
import * as path from "path";
import {CheetohBuilder, Cheetoh, CheetohError} from "jec-cheetoh";
import {GpmRef} from "../utils/GpmRef";

/**
 * The task that downloads and installs the default GlassCat Project Models
 * (GPMs).
 */
export class InstallDefaultGpmTask extends AbstractInstallTask
                                                        implements InstallTask {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InstallDefaultGpmTask</code> instance.
   */
  constructor(){
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The cursor that indicates the task currently run in this installer.
   */
  private _cursor:number = -1;

  /**
   * A boollean that indicates whether this installer is processing tasks
   * (<code>true</code>), or not (<code>false</code>).
   */
  private _isRunning:boolean = false;

  /**
   * The list of errors to pass as parameter of the callback method at the end
   * of the installation process.
   */
  private _errors:InstallTaskError[] = null;
  
  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Installs the next default GPM specified in the GlassCat configuration file.
   * 
   * @param {Function} complete the callback method called when all
   *                            installations are complete.
   */
  private installNextGpm(complete:(errors:InstallTaskError[])=>void):void {
    const builder:CheetohBuilder = new CheetohBuilder();
    const cheetoh:Cheetoh = builder.build();
    const gpmList:GpmRef[] = this.__properties.defaultGpmList;
    const currentPath:string = process.cwd();
    let gpmRef:GpmRef = null;
    let name:string = null;
    let error:InstallTaskError = null;
    this._cursor--;
    if(this._cursor >= 0) {
      gpmRef = gpmList[this._cursor];
      name = gpmRef.name;
      cheetoh.installGpmFromUri(
        `https://registry.npmjs.org/${name}/-/${name}-${gpmRef.version}.tgz`,
        path.join(currentPath, "public/wildcat"),
        (err:CheetohError)=>{
          if(err) {
            error = new InstallTaskError(
              "An error occured while installing a default GPM",
              err
            );
            this._errors.push(error);
          }
          this.installNextGpm(complete);
        }
      );
    } else {
      this._cursor = -1;
      const resultErrors:InstallTaskError[] = this._errors.splice(0);
      this._errors = null;
      this._isRunning = false;
      complete(resultErrors);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public run(complete:(errors:InstallTaskError[])=>void):void {
    let factory:DefaultGpmPropsFactory = null;
    if(this._isRunning) {
      const errors:Array<InstallTaskError> = new Array<InstallTaskError>();
      const msg:string = "Process is already running";
      const error = new InstallTaskError(msg, new Error(msg));
      errors.push(error);
      complete(errors);
    } else {
      this._isRunning = true;
      this._errors = new Array<InstallTaskError>();
      factory = new DefaultGpmPropsFactory();
      try {
        this.__properties = factory.create();
      } catch(e) {
        this._errors.push(e);
      }
      this._cursor = this.__properties.defaultGpmList.length;
      this.installNextGpm(complete);
    }
  }
  
  /**
   * Returns a boollean that indicates whether this installer is processing 
   * tasks (<code>true</code>), or not (<code>false</code>).
   * 
   * @return {boolean} <code>true</code> whether this installer is processing
   *                   tasks; <code>false</code> otherwise.
   */
  public isRunning():boolean {
    return this._isRunning;
  }
}
