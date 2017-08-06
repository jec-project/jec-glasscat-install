/*!
 * JEC GlassCat Install Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-glasscat-install" {

import { LoggerProxy, AbstractLoggerProxy } from "jec-commons";

export abstract class AbstractInstallTask implements InstallTask {    constructor();    protected __properties: any;    getProperties(): any;    setProperties(props: any): void;    run(complete: (errors: InstallTaskError[]) => void): void;}export interface InstallTask {    getProperties(): any;    setProperties(props: any): void;    run(complete: (errors: InstallTaskError[]) => void): void;}export class InstallTaskError {    constructor(message: string, originalError: any);    private _message;    private _originalError;    private initObject(message, originalError);    getMessage(): string;    getOriginalError(): any;}export class InstallTaskRunner {    constructor();    private _tasks;    private initObject();    private runComplete(result, errorList);    addTasks(tasks: InstallTask[]): void;    getTasks(): InstallTask[];    runTasks(result: (errors: InstallTaskError[]) => void): void;}export class InstallLogger extends AbstractLoggerProxy implements LoggerProxy {    constructor();    private static INSTANCE;    private static _locked;    static getInstance(): LoggerProxy;}export class BuildDirsTask extends AbstractInstallTask implements InstallTask {    constructor();    private initObj();    run(complete: (errors: InstallTaskError[]) => void): void;}}