"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serializer = __importStar(require("../serialize/Serializer"));
class StatusLogger {
    constructor(s = new Serializer.Major(), data) {
        this.s = s;
        this.data = data;
        this.sid = StatusLogger.SID++;
        this.s.defineStatus(this.sid, data);
    }
    rec(status) {
        this.s.rec(this.sid, status);
    }
}
StatusLogger.SID = 0;
exports.StatusLogger = StatusLogger;
