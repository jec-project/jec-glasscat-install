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

import {Logger, LoggerProxy, AbstractLoggerProxy, ConsoleLogger} from "jec-commons";

/**
 * A singleton that is used by the installation framework to send logs to a
 * <code>Logger</code> object defined by the execution environement.
 */
export class InstallLogger extends AbstractLoggerProxy implements LoggerProxy {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InstallLogger</code> instance.
   */
  constructor() {
    super("[GLASSCAT INSTALL]");
    if(InstallLogger._locked || InstallLogger.INSTANCE) {
      this.throwSingletonError("InstallLogger");
    }
    InstallLogger._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>InstallLogger</code> singleton instance reference.
   */
  private static INSTANCE:InstallLogger = null;

  /**
   * Prevents <code>InstallLogger</code> illegal instantiations.
   */
  private static _locked:boolean = true;

  /**
   * Returns a reference to the <code>InstallLogger</code> singleton.
   */
  public static getInstance():LoggerProxy{
    if(InstallLogger.INSTANCE === null) {
      InstallLogger._locked = false;
      InstallLogger.INSTANCE = new InstallLogger();
      let logger:Logger = new ConsoleLogger();
      InstallLogger.INSTANCE.setLogger(logger);
    }
    return InstallLogger.INSTANCE;
  }
};
