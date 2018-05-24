export type LevelLoggerOption = {
    error?: Error
    msg?: string
    data?: { [index: string]: any }
};

export type LOG_TYPE = "debug" | "info" | "warn" | "error" | "fatal"

export namespace Persistant {
    export type LevelLog = {
        N: Array<string>,
        T: number,  // Timestamp
        L: number,  // LogLevl
        M?: string,  // Message
        D?: { [index: string]: any },    //Data
        E?: {
            msg?: string,
            name?: string,
            stack?: string
        }   // Stack
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