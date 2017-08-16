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

import {CopyDirsItem} from "./CopyDirsItem";

/**
 * An object that contains properties for the <code>CopyDirsTask</code> task.
 */
export class CopyDirsTaskProps {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CopyDirsTaskProps</code> instance.
   */
  constructor(){}

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The list of <code>CopyDirsItem</code> objects that define the directories
   * to copy.
   */
  public items:CopyDirsItem[] = null;
}

