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

/**
 * The object that is responsible for invoking GlassCat installation tasks.
 */
export class InstallTaskError {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InstallTaskError</code> instance.
   * 
   * @param {string} message a message that describes the error.
   * @param {any} originalError the reference to the original error.
   */
  constructor(message:string, originalError:any){
    this.initObject(message, originalError);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The message that describes the error.
   */
  private _message:string = null;

  /**
   * The reference to the original error.
   */
  private _originalError:any = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {string} message a message that describes the error.
   * @param {any} originalError the reference to the original error.
   */
  private initObject(message:string, originalError:any):void {
    this._message = message;
    this._originalError = originalError;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the message that describes the error.
   * 
   * @return {string} the message that describes the error.
   */
  public getMessage():string {
    return this._message;
  }
  
  /**
   * Returns the reference to the original error.
   * 
   * @return {any} the reference to the original error.
   */
  public getOriginalError():any {
    return this._originalError;
  }
}