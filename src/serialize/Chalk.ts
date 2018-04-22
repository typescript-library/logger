import { default as c } from "chalk"

const fmap = {
    0: c.green,
    1: c.cyan,
    2: c.yellow,
    3: (msg: string) => c.bold(c.magentaBright(msg)),
    4: (msg: string) => c.bold(c.redBright(msg))
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

import * as u from "../utils"
import { Default } from "./Default";
import * as t from "../types"

export class Chalk extends Default {

    static SEP = 9
    static LEADING_SPACE = " ".repeat(Chalk.SEP + 1)
    static LEADING_CHARS = "_".repeat(Chalk.SEP)

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
            Chalk.LEADING_CHARS + 
            u.formatDiffString((now - this.history))
        ).slice(-Chalk.SEP)

        
        const l_difftime = c.blue(diff_time_str)
        const l_time = (c.grey(new Date(now).toISOString() ) )
        const l_msg = general_text_fun(o.msg || "")
        let msg = `${l_difftime} ${l_time} ${l_msg}`

        if (o.data){
            const ret: Array<string> = []
            convert(o.data, ret, "")
            const l_data = general_text_fun(ret.join(" "))
            msg += `\n${l_data}`
        }
        this.write(msg.replace("\n", `\n${Chalk.LEADING_SPACE}`))
        
        this.history = now
    }
}
