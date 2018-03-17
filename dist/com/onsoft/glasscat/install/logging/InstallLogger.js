"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class InstallLogger extends jec_commons_1.AbstractLoggerProxy {
    constructor() {
        super("[GLASSCAT INSTALL]");
        if (InstallLogger._locked || InstallLogger.INSTANCE) {
            this.throwSingletonError("InstallLogger");
        }
        InstallLogger._locked = true;
    }
    static getInstance() {
        if (InstallLogger.INSTANCE === null) {
            InstallLogger._locked = false;
            InstallLogger.INSTANCE = new InstallLogger();
            const logger = new jec_commons_1.ConsoleLogger();
            InstallLogger.INSTANCE.setLogger(logger);
        }
        return InstallLogger.INSTANCE;
    }
}
InstallLogger.INSTANCE = null;
InstallLogger._locked = true;
exports.InstallLogger = InstallLogger;
;
