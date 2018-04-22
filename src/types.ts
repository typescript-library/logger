export type LevelLoggerOption = {
    stack?: string;
    msg?: string;
    data?: { [index: string]: any };
};

export type LOG_TYPE = "debug" | "info" | "warn" | "error" | "fatal" 

export namespace Persistant{
    export type LevelLog = {
        T: number,  // Timestamp
        L: number,  // LogLevl
        M?: string,  // Message
        D?: { [index: string]: any },    //Data
        S?: string   // Stack
    }

    export type HeatLog = BeatLog & {
        data: { [index: string]: any }
    }

    export type BeatLog = {
        hid: number
    }

    export type StatusDefineLog = {
        sid: number, data: { [index: string]: any }
    }

    export type StatusRecordLog = {
        sid: number, data: { [index: string]: any }
    }

}

export enum LevelType {
    DEUBG, INFO, WARN, ERROR, FATAL
}