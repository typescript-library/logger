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
const DEFAULT_CHALK_LEVEL_MAP = {
    0: chalk_1.default.green,
    1: chalk_1.default.cyan,
    2: chalk_1.default.yellow,
    3: (msg) => chalk_1.default.bold(chalk_1.default.magentaBright(msg)),
    4: (msg) => chalk_1.default.bold(chalk_1.default.redBright(msg))
};
function createChalkStringify(fmap = DEFAULT_CHALK_LEVEL_MAP, SEP = 9, LEADING_SPACE = " ".repeat(SEP + 1), LEADING_CHARS = "_".repeat(SEP)) {
    let history = Date.now();
    return function chalk(data) {
        const diff = data.T - history;
        history = data.T;
        const general_text_fun = fmap[data.L];
        const diff_time_str = (LEADING_CHARS +
            u.formatDiffString((diff))).slice(-SEP);
        const l_difftime = chalk_1.default.blue(diff_time_str);
        const l_time = (chalk_1.default.grey(new Date(data.T).toISOString()));
        const l_msg = general_text_fun(data.M || "");
        let msg = `${l_difftime} ${l_time} ${l_msg}`;
        if (data.D) {
            const ret = [];
            u.convert(data.D, ret, "");
            const l_data = general_text_fun(ret.join(" "));
            msg += `\n${l_data}`;
        }
        return msg.replace("\n", `\n${LEADING_SPACE}`);
    };
}
exports.createChalkStringify = createChalkStringify;
