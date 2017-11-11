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

import {GpmRef} from "./GpmRef";

/**
 * A utility class that parses default GPM config objects.
 */
export class GpmRefParser {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GpmRefParser</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Parses the object specified by <code>defaultGpm</code> and return the
   * corresponding <code>GpmRef</code> instance.
   * 
   * @param {any} defaultGpm the object to parse.
   * @return {GpmRef} a new <code>GpmRef</code> instance.
   */
  public parse(defaultGpm:any):GpmRef {
    let ref:GpmRef = new GpmRef();
    ref.name = defaultGpm.name;
    ref.version = defaultGpm.version;
    return ref;
  }
}