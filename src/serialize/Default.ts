import * as t from "../types"

export abstract class SERIALIZER_TYPE {
    public abstract log(logType: t.LevelType, o: t.LevelLoggerOption): void
 
    // Heatbeat
    public abstract defineHeart(hid: number, data: { [index: string]: any }): void
    public abstract beat(hid: number): void

    // Status
    public abstract defineStatus(sid: number, data: { [index: string]: any }): void
    public abstract rec(sid: number, status: { [index: string]: any }): void
    
}

// import * as time from "time"

export class Default extends SERIALIZER_TYPE {
    
    constructor(public write: (msg: string)=> void = console.log.bind(console)){
        super()
    }

    public log(
        logType: t.LevelType, 
        o: t.LevelLoggerOption
    ): void {
        this.write(JSON.stringify({
            T: Date.now(),
            L: logType, 
            M: o.msg,
            D: o.data,
            S: o.stack
         }))
    }

    defineHeart(hid: number, data: { [index: string]: any }) {
        this.write(`H${hid} ${JSON.stringify(data)}`)
    }

    beat(hid: number) {
        this.write(`B${hid} ${Date.now()}`)
    }

    defineStatus(sid: number, data: { [index: string]: any }){
        this.write(`D${sid} ${JSON.stringify(data)}`)
    }

    rec(sid: number, status: { [index: string]: any }) {
        this.write(`S${sid} ${Date.now()} ${JSON.stringify(status)}`)
    }

}