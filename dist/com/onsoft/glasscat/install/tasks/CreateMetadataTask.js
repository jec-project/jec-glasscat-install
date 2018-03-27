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
        this.METADATA_PATH = "/server/com/onsoft/glasscat/metadata";
    }
    run(complete) {
        const buildErrors = new Array();
        const generator = new jec_glasscat_metadata_1.GlassCatMetadataGenerator(PKG.version);
        const file = generator.generateFile();
        const dirPath = (this.__properties && this.__properties.path) ?
            path.join(process.cwd(), this.__properties.path) :
            path.join(process.cwd(), this.METADATA_PATH);
        const filePath = path.join(dirPath, this.FILE_NAME);
        let error = null;
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, (err) => {
                console.log(err);
                if (err) {
                    error = new InstallTaskError_1.InstallTaskError("An error occured while creating metadata directory", err);
                    buildErrors.push(error);
                    complete(buildErrors);
                }
                else {
                    fs.writeFile(filePath, file, this.ENCODING, (err) => {
                        if (err) {
                            error = new InstallTaskError_1.InstallTaskError("An error occured while creating metadata", err);
                            buildErrors.push(error);
                        }
                        complete(buildErrors);
                    });
                }
            });
        }
        else {
            complete(buildErrors);
        }
    }
}
exports.CreateMetadataTask = CreateMetadataTask;
