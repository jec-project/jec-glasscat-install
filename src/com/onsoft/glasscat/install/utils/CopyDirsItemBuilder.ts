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

import {CopyDirsItem} from "./CopyDirsItem";

/**
 * An builder that creates <code>CopyDirsItem</code> instances.
 */
export class CopyDirsItemBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CopyDirsItem</code> instance.
   */
  constructor(){}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns a new <code>CopyDirsItem</code> instance.
   * 
   * @param {string} src the reference to the source directory for the new item.
   * @param {string} dest the reference to the destination directory for the new
   *                      item.
   * @return {CopyDirsItem} a new <code>CopyDirsItem</code> instance.
   */
  public build(src:string, dest:string):CopyDirsItem {
    let item:CopyDirsItem = new CopyDirsItem();
    item.src = src;
    item.dest = dest;
    return item;
  }
}

