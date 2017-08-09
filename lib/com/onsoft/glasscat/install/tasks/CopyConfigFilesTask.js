"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInstallTask_1 = require("../core/AbstractInstallTask");
const InstallTaskError_1 = require("../exceptions/InstallTaskError");
const CopyConfigFilesTaskProps_1 = require("../utils/CopyConfigFilesTaskProps");
const ConfigFilePathSolver_1 = require("../utils/ConfigFilePathSolver");
const fs = require("fs");
class CopyConfigFilesTask extends AbstractInstallTask_1.AbstractInstallTask {
    constructor() {
        super();
        this._solver = null;
        this.ENCODING = "utf-8";
        this.initObj();
    }
    initObj() {
        this.__properties = new CopyConfigFilesTaskProps_1.CopyConfigFilesTaskProps();
        this._solver = new ConfigFilePathSolver_1.ConfigFilePathSolver();
    }
    run(complete) {
        let buildErrors = new Array();
        let rootPath = process.cwd();
        let srcPath = rootPath + this.__properties.src;
        let filePath = null;
        let data = null;
        let error = null;
        fs.readdir(srcPath, (err, files) => {
            files.forEach(file => {
                filePath = this._solver.extractFilePath(file);
                try {
                    data = fs.readFileSync(srcPath + file, this.ENCODING);
                    fs.writeFileSync(rootPath + filePath.path + filePath.name, data);
                }
                catch (e) {
                    error = new InstallTaskError_1.InstallTaskError("An error occured while creating a config file: " + file, e);
                    buildErrors.push(error);
                }
            });
            complete(buildErrors);
        });
    }
}
exports.CopyConfigFilesTask = CopyConfigFilesTask;
