import * as t from "./types"

export abstract class SERIALIZER_TYPE {
    public abstract log(logType: t.LevelType, o: t.LevelLoggerOption): void
    public abstract logStr(msg: string): void
}

// import * as time from "time"

export class DefaultSerializer extends SERIALIZER_TYPE {
    public log(logType: t.LevelType, o: t.LevelLoggerOption): void {
        console.log(JSON.stringify({
            T: Date.now(),
            L: logType, 
            M: o.msg,
            D: o.data,
            S: o.stack
         }))
    }

    public logStr(msg: string){
        console.log(msg)
    }
}