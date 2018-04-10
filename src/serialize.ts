import * as t from "./types"

export abstract class SERIALIZER_TYPE {
    public abstract log(logType: t.LevelType, o: t.LevelLoggerOption): void
 
    // Heatbeat
    public abstract defineHeart(hid: number, data: { [index: string]: any }): void
    public abstract beat(hid: number): void

    // Status
    public abstract defineStatus(sid: number, Schema: { [index: string]: string }): void
    public abstract rec(sid: number, status: { [index: string]: any }): void
    
}

// import * as time from "time"

export class DefaultSerializer extends SERIALIZER_TYPE {
    
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
        this.write(`H${hid}${JSON.stringify(data)}`)
    }

    beat(hid: number) {
        this.write(`B${hid}`)
    }

    defineStatus(sid: number, Schema: { [index: string]: string }){
        this.write(`D${sid}` + JSON.stringify(Schema))
    }

    rec(sid: number, status: { [index: string]: any }) {
        this.write(`S${sid}` + JSON.stringify(status))
    }

}