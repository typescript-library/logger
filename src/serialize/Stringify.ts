import { default as c } from "chalk"

import * as u from "../utils"
import * as t from "../types"

const DEFAULT_CHALK_LEVEL_MAP: { [index: number]: (msg: string) => string } = {
    0: c.green,
    1: c.cyan,
    2: c.yellow,
    3: (msg: string) => c.bold(c.magentaBright(msg)),
    4: (msg: string) => c.bold(c.redBright(msg))
}

export function createChalk(
    fmap = DEFAULT_CHALK_LEVEL_MAP,
    SEP = 9,
    LEADING_SPACE = " ".repeat(SEP + 1),
    LEADING_CHARS = "_".repeat(SEP)
){
    let history = Date.now()

    return function chalk(
        data: t.Persistant.LevelLog
    ){
        const diff = data.T - history
        history = data.T

        const general_text_fun = fmap[data.L]
        const diff_time_str = (
            LEADING_CHARS + 
            u.formatDiffString((diff))
        ).slice(-SEP)

        const l_difftime = c.blue(diff_time_str)
        const l_time = (c.grey(new Date(data.T).toISOString() ) )
        const l_msg = general_text_fun(data.M || "")
        let msg = `${l_difftime} ${l_time} ${l_msg}`

        if (data.D){
            const ret: Array<string> = []
            u.convert(data.D, ret, "")
            const l_data = general_text_fun(ret.join(" "))
            msg += `\n${l_data}`
        }
        return msg.replace("\n", `\n${LEADING_SPACE}`)
    }
}
