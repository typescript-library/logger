export type LevelLoggerOption = {
    stack?: string;
    msg?: string;
    data?: { [index: string]: any };
};

export type LOG_TYPE = "debug" | "info" | "warn" | "error" | "fatal" 

export enum LevelType {
    DEUBG, INFO, WARN, ERROR, FATAL
}