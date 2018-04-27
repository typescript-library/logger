import * as t from "../types"
import * as Serializer from "../serialize/Serializer"

export class LevelLogger {
    constructor(
        public readonly logType: t.LevelType,
        public s: Serializer.Type = new Serializer.Major(),
        public readonly nameList: Array<string>
    ) { }

    o(o: t.LevelLoggerOption) {
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

    msg(msg: string) { 
        this.o({ msg })
    }

    msg_trace(msg: string, error: Error) { 
        this.o({ msg, error })
    }

    msg_data(msg: string, data: { [index: string]: any }) { 
        this.o({ msg, data })
    }

    msg_data_trace(
        msg: string,
        data: { [index: string]: any },
        error: Error
    ) { 
        this.o({ msg, data, error })
    }

    trace(error: Error) {
        // this.msg_status_trace(`${arguments.callee.name}()`, {
        //     caller: this.trace.caller,
        //     name: arguments.callee.name
        // }, error);
        this.msg_trace("invoked", error)
    }
}