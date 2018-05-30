import chalk from "chalk"

import * as u from "../utils"
import * as t from "../types"

const c = new chalk.constructor({ level: 1 });

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
) {
    let history = Date.now()

    return function chalk(
        data: t.Persistant.LevelLog
    ) {
        const diff = data.T - history
        history = data.T

        const general_text_fun = fmap[data.L]
        const diff_time_str = (
            LEADING_CHARS +
            u.formatDiffString((diff))
        ).slice(-SEP)

        const l_difftime = c.blue(diff_time_str)
        const l_time = (c.grey(new Date(data.T).toISOString()))
        const l_namelist = data.N
        const l_msg = general_text_fun(data.M || "")
        let msg = `${l_difftime} ${l_time} [${l_namelist}] ${l_msg}`

        if (data.D) {
            const ret: Array<string> = []
            u.convert(data.D, ret, "")
            const l_data = general_text_fun(ret.join(" "))
            msg += `\n${l_data}`
        }

        if (data.E) {
            // msg += `\n[${data.E.name}] ${data.E.msg}\n${data.E.stack && c.dim(data.E.stack)}`
            msg += `\n${data.E.stack && c.dim(data.E.stack)}`
        }
        return msg.replace(/\n/g, `\n${LEADING_SPACE}`)
    }
}
