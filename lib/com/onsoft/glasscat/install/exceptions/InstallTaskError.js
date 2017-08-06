"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InstallTaskError {
    constructor(message, originalError) {
        this._message = null;
        this._originalError = null;
        this.initObject(message, originalError);
    }
    initObject(message, originalError) {
        this._message = message;
        this._originalError = originalError;
    }
    getMessage() {
        return this._message;
    }
    getOriginalError() {
        return this._originalError;
    }
}
exports.InstallTaskError = InstallTaskError;
