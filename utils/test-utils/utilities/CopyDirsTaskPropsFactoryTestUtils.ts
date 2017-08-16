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

import {CopyDirsItemBuilder} from "../../../src/com/onsoft/glasscat/install/utils/CopyDirsItemBuilder";
import {CopyDirsItem} from "../../../src/com/onsoft/glasscat/install/utils/CopyDirsItem";

/*!
 * This module constains utilities used by the CopyDirsTaskPropsFactory test
 * suite.
 */

// Utilities:
const BUILDER:CopyDirsItemBuilder = new CopyDirsItemBuilder();
export const DEFAULT_ITEMS_NUM:number = 2;
export const ITEM_1:CopyDirsItem = BUILDER.build("/src/resources/locales", "/public/locales");
export const ITEM_2:CopyDirsItem = BUILDER.build("/src/resources/security/keyfiles", "/public/cfg/keyfiles");
