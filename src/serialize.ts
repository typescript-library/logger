import * as t from "./types"

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

import { default as c } from "chalk"

const fmap = {
    0: c.green,
    1: c.blue,
    2: c.yellow,
    3: c.red,
    4: c.magenta
}

export function convert(data: { [index: string]: any }, ret: Array<string>, prefix = ""){
    for (const i in data) {
        if (typeof(data[i]) !== "object"){
            ret.push(`[${prefix+i}]=${data[i]}`)
        } else {
            convert(data[i], ret, prefix+i+".")
        }
    }
}

export class ChalkSerializer extends DefaultSerializer {

    static SEP = 9
    static LEADING_SPACE = " ".repeat(ChalkSerializer.SEP + 1)
    static LEADING_CHARS = "_".repeat(ChalkSerializer.SEP)

    constructor(write: (msg: string)=> void = console.log.bind(console)){
        super()
    }

    history = Date.now()
    public log(
        logType: t.LevelType, 
        o: t.LevelLoggerOption
    ): void {
        const general_text_fun = fmap[logType]

        const now = Date.now()

        const diff_time_str = (
            ChalkSerializer.LEADING_CHARS + 
            (now - this.history) 
        ).slice(-ChalkSerializer.SEP)
        
        const l_difftime = c.redBright(c.bgWhite(diff_time_str))
        const l_time = c.bgWhite(c.black(new Date(now).toISOString() ) )
        const l_msg = general_text_fun(o.msg || "")
        let msg = `${l_difftime} ${l_time} ${l_msg}`
        

        if (o.data){
            const ret: Array<string> = []
            convert(o.data, ret, "")
            const l_data = general_text_fun(ret.join(" "))
            msg += `\n${l_data}`
        }
        this.write(msg.replace("\n", `\n${ChalkSerializer.LEADING_SPACE}`))
        
        this.history = now
    }
}
