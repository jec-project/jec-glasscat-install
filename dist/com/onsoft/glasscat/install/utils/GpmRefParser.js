"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GpmRef_1 = require("./GpmRef");
class GpmRefParser {
    constructor() { }
    parse(defaultGpm) {
        let ref = new GpmRef_1.GpmRef();
        ref.name = defaultGpm.name;
        ref.version = defaultGpm.version;
        return ref;
    }
}
exports.GpmRefParser = GpmRefParser;
