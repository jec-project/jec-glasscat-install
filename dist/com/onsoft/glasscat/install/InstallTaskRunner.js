"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InstallLogger_1 = require("./logging/InstallLogger");
const jec_commons_1 = require("jec-commons");
class InstallTaskRunner {
    constructor() {
        this._tasks = null;
        this._errors = null;
        this._cursor = -1;
        this._isRunning = false;
        this.initObject();
    }
    initObject() {
        this._tasks = new Array();
    }
    nextTask(result) {
        let task = null;
        let taskName = null;
        this._cursor--;
        if (this._cursor >= 0) {
            task = this._tasks[this._cursor];
            taskName = task.constructor.name;
            InstallLogger_1.InstallLogger.getInstance().log("running new task: " + taskName);
            task.run((taskErrors) => {
                if (taskErrors && taskErrors.length > 0) {
                    this._errors = this._errors.concat(taskErrors);
                }
                InstallLogger_1.InstallLogger.getInstance().log("task complete: " + taskName);
                this.nextTask(result);
            });
        }
        else {
            this.runComplete(result);
        }
    }
    runComplete(result) {
        let len = this._errors.length;
        let error = null;
        let errorsResult = new Array();
        let report = `running tasks complete:
- number of tasks: ${this._tasks.length}
- number of errors: ${len}`;
        while (len--) {
            error = this._errors[len];
            errorsResult.push(error);
            report += "\n=> error: " + error.getMessage()
                + "\n   stack: " + error.getOriginalError();
        }
        InstallLogger_1.InstallLogger.getInstance().log(report);
        this._cursor = -1;
        this._isRunning = false;
        this._errors = null;
        result(errorsResult);
    }
    addTasks(tasks) {
        let len = tasks.length;
        while (len--) {
            this._tasks.push(tasks[len]);
        }
    }
    getTasks() {
        return this._tasks;
    }
    runTasks(result) {
        if (this._isRunning) {
            InstallLogger_1.InstallLogger.getInstance()
                .log("Process is already running", jec_commons_1.LogLevel.ERROR);
        }
        else {
            this._isRunning = true;
            InstallLogger_1.InstallLogger.getInstance().log("running tasks:");
            this._errors = new Array();
            this._cursor = this._tasks.length;
            this.nextTask(result);
        }
    }
    isRunning() {
        return this._isRunning;
    }
}
exports.InstallTaskRunner = InstallTaskRunner;
