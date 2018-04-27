"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const u = __importStar(require("./utils"));
function test() {
    console.log(u.formatDiffString(123423213133, 12));
    console.log(u.formatDiffString(1001));
    console.log(u.formatDiffString(60001));
}
exports.test = test;
test();
