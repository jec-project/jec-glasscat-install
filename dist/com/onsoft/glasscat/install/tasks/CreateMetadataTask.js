"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInstallTask_1 = require("../core/AbstractInstallTask");
const InstallTaskError_1 = require("../exceptions/InstallTaskError");
const jec_glasscat_metadata_1 = require("jec-glasscat-metadata");
const fs = require("fs");
const path = require("path");
const PKG = require("../../../../../../package.json");
class CreateMetadataTask extends AbstractInstallTask_1.AbstractInstallTask {
    constructor() {
        super();
        this.ENCODING = "utf-8";
        this.FILE_NAME = "metadata.json";
        this.METADATA_PATH = "/server/.metadata";
    }
    run(complete) {
        const buildErrors = new Array();
        const generator = new jec_glasscat_metadata_1.GlassCatMetadataGenerator(PKG.version);
        const file = generator.generateFile();
        const filePath = (this.__properties && this.__properties.path) ?
            path.join(this.__properties.path, this.FILE_NAME) :
            path.join(this.METADATA_PATH, this.FILE_NAME);
        fs.writeFile(filePath, file, this.ENCODING, (err) => {
            if (err) {
                const error = new InstallTaskError_1.InstallTaskError("An error occured while creating metadata", err);
                buildErrors.push(error);
            }
            complete(buildErrors);
        });
    }
}
exports.CreateMetadataTask = CreateMetadataTask;
