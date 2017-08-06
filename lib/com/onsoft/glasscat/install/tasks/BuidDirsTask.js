"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractInstallTask_1 = require("../core/AbstractInstallTask");
const fs = require("fs");
class BuidDirsTask extends AbstractInstallTask_1.AbstractInstallTask {
    constructor() {
        super();
    }
    run(complete) {
        let dir = "workspace";
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            complete(null);
        }
        catch (e) {
        }
    }
}
exports.BuidDirsTask = BuidDirsTask;
