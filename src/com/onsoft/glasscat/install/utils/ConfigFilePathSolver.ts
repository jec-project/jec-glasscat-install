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

import {FilePath} from "./FilePath";

/**
 * An utility class that extract the path where to copy a file depending on its
 * name. A file with the name <code>app+foo+bar+name.ext</code> will be copied 
 * in the <code>app/foo/bar</code> directory with the name
 * <code>name.ext</code>.
 */
export class ConfigFilePathSolver {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ConfigFilePathSolver</code> instance.
   */
  constructor(){}

  //////////////////////////////////////////////////////////////////////////////
  // Private property
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A reference to the string used to separate folders in a file name
   * reference.
   */
  private readonly SEPARATOR:string = "+";

  /**
   * A reference to the <code>/</code> character.
   */
  private readonly SLASH:string = "/";

  //////////////////////////////////////////////////////////////////////////////
  // Public method
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The list of folders to create.
   */
  public extractFilePath(file:string):FilePath{
    let props:FilePath = new FilePath();
    let buffer:string[] = file.split(this.SEPARATOR);
    let len:number = buffer.length - 2;
    let i:number = 0;
    let path:string = this.SLASH;
    for(; i <= len; ++i) {
      path += buffer[i] + this.SLASH
    }
    props.path = path;
    props.name = buffer[i];
    return props;
  }
}

