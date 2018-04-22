import * as t from "../types"
import { Serializer } from "../serialize/Serializer"

export class LevelLogger {
    constructor(
        public readonly logType: t.LevelType,
        public s = new Serializer()
    ) { }

    o(o: t.LevelLoggerOption) {
        return this.s.log({
            T: Date.now(),
            L: this.logType,
            M: o.msg,
            D: o.data,
            S: o.stack
         });
    }

    msg(msg: string) { 
        this.o({ msg })
    }

    msg_trace(msg: string, stack: string) { 
        this.o({ msg, stack })
    }

    msg_data(msg: string, data: { [index: string]: any }) { 
        this.o({ msg, data })
    }

    msg_data_trace(
        msg: string,
        data: { [index: string]: any },
        stack: string
    ) { 
        this.o({ msg, data, stack })
    }

    trace(stack: string) {
        // this.msg_status_trace(`${arguments.callee.name}()`, {
        //     caller: this.trace.caller,
        //     name: arguments.callee.name
        // }, stack);
        this.msg_trace("invoked", stack)
    }
}