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
    }
    installGpms(complete) {
        let buildErrors = new Array();
        let error = null;
        let builder = new jec_cheetoh_1.CheetohBuilder();
        let cheetoh = builder.build();
        let gpmList = this.__properties.defaultGpmList;
        let gpmRef = null;
        let name = null;
        let len = gpmList.length;
        let cursor = len;
        let currentPath = process.cwd();
        while (len--) {
            gpmRef = gpmList[len];
            name = gpmRef.name;
            cheetoh.installGpmFromUri(`https://registry.npmjs.org/${name}/-/${name}-${gpmRef.version}.tgz`, path.join(currentPath, "public/wildcat"), (err) => {
                if (err) {
                    error = new InstallTaskError_1.InstallTaskError("An error occured while installing a default GPM", err);
                    buildErrors.push(error);
                }
                cursor--;
                if (cursor <= 0)
                    complete(buildErrors);
            });
        }
    }
    run(complete) {
        let buildErrors = new Array();
        let factory = new DefaultGpmPropsFactory_1.DefaultGpmPropsFactory();
        try {
            this.__properties = factory.create();
        }
        catch (e) {
            buildErrors.push(e);
        }
        this.installGpms((errs) => {
            errs.forEach(element => {
                buildErrors.push(element);
            });
            complete(buildErrors);
        });
    }
}
exports.InstallDefaultGpmTask = InstallDefaultGpmTask;
