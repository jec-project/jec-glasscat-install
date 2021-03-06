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

import {InstallDefaultGpmTaskProps} from "./InstallDefaultGpmTaskProps";
import {GpmRef} from "./GpmRef";
import {JsonLoader} from "jec-commons";
import {DefaultJsonLoader} from "jec-commons-node";
import * as path from "path";
import {InstallTaskError} from "../exceptions/InstallTaskError";
import {GpmRefParser} from "./GpmRefParser";

/**
 * An factory that creates <code>InstallDefaultGpmTaskProps</code> instances 
 * built from the <code>default-gpms.json</code> file.
 */
export class DefaultGpmPropsFactory {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultGpmPropsFactory</code> instance.
   */
  constructor(){}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the default GPMs configuration file.
   */
  private _config:any = null

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Loads the default GPMs configuration file.
   */
  private loadConfig():void {
    const loader:JsonLoader = new DefaultJsonLoader();
    const defaultPath:string = path.join(
      process.cwd(), "src/resources/install/default-gpms.json"
    );
    try {
      this._config = loader.loadSync(defaultPath);
    } catch(e) {
      throw new InstallTaskError(
        "An error occured while loading default GPM config", e
      );
    }
    
  }

  /**
   * Validates the default GPMs configuration file.
   */
  private validateConfig():void {
    let errMsg:string = null;
    if(!this._config.defaultGpmList) {
      errMsg =
          "Default GPM config is not valid; missing property: 'defaultGpmList'";
      throw new InstallTaskError(errMsg, new Error(errMsg));
    }
  }

  /**
   * Parses the default default GPM config file and returns the default
   * <code>InstallDefaultGpmTaskProps</code> instance used by the framework to
   * install GlassCat.
   * 
   * @return {InstallDefaultGpmTaskProps} the default
   *                                     <code>InstallDefaultGpmTaskProps</code>
   *                                      instance used by the framework to 
   *                                      install GlassCat.
   */
  private parse():InstallDefaultGpmTaskProps {
    const props:InstallDefaultGpmTaskProps = new InstallDefaultGpmTaskProps();
    const parser:GpmRefParser = new GpmRefParser();
    const defaultList:any[] = this._config.defaultGpmList;
    const resultList:Array<GpmRef> = new Array<GpmRef>();
    let len:number = defaultList.length;
    while(len--) {
      resultList.push(parser.parse(defaultList[len]));
    }
    props.defaultGpmList = resultList;
    return props;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns the default <code>InstallDefaultGpmTaskProps</code> 
   * instance used by the framework to install GlassCat.
   * 
   * @return {InstallDefaultGpmTaskProps} the default
   *                                     <code>InstallDefaultGpmTaskProps</code>
   *                                      instance used by the framework to 
   *                                      install GlassCat.
   */
  public create():InstallDefaultGpmTaskProps {
    this.loadConfig();
    this.validateConfig();
    return this.parse();
  }
}

