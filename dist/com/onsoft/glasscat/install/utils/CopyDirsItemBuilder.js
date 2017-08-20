"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CopyDirsItem_1 = require("./CopyDirsItem");
class CopyDirsItemBuilder {
    constructor() { }
    build(src, dest) {
        let item = new CopyDirsItem_1.CopyDirsItem();
        item.src = src;
        item.dest = dest;
        return item;
    }
}
exports.CopyDirsItemBuilder = CopyDirsItemBuilder;
