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
import {GlassCatMetadataGenerator} from "jec-glasscat-metadata";
import * as fs from "fs";
import * as path from "path";

// Package file:
const PKG:any = require("../../../../../../package.json");

/**
 * The task that is responsible for the GlassCat server metadata.
 */
export class CreateMetadataTask extends AbstractInstallTask
                                                        implements InstallTask {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CreateMetadataTask</code> instance.
   */
  constructor(){
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * A reference to the encoding used by this object to create config files.
   */
  private readonly ENCODING:string = "utf-8";
  
  /**
   * The name of the GlassCat server metadata file.
   */
  private readonly FILE_NAME:string = "metadata.json";
  
  /**
   * The path to the GlassCat server metadata file.
   */
  private readonly METADATA_PATH:string = "/server/.metadata";
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public run(complete:(errors:InstallTaskError[])=>void):void {
    const buildErrors:InstallTaskError[] = new Array<InstallTaskError>();
    const generator:GlassCatMetadataGenerator =
                                     new GlassCatMetadataGenerator(PKG.version);
    const file:string = generator.generateFile();
    const filePath:string = (this.__properties && this.__properties.path) ?
                            path.join(this.__properties.path, this.FILE_NAME) :
                            path.join(this.METADATA_PATH, this.FILE_NAME);
    fs.writeFile(
      filePath,
      file,
      this.ENCODING,
      (err:NodeJS.ErrnoException | null) => {
        if(err) {
          const error:InstallTaskError = new InstallTaskError(
            "An error occured while creating metadata", err
          );
          buildErrors.push(error);
        }
        complete(buildErrors);
      }
    );
  }
}
