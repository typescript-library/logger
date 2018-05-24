"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const u = __importStar(require("../utils"));
const c = new chalk_1.default.constructor({ level: 1 });
const DEFAULT_CHALK_LEVEL_MAP = {
    0: c.green,
    1: c.cyan,
    2: c.yellow,
    3: (msg) => c.bold(c.magentaBright(msg)),
    4: (msg) => c.bold(c.redBright(msg))
};
function createChalk(fmap = DEFAULT_CHALK_LEVEL_MAP, SEP = 9, LEADING_SPACE = " ".repeat(SEP + 1), LEADING_CHARS = "_".repeat(SEP)) {
    let history = Date.now();
    return function chalk(data) {
        const diff = data.T - history;
        history = data.T;
        const general_text_fun = fmap[data.L];
        const diff_time_str = (LEADING_CHARS +
            u.formatDiffString((diff))).slice(-SEP);
        const l_difftime = c.blue(diff_time_str);
        const l_time = (c.grey(new Date(data.T).toISOString()));
        const l_namelist = data.N;
        const l_msg = general_text_fun(data.M || "");
        let msg = `${l_difftime} ${l_time} [${l_namelist}] ${l_msg}`;
        if (data.D) {
            const ret = [];
            u.convert(data.D, ret, "");
            const l_data = general_text_fun(ret.join(" "));
            msg += `\n${l_data}`;
        }
        if (data.E) {
            // msg += `\n[${data.E.name}] ${data.E.msg}\n${data.E.stack && c.dim(data.E.stack)}`
            msg += `\n${data.E.stack && c.dim(data.E.stack)}`;
        }
        return msg.replace(/\n/g, `\n${LEADING_SPACE}`);
    };
}
exports.createChalk = createChalk;
