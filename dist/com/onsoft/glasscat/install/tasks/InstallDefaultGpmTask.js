"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInstallTask_1 = require("../core/AbstractInstallTask");
const InstallTaskError_1 = require("../exceptions/InstallTaskError");
const DefaultGpmPropsFactory_1 = require("../utils/DefaultGpmPropsFactory");
const path = require("path");
const jec_cheetoh_1 = require("jec-cheetoh");
class InstallDefaultGpmTask extends AbstractInstallTask_1.AbstractInstallTask {
    constructor() {
        super();
        this._cursor = -1;
        this._isRunning = false;
        this._errors = null;
    }
    installNextGpm(complete) {
        let builder = new jec_cheetoh_1.CheetohBuilder();
        let cheetoh = builder.build();
        let gpmList = this.__properties.defaultGpmList;
        let gpmRef = null;
        let name = null;
        let error = null;
        let currentPath = process.cwd();
        this._cursor--;
        if (this._cursor >= 0) {
            gpmRef = gpmList[this._cursor];
            name = gpmRef.name;
            cheetoh.installGpmFromUri(`https://registry.npmjs.org/${name}/-/${name}-${gpmRef.version}.tgz`, path.join(currentPath, "public/wildcat"), (err) => {
                if (err) {
                    error = new InstallTaskError_1.InstallTaskError("An error occured while installing a default GPM", err);
                    this._errors.push(error);
                }
                this.installNextGpm(complete);
            });
        }
        else {
            this._cursor = -1;
            let resultErrors = this._errors.splice(0);
            this._errors = null;
            this._isRunning = false;
            complete(resultErrors);
        }
    }
    run(complete) {
        let factory = null;
        if (this._isRunning) {
            let errors = new Array();
            let msg = "Process is already running";
            let error = new InstallTaskError_1.InstallTaskError(msg, new Error(msg));
            errors.push(error);
            complete(errors);
        }
        else {
            this._isRunning = true;
            this._errors = new Array();
            factory = new DefaultGpmPropsFactory_1.DefaultGpmPropsFactory();
            try {
                this.__properties = factory.create();
            }
            catch (e) {
                this._errors.push(e);
            }
            this._cursor = this.__properties.defaultGpmList.length;
            this.installNextGpm(complete);
        }
    }
    isRunning() {
        return this._isRunning;
    }
}
exports.InstallDefaultGpmTask = InstallDefaultGpmTask;
