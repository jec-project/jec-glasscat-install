"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FilePath_1 = require("./FilePath");
class ConfigFilePathSolver {
    constructor() {
        this.SEPARATOR = "+";
        this.SLASH = "/";
    }
    extractFilePath(file) {
        let props = new FilePath_1.FilePath();
        let buffer = file.split(this.SEPARATOR);
        let len = buffer.length - 2;
        let i = 0;
        let path = this.SLASH;
        for (; i <= len; ++i) {
            path += buffer[i] + this.SLASH;
        }
        props.path = path;
        props.name = buffer[i];
        return props;
    }
}
exports.ConfigFilePathSolver = ConfigFilePathSolver;
