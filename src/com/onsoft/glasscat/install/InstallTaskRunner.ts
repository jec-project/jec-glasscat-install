//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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
   * Invoke the callback method at the end of the task process.
   * 
   * @param {Function} result the callback method invoked at the end of the
   *                          task process. 
   * @param {Array<InstallTaskError>} errorList the list of errors to pass as
   *                                            parameter of the  callback
   *                                            method.
   */
  private runComplete(result:(errors:InstallTaskError[])=>void,
                                            errorList:InstallTaskError[]):void {
    let len:number = errorList.length;
    let error:InstallTaskError = null;
    let report:string = `running tasks complete:
- number of tasks: ${this._tasks.length}
- number of errors: ${len}`;
    while(len--) {
      error = errorList[len];
      report += "\n=> error: " + error.getMessage()
              + "\n   stack: " + error.getOriginalError();
    }
    InstallLogger.getInstance().log(report);
    result(errorList);
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
    InstallLogger.getInstance().log("running tasks:")
    let len:number = this._tasks.length;
    let taskNum:number = len;
    let task:InstallTask = null;
    let errorList:InstallTaskError[] = new Array<InstallTaskError>();
    let taskName:string = null;
    if(len === 0) this.runComplete(result, errorList);
    else {
      while(len--) {
        task = this._tasks[len];
        taskName = task.constructor.name;
        InstallLogger.getInstance().log("running new task: " + taskName);
        task.run((taskErrors:InstallTaskError[])=>{
          if(taskErrors && taskErrors.length > 0) {
            errorList = errorList.concat(taskErrors);
          }
          InstallLogger.getInstance().log("task complete: " + taskName);
          if(--taskNum === 0) {
            this.runComplete(result, errorList);
          }
        });
      }
    }
  }
}