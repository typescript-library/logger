"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertToUnits(millis) {
    let rest = millis;
    const ms = rest % 1000;
    rest = Math.floor(rest / 1000);
    const sec = rest % 60;
    rest = Math.floor(rest / 1000);
    const minute = rest % 60;
    rest = Math.floor(rest / 60);
    const hour = rest % 24;
    const day = Math.floor(rest / 24);
    return [day, "d", hour, "h", minute, "m", sec, "s", ms, ""];
}
exports.convertToUnits = convertToUnits;
function formatDiffString(millis, max_string = 9) {
    const result = convertToUnits(millis);
    let ret = "";
    let total_length = 0;
    for (let i = 0; i < result.length; i += 2) {
        if (result[i] === 0)
            continue;
        const s = `${result[i]}${result[i + 1]}`;
        if (s.length + ret.length > max_string) {
            if (ret.length === 0)
                ret += s;
            return ret;
        }
        ret += s;
    }
    return ret;
}
exports.formatDiffString = formatDiffString;
function sleep(millis) {
    return new Promise((res, rej) => setTimeout(res, millis));
}
exports.sleep = sleep;
// { a: { b:1, c:2 }}
// => [a.b]=1 [a.c]=2
function convert(data, ret, prefix = "") {
    for (const i in data) {
        if (typeof (data[i]) !== "object") {
            ret.push(`[${prefix + i}]=${data[i]}`);
        }
        else {
            convert(data[i], ret, prefix + i + ".");
        }
    }
}
exports.convert = convert;
function stringifyError(e) {
    return {
        msg: e.message,
        name: e.name,
        stack: e.stack
    };
}
exports.stringifyError = stringifyError;
