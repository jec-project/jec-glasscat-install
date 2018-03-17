"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInstallTask_1 = require("../core/AbstractInstallTask");
const InstallTaskError_1 = require("../exceptions/InstallTaskError");
const BuildDirsTaskProps_1 = require("../utils/BuildDirsTaskProps");
const fs = require("fs");
class BuildDirsTask extends AbstractInstallTask_1.AbstractInstallTask {
    constructor() {
        super();
        this.initObj();
    }
    initObj() {
        this.__properties = new BuildDirsTaskProps_1.BuildDirsTaskProps();
    }
    run(complete) {
        const buildErrors = new Array();
        const directories = this.__properties.directories;
        let len = directories.length;
        let dir = null;
        let error = null;
        while (len--) {
            dir = directories[len];
            try {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
            }
            catch (e) {
                error = new InstallTaskError_1.InstallTaskError("An error occured while creating a directory: " + dir, e);
                buildErrors.push(error);
            }
        }
        complete(buildErrors);
    }
}
exports.BuildDirsTask = BuildDirsTask;
