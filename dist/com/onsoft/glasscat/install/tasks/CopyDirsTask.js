"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInstallTask_1 = require("../core/AbstractInstallTask");
const InstallTaskError_1 = require("../exceptions/InstallTaskError");
const CopyDirsTaskPropsFactory_1 = require("../utils/CopyDirsTaskPropsFactory");
const fs = require("fs");
class CopyDirsTask extends AbstractInstallTask_1.AbstractInstallTask {
    constructor() {
        super();
        this.SLASH = "/";
        this.ENCODING = "utf-8";
        this.initObj();
    }
    initObj() {
        let factory = new CopyDirsTaskPropsFactory_1.CopyDirsTaskPropsFactory();
        this.__properties = factory.create();
    }
    copyFiles(item, rootPath, pendingItemsNum, buildErrors, complete) {
        let srcPath = rootPath + item.src;
        let destPath = rootPath + item.dest;
        let data = null;
        let error = null;
        fs.readdir(srcPath, (err, files) => {
            files.forEach(file => {
                try {
                    data = fs.readFileSync(srcPath + this.SLASH + file, this.ENCODING);
                    fs.writeFileSync(destPath + this.SLASH + file, data);
                }
                catch (e) {
                    error = new InstallTaskError_1.InstallTaskError("An error occured while copying a file: " + file, e);
                    buildErrors.push(error);
                }
            });
            if (--pendingItemsNum === 0)
                complete(buildErrors);
        });
    }
    run(complete) {
        let buildErrors = new Array();
        let rootPath = process.cwd();
        let items = this.__properties.items;
        let len = items.length;
        let item = null;
        let pendingItemsNum = len;
        while (len--) {
            item = items[len];
            this.copyFiles(item, rootPath, pendingItemsNum, buildErrors, complete);
        }
    }
}
exports.CopyDirsTask = CopyDirsTask;
