import * as t from "../types"
import { Default, SERIALIZER_TYPE } from "../serialize/Default"

export class LevelLogger {
    constructor(
        public readonly logType: t.LevelType,
        public s: SERIALIZER_TYPE = new Default()
    ) { }

    o(o: t.LevelLoggerOption) {
        return this.s.log( this.logType, o );
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