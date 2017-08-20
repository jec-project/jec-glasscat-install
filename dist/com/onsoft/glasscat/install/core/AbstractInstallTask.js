"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractInstallTask {
    constructor() {
        this.__properties = null;
    }
    getProperties() {
        return this.__properties;
    }
    setProperties(props) {
        this.__properties = props;
    }
    run(complete) {
        throw new Error("Method not implemented.");
    }
}
exports.AbstractInstallTask = AbstractInstallTask;
