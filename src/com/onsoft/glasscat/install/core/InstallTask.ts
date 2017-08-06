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

import {InstallTaskError} from "../exceptions/InstallTaskError";

/**
 * The <code>InstallTask</code> provides the minimu set of APIs that you must
 * implement to create a GlassCat installation task.
 */
export interface InstallTask {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns additional properties associated with this task.
   * 
   * @return {any} the properties associated with this task.
   */
  getProperties():any;

  /**
   * Sets additional properties to be associated with this task.
   * 
   * @param {any} props the properties associated with this task.
   */
  setProperties(props:any):void;

  /**
   * Runs the acctions specified by the current <code>InstallTask</code> object.
   * 
   * @param {Function} complete the callback method invoked at the end of the
   *                            task process. This method takes an array of
   *                            <code>InstallTaskError</code> objects as 
   *                            parameter, or <code>null</code> whether no error 
   *                            occured during the task process.
   */
  run(complete:(errors:InstallTaskError[])=>void):void;
}