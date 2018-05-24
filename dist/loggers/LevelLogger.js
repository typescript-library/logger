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
class LevelLogger {
    constructor(logType, s = new Serializer.Major(), nameList) {
        this.logType = logType;
        this.s = s;
        this.nameList = nameList;
    }
    o(o) {
        return this.s.log({
            N: this.nameList,
            T: Date.now(),
            L: this.logType,
            M: o.msg,
            D: o.data,
            E: o.error && {
                msg: o.error.message,
                name: o.error.name,
                stack: o.error.stack
            }
        });
    }
    msg(msg) {
        this.o({ msg });
    }
    msg_trace(msg, error) {
        this.o({ msg, error });
    }
    msg_data(msg, data) {
        this.o({ msg, data });
    }
    msg_data_trace(msg, data, error) {
        this.o({ msg, data, error });
    }
    trace(error) {
        // this.msg_status_trace(`${arguments.callee.name}()`, {
        //     caller: this.trace.caller,
        //     name: arguments.callee.name
        // }, error);
        this.msg_trace("invoked", error);
    }
}
exports.LevelLogger = LevelLogger;
