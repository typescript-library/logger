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
class LevelLogger {
    constructor(logType, s = new ser.DefaultSerializer()) {
        this.logType = logType;
        this.s = s;
    }
    o(o) {
        return this.s.log(this.logType, o);
    }
    msg(msg) {
        this.o({ msg });
    }
    msg_trace(msg, stack) {
        this.o({ msg, stack });
    }
    msg_data(msg, data) {
        this.o({ msg, data });
    }
    msg_data_trace(msg, data, stack) {
        this.o({ msg, data, stack });
    }
    trace(stack) {
        // this.msg_status_trace(`${arguments.callee.name}()`, {
        //     caller: this.trace.caller,
        //     name: arguments.callee.name
        // }, stack);
        this.msg_trace("invoked", stack);
    }
}
exports.LevelLogger = LevelLogger;
