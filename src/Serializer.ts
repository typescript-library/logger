import * as t from "./types"

export abstract class SERIALIZER_TYPE {
    public abstract log(logType: t.LevelType, o: t.LevelLoggerOption): void
 
    // Heatbeat
    public abstract defineHeart(hid: number, data: { [index: string]: any }): void
    public abstract beat(hid: number): void

    // Status
    public abstract defineStatus(Schema: { [index: string]: string }): void
    public abstract rec(status: { [index: string]: any }): void
    
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

    defineStatus(Schema: { [index: string]: string }){
        this.write("D" + JSON.stringify(Schema))
    }

    rec(status: { [index: string]: any }) {
        this.write("S" + JSON.stringify(status))
    }

}