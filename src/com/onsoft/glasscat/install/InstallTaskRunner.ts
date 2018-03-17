//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {InstallTask} from "./core/InstallTask";
import {InstallTaskError} from "./exceptions/InstallTaskError";
import {InstallLogger} from "./logging/InstallLogger";
import { LogLevel } from "jec-commons";

/**
 * The object that is responsible for invoking GlassCat installation tasks.
 */
export class InstallTaskRunner {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InstallTaskRunner</code> instance.
   */
  constructor(){
    this.initObject();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The list of tasks that will be executed by this task runner.
   */
  private _tasks:InstallTask[] = null;

  /**
   * The list of errors to pass as parameter of the callback method at the end
   * of the tasks running process.
   */
  private _errors:InstallTaskError[] = null;
  
  /**
   * The cursor that indicates the task currently run in this task runner.
   */
  private _cursor:number = -1;

  /**
   * A boollean that indicates whether this task runner is processing tasks
   * (<code>true</code>), or not (<code>false</code>).
   */
  private _isRunning:boolean = false;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObject():void {
    this._tasks = new Array<InstallTask>();
  }

  /**
   * Invokes the next task in the tasks stack, depending on the current cursor
   * position.
   * 
   * @param {Function} result the reference to the callback method invoked at 
   *                          the end of the task process. 
   */
  private nextTask(result:(errors:InstallTaskError[])=>void):void {
    let task:InstallTask = null;
    let taskName:string = null;
    this._cursor--;
    if(this._cursor >= 0) {
      task = this._tasks[this._cursor];
      taskName = task.constructor.name;
      InstallLogger.getInstance().log("running new task: " + taskName);
      task.run((taskErrors:InstallTaskError[])=>{
        if(taskErrors && taskErrors.length > 0) {
          this._errors = this._errors.concat(taskErrors);
        }
        InstallLogger.getInstance().log("task complete: " + taskName);
        this.nextTask(result);
      });
    } else {
      this.runComplete(result);
    }
  }

  /**
   * Invoke the callback method at the end of the task process.
   * 
   * @param {Function} result the callback method invoked at the end of the
   *                          task process. 
   */
  private runComplete(result:(errors:InstallTaskError[])=>void):void {
    const errorsResult:InstallTaskError[] = new Array<InstallTaskError>();
    let len:number = this._errors.length;
    let error:InstallTaskError = null;
    let report:string = `running tasks complete:
- number of tasks: ${this._tasks.length}
- number of errors: ${len}`;
    while(len--) {
      error = this._errors[len];
      errorsResult.push(error);
      report += "\n=> error: " + error.getMessage()
              + "\n   stack: " + error.getOriginalError();
    }
    InstallLogger.getInstance().log(report);

    this._cursor = -1;
    this._isRunning = false;
    this._errors = null;
    result(errorsResult);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Adds a list of tasks to be executed by this task runner.
   * 
   * @param {Array<InstallTask>} tasks a list of tasks to add to this task
   *                                  runner.
   */
  public addTasks(tasks:InstallTask[]):void {
    let len:number = tasks.length;
    while(len--) {
      this._tasks.push(tasks[len]);
    }
  }

  /**
   * Returns the list of tasks that must be executed by this task runner.
   * 
   * @return {Array<InstallTask>} the list of tasks that must be executed by this
   *                             task runner.
   */
  public getTasks():InstallTask[] {
    return this._tasks;
  }

  /**
   * Runs all tasks associated with this task runner.
   * 
   * @param {Function} result the callback method invoked at the end of the
   *                          task process. This method takes an array of
   *                          <code>InstallTaskError</code> objects as parameter,
   *                          or <code>null</code> whether no error occured
   *                          during the task process.
   */
  public runTasks(result:(errors:InstallTaskError[])=>void):void {
    if(this._isRunning) {
      InstallLogger.getInstance()
                   .log("Process is already running", LogLevel.ERROR);
    } else {
      this._isRunning = true;
      InstallLogger.getInstance().log("running tasks:");
      this._errors = new Array<InstallTaskError>();
      this._cursor = this._tasks.length;
      this.nextTask(result);
    }
  }

  /**
   * Returns a boollean that indicates whether this task runner is processing 
   * tasks (<code>true</code>), or not (<code>false</code>).
   * 
   * @return {boolean} <code>true</code> whether this task runner is processing
   *                   tasks; <code>false</code> otherwise.
   */
  public isRunning():boolean {
    return this._isRunning;
  }
}