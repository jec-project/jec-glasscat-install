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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { GpmRefParser } from "../../../../../../src/com/onsoft/glasscat/install/utils/GpmRefParser";
import { GpmRef } from "../../../../../../src/com/onsoft/glasscat/install/utils/GpmRef";

// utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/GpmRefParserTestUtils";

@TestSuite({
  description: "Test the GpmRefParser class properties"
})
export class GpmRefParserTest {
  
  public parser:GpmRefParser = null;

  @BeforeAll()
  public initTest():void {
    this.parser = new GpmRefParser();
  }

  @Test({
    description: "should have a 'name' property correctly set "
  })
  public nameTest():void {
    expect(
      this.parser.parse(utils.DEFAULT_GPM)
    ).to.have.property("name", utils.NAME);
  }
  
  @Test({
    description: "should have a 'version' property correctly set "
  })
  public versionTest():void {
    expect(
      this.parser.parse(utils.DEFAULT_GPM)
    ).to.have.property("version", utils.VERSION);
  }
}