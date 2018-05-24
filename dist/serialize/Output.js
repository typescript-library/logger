"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
var Output;
(function (Output) {
    Output.CONSOLE = (msg) => console.log(msg);
    function file(filepath) {
        return (msg) => fs.appendFile(filepath, msg + "\n", () => { });
    }
    Output.file = file;
    function combine(...outputs) {
        return (msg) => outputs.forEach((e) => e(msg));
    }
    Output.combine = combine;
})(Output = exports.Output || (exports.Output = {}));
