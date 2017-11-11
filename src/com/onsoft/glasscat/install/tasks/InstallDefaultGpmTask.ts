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
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Installs all default GPM specified in the GlassCat configuration file.
   * 
   * @param {Function} complete the callback method called when the install is
   *                            complete.
   */
  private installGpms(complete:(errors:InstallTaskError[])=>void):void {
    let buildErrors:InstallTaskError[] = new Array<InstallTaskError>();
    let error:InstallTaskError = null;
    let builder:CheetohBuilder = new CheetohBuilder();
    let cheetoh:Cheetoh = builder.build();
    let gpmList:GpmRef[] = this.__properties.defaultGpmList;
    let gpmRef:GpmRef = null;
    let name:string = null;
    let len:number = gpmList.length;
    let cursor:number = len;
    let currentPath:string = process.cwd();
    while(len--) {
      gpmRef = gpmList[len];
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
            buildErrors.push(error);
          }
          cursor--;
          if(cursor <= 0) complete(buildErrors);
        }
      );
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public run(complete:(errors:InstallTaskError[])=>void):void {
    let buildErrors:InstallTaskError[] = new Array<InstallTaskError>();
    let factory:DefaultGpmPropsFactory = new DefaultGpmPropsFactory();
    try {
      this.__properties = factory.create();
    } catch(e) {
      buildErrors.push(e);
    }
    this.installGpms((errs:InstallTaskError[])=>{
      errs.forEach(element => {
        buildErrors.push(element);
      });
      complete(buildErrors);
    })
  }
}

