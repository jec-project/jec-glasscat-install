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

import {InstallTask} from "./InstallTask";
import {InstallTaskError} from "../exceptions/InstallTaskError";

/**
 * The acstract implementation of the <code>InstallTask</code> interface.
 */
export abstract class AbstractInstallTask implements InstallTask {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AbstractInstallTask</code> instance.
   */
  constructor(){}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The properties associated with this task.
   */
  private __properties:any = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getProperties():any {
    return this.__properties;
  }
  
  /**
   * @inheritDoc
   */
  public setProperties(props:any): void {
    this.__properties = props;
  }
  
  /**
   * @inheritDoc
   */
  public run(complete:(errors:InstallTaskError[]) => void):void {
    throw new Error("Method not implemented.");
  }
}