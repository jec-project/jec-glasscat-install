/*!
 * JEC GlassCat Install Node Module
 * Copyright(c) 2017-2018 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <http://jecproject.org>
 */

declare module "jec-glasscat-install" {

import { LoggerProxy, AbstractLoggerProxy } from "jec-commons";

export abstract class AbstractInstallTask implements InstallTask {
    constructor();
    protected __properties: any;
    getProperties(): any;
    setProperties(props: any): void;
    run(complete: (errors: InstallTaskError[]) => void): void;
}
export interface InstallTask {
    getProperties(): any;
    setProperties(props: any): void;
    run(complete: (errors: InstallTaskError[]) => void): void;
}
export class InstallTaskError {
    constructor(message: string, originalError: any);
    private _message;
    private _originalError;
    private initObject(message, originalError);
    getMessage(): string;
    getOriginalError(): any;
}
export class InstallTaskRunner {
    constructor();
    private _tasks;
    private _errors;
    private _cursor;
    private _isRunning;
    private initObject();
    private nextTask(result);
    private runComplete(result);
    addTasks(tasks: InstallTask[]): void;
    getTasks(): InstallTask[];
    runTasks(result: (errors: InstallTaskError[]) => void): void;
    isRunning(): boolean;
}
export class InstallLogger extends AbstractLoggerProxy implements LoggerProxy {
    constructor();
    private static INSTANCE;
    private static _locked;
    static getInstance(): LoggerProxy;
}
export class BuildConsoleTask extends AbstractInstallTask implements InstallTask {
    constructor();
    private initObj();
    run(complete: (errors: InstallTaskError[]) => void): void;
}
export class BuildDirsTask extends AbstractInstallTask implements InstallTask {
    constructor();
    private initObj();
    run(complete: (errors: InstallTaskError[]) => void): void;
}
export class CopyConfigFilesTask extends AbstractInstallTask implements InstallTask {
    constructor();
    private initObj();
    private _solver;
    private readonly ENCODING;
    run(complete: (errors: InstallTaskError[]) => void): void;
}
export class CopyDirsTask extends AbstractInstallTask implements InstallTask {
    constructor();
    private readonly SLASH;
    private readonly ENCODING;
    private initObj();
    private copyFiles(item, rootPath, buildErrors, complete);
    run(complete: (errors: InstallTaskError[]) => void): void;
}
export class CreateMetadataTask extends AbstractInstallTask implements InstallTask {
    constructor();
    private readonly ENCODING;
    private readonly FILE_NAME;
    private readonly METADATA_PATH;
    run(complete: (errors: InstallTaskError[]) => void): void;
}
export class InstallDefaultGpmTask extends AbstractInstallTask implements InstallTask {
    constructor();
    private _cursor;
    private _isRunning;
    private _errors;
    private installNextGpm(complete);
    run(complete: (errors: InstallTaskError[]) => void): void;
    isRunning(): boolean;
}
export class BuildConsoleTaskProps {
    constructor();
    projectPath: string;
    tsconfigPath: string;
}
export class BuildDirsTaskProps {
    constructor();
    directories: string[];
}
export class ConfigFilePathSolver {
    constructor();
    private readonly SEPARATOR;
    private readonly SLASH;
    extractFilePath(file: string): FilePath;
}
export class CopyConfigFilesTaskProps {
    constructor();
    src: string;
}
export class CopyDirsItem {
    constructor();
    src: string;
    dest: string;
}
export class CopyDirsItemBuilder {
    constructor();
    build(src: string, dest: string): CopyDirsItem;
}
export class CopyDirsTaskProps {
    constructor();
    items: CopyDirsItem[];
}
export class CopyDirsTaskPropsFactory {
    constructor();
    create(): CopyDirsTaskProps;
}
export class DefaultGpmPropsFactory {
    constructor();
    private _config;
    private loadConfig();
    private validateConfig();
    private parse();
    create(): InstallDefaultGpmTaskProps;
}
export class FilePath {
    constructor();
    path: string;
    name: string;
}
export class GpmRef {
    constructor();
    name: string;
    version: string;
}
export class GpmRefParser {
    constructor();
    parse(defaultGpm: any): GpmRef;
}
export class InstallDefaultGpmTaskProps {
    constructor();
    defaultGpmList: Array<GpmRef>;
}
}