"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InstallDefaultGpmTaskProps_1 = require("./InstallDefaultGpmTaskProps");
const jec_commons_1 = require("jec-commons");
const path = require("path");
const InstallTaskError_1 = require("../exceptions/InstallTaskError");
const GpmRefParser_1 = require("./GpmRefParser");
class DefaultGpmPropsFactory {
    constructor() {
        this._config = null;
    }
    loadConfig() {
        let loader = new jec_commons_1.JsonLoader();
        let defaultPath = path.join(process.cwd(), "src/resources/install/default-gpms.json");
        try {
            this._config = loader.loadSync(defaultPath);
        }
        catch (e) {
            throw new InstallTaskError_1.InstallTaskError("An error occured while loading default GPM config", e);
        }
    }
    validateConfig() {
        let errMsg = null;
        if (!this._config.defaultGpmList) {
            errMsg =
                "Default GPM config is not valid; missing property: 'defaultGpmList'";
            throw new InstallTaskError_1.InstallTaskError(errMsg, new Error(errMsg));
        }
    }
    parse() {
        let props = new InstallDefaultGpmTaskProps_1.InstallDefaultGpmTaskProps();
        let parser = new GpmRefParser_1.GpmRefParser();
        let defaultList = this._config.defaultGpmList;
        let len = defaultList.length;
        let resultList = new Array();
        while (len--) {
            resultList.push(parser.parse(defaultList[len]));
        }
        props.defaultGpmList = resultList;
        return props;
    }
    create() {
        this.loadConfig();
        this.validateConfig();
        return this.parse();
    }
}
exports.DefaultGpmPropsFactory = DefaultGpmPropsFactory;
