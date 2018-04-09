export type LevelLoggerOption = {
    stack?: string;
    msg?: string;
    dict?: { [index: string]: any };
};

export type Serializer = (o: string) => void

export type LOG_TYPE = "debug" | "info" | "warn" | "error" | "fatal" 

export abstract class SERIALIZER_TYPE {
    public abstract log(logType: LevelType, o: LevelLoggerOption): void
    public abstract logStr(msg: string): void
}

// import * as time from "time"

export class DefaultSerializer extends SERIALIZER_TYPE {
    public log(logType: LevelType, o: LevelLoggerOption): void {
        console.log(JSON.stringify({
            T: Date.now(),
            L: logType, 
            M: o.msg,
            D: o.dict,
            S: o.stack
         }))
    }

    public logStr(msg: string){
        console.log(msg)
    }
}

export enum LevelType {
    DEUBG, INFO, WARN, ERROR, FATAL
}

export class LevelLogger {
    constructor(
        public readonly logType: LevelType,
        public s: SERIALIZER_TYPE = new DefaultSerializer()
    ) { }

    o(o: LevelLoggerOption) {
        return this.s.log( this.logType, o );
    }

    msg(msg: string) { 
        this.o({ msg })
    }

    msg_trace(msg: string, stack: string) { 
        this.o({ msg, stack })
    }

    msg_dict(msg: string, dict: { [index: string]: any }) { 
        this.o({ msg, dict })
    }

    msg_dict_trace(
        msg: string,
        dict: { [index: string]: any },
        stack: string
    ) { 
        this.o({ msg, dict, stack })
    }

    trace(stack: string) {
        // this.msg_status_trace(`${arguments.callee.name}()`, {
        //     caller: this.trace.caller,
        //     name: arguments.callee.name
        // }, stack);
        this.msg_trace("invoked", stack)
    }
}

export class StatusLogger {
    constructor(
        public s: Serializer = console.log.bind(console),
        public Schema: { [index: string]: string }
    ) {
        this.s("D" + JSON.stringify(Schema))
    }

    rec(status: { [index: string]: any }) {
        this.s("S" + JSON.stringify(status))
    }
}

export class HeartbeatLogger {

    constructor(
        public s: SERIALIZER_TYPE = new DefaultSerializer(),
        public msg: string,
        public status: { [index: string]: any },
        public hid: string
    ) {
    }

    def(msg: string, status: { [index: string]: any }) {
        this.s.logStr(`H${this.hid}${JSON.stringify(this.status)}`)
    }

    beat(msg: string, status: { [index: string]: any }) {
        this.s.logStr(`B${this.hid}`)
    }

}

export class Logger {
    // Very detailed infomation
    public debug = new LevelLogger(LevelType.DEUBG);
    public info = new LevelLogger(LevelType.INFO);

    // Warning
    // Some unoccasional situation, not important
    public warn = new LevelLogger(LevelType.WARN);

    // Unexepected situation, handled or not
    // TODO: Issue established, explantion or solution MUST GIVEN
    public error = new LevelLogger(LevelType.ERROR);

    // Error that resulted in exit
    public fatal = new LevelLogger(LevelType.FATAL);
}
