"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ser = __importStar(require("../serialize"));
class HeartbeatLogger {
    constructor(s = new ser.DefaultSerializer(), msg, data) {
        this.s = s;
        this.msg = msg;
        this.data = data;
        this.hid = HeartbeatLogger.HID++;
        this.def(msg, data);
    }
    def(msg, data) {
        this.s.defineHeart(this.hid, this.data);
    }
    beat(msg, status) {
        this.s.beat(this.hid);
    }
}
HeartbeatLogger.HID = 0;
exports.HeartbeatLogger = HeartbeatLogger;
