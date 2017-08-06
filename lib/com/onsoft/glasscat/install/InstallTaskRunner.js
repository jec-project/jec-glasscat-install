"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InstallLogger_1 = require("./logging/InstallLogger");
class InstallTaskRunner {
    constructor() {
        this._tasks = null;
        this.initObject();
    }
    initObject() {
        this._tasks = new Array();
    }
    runComplete(result, errorList) {
        let report = `running tasks complete:
- number of tasks: ${this._tasks.length}
- number of errors: ${errorList.length}
`;
        InstallLogger_1.InstallLogger.getInstance().log(report);
        result(errorList);
    }
    addTasks(tasks) {
        let i = 0;
        let len = tasks.length - 1;
        for (; i <= len; ++i) {
            this._tasks.push(tasks[i]);
        }
    }
    getTasks() {
        return this._tasks;
    }
    runTasks(result) {
        InstallLogger_1.InstallLogger.getInstance().log("running tasks:");
        let len = this._tasks.length;
        let taskNum = len;
        let task = null;
        let errorList = new Array();
        let taskName = null;
        if (len === 0)
            this.runComplete(result, errorList);
        else {
            while (len--) {
                task = this._tasks[len];
                taskName = task.constructor.name;
                InstallLogger_1.InstallLogger.getInstance().log("running new task: " + taskName);
                task.run((taskErrors) => {
                    if (taskErrors && taskErrors.length > 0) {
                        errorList = errorList.concat(taskErrors);
                    }
                    InstallLogger_1.InstallLogger.getInstance().log("task complete: " + taskName);
                    if (--taskNum === 0) {
                        this.runComplete(result, errorList);
                    }
                });
            }
        }
    }
}
exports.InstallTaskRunner = InstallTaskRunner;
