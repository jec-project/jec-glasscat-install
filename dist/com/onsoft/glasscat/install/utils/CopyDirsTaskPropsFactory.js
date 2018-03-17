"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CopyDirsTaskProps_1 = require("./CopyDirsTaskProps");
const CopyDirsItemBuilder_1 = require("./CopyDirsItemBuilder");
class CopyDirsTaskPropsFactory {
    constructor() { }
    create() {
        const builder = new CopyDirsItemBuilder_1.CopyDirsItemBuilder();
        const props = new CopyDirsTaskProps_1.CopyDirsTaskProps();
        const items = new Array();
        items.push(builder.build("/src/resources/locales", "/public/locales"));
        items.push(builder.build("/src/resources/security/keyfiles", "/public/cfg/keyfiles"));
        props.items = items;
        return props;
    }
}
exports.CopyDirsTaskPropsFactory = CopyDirsTaskPropsFactory;
