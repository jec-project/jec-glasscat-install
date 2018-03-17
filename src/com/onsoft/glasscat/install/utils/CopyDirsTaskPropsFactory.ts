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

import {CopyDirsTaskProps} from "./CopyDirsTaskProps";
import {CopyDirsItem} from "./CopyDirsItem";
import {CopyDirsItemBuilder} from "./CopyDirsItemBuilder";

/**
 * An factory that creates <code>CopyDirsTaskProps</code> instances set with
 * the default <code>CopyDirsItems</code> used by the framework to install
 * GlassCat.
 */
export class CopyDirsTaskPropsFactory {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CopyDirsTaskPropsFactory</code> instance.
   */
  constructor(){}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns the default <code>CopyDirsTaskProps</code> instance
   * used by the framework to install GlassCat.
   * 
   * @return {CopyDirsTaskProps} the default <code>CopyDirsTaskProps</code>
   *                             instance used by the framework to install
   *                             GlassCat.
   */
  public create():CopyDirsTaskProps {
    const builder:CopyDirsItemBuilder = new CopyDirsItemBuilder();
    const props:CopyDirsTaskProps = new CopyDirsTaskProps();
    const items = new Array<CopyDirsItem>();
    items.push(
      builder.build("/src/resources/locales", "/public/locales")
    );
    items.push(
      builder.build("/src/resources/security/keyfiles", "/public/cfg/keyfiles")
    );
    props.items = items;
    return props;
  }
}

