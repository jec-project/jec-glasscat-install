"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInstallTask_1 = require("../core/AbstractInstallTask");
const InstallTaskError_1 = require("../exceptions/InstallTaskError");
const BuildConsoleTaskProps_1 = require("../utils/BuildConsoleTaskProps");
const cp = require("child_process");
class BuildConsoleTask extends AbstractInstallTask_1.AbstractInstallTask {
    constructor() {
        super();
        this.initObj();
    }
    initObj() {
        this.__properties = new BuildConsoleTaskProps_1.BuildConsoleTaskProps();
    }
    run(complete) {
        let buildErrors = new Array();
        let error = null;
        let target = process.cwd() + this.__properties.projectPath;
        let options = {
            cwd: target,
            env: process.env,
            stdio: "inherit"
        };
        try {
            cp.execSync("npm install --only=production", options);
        }
        catch (e) {
            error = new InstallTaskError_1.InstallTaskError("An error occured while installing admin console dependencies", e);
            buildErrors.push(error);
        }
        target = process.cwd() + this.__properties.tsconfigPath;
        try {
            cp.execSync("tsc -p " + target, options);
        }
        catch (e) {
            error = new InstallTaskError_1.InstallTaskError("An error occured while compiling admin console TypeScript files", e);
            buildErrors.push(error);
        }
        complete(buildErrors);
    }
}
exports.BuildConsoleTask = BuildConsoleTask;
