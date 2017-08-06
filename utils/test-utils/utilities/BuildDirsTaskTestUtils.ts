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

import * as fse from "fs-extra";

/*!
 * This module constains utilities used by the BuildDirsTaskTest test suite.
 */

// Utilities:
const PATH:string = process.cwd() + "/utils/temp";
export const DIRECTORIES:string[] = [
  "public/cfg",
  "public/domains",
  "public/locales",
  "public/logs",
  "public/modules",
  "public/wildcat",
  "public",
  "workspace"
];
export const NEW_DIRECTORIES:string[] = [
  "utils/temp/inner-folder",
  "utils/temp"
];
export const deleteTestFolders:Function = function(dir:string):void {
  fse.removeSync(PATH);
};
