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
import {CopyDirsTaskProps} from "../utils/CopyDirsTaskProps";
import {CopyDirsTaskPropsFactory} from "../utils/CopyDirsTaskPropsFactory";
import {CopyDirsItem} from "../utils/CopyDirsItem";
import * as fs from "fs";

/**
 * The task that is responsible for copying the content of GlassCat
 * repositories from source to destinatiion folder.
 */
export class CopyDirsTask extends AbstractInstallTask implements InstallTask {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CopyDirsTask</code> instance.
   */
  constructor(){
    super();
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A reference to the slash (<code>/</code>) character.
   */
  private readonly SLASH:string = "/";
  
  /**
   * A reference to the encoding used by this object to create config files.
   */
  private readonly ENCODING:string = "utf-8";
  
  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    let factory:CopyDirsTaskPropsFactory = new CopyDirsTaskPropsFactory();
    this.__properties = factory.create();
  }

  /**
   * Copyes all elements, specified by their <code>CopyDirsItem</code> 
   * descriptor to their final destination.
   * 
   * @param {CopyDirsItem} item the descriptor for the item to copy.
   * @param {string} rootPath the root path of the server.
   * @param {Array<InstallTaskError>} buildErrors the array of errors for the
   *                                              current task.
   * @param {Function} complete the callback method called at the end of the
   *                            process.
   */
  private copyFiles(item:CopyDirsItem, rootPath:string, 
                    buildErrors:InstallTaskError[], complete:Function):void {
    let srcPath:string = rootPath + item.src;
    let destPath:string = rootPath + item.dest;
    let data:string = null;
    let error:InstallTaskError = null;
    fs.readdir(srcPath, (err:NodeJS.ErrnoException, files:string[]) => {
        files.forEach(file => {
          try{
            data = fs.readFileSync(srcPath + this.SLASH + file, this.ENCODING);
            fs.writeFileSync(destPath + this.SLASH + file, data);
          } catch(e) {
            error = new InstallTaskError(
              "An error occured while copying a file: " + file,
              e
            );
            buildErrors.push(error);
          }
        });
        complete();
      });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public run(complete:(errors:InstallTaskError[])=>void):void {
    let buildErrors:InstallTaskError[] = new Array<InstallTaskError>();
    let rootPath:string = process.cwd();
    let items:CopyDirsItem[] = this.__properties.items;
    let len:number = items.length;
    let item:CopyDirsItem = null;
    let pendingItemsNum:number = len;
    while(len--) {
      item = items[len];
      this.copyFiles(item, rootPath, buildErrors, ()=>{
        pendingItemsNum--;
        if(pendingItemsNum <= 0) complete(buildErrors);
      });
    }
  }
}

