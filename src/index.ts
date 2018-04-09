export type LevelLoggerOption = {
    stack?: string;
    msg?: string;
    status?: { [index: string]: any };
};

export type Serializer = (o: string) => void

export type LOG_TYPE = "debug" | "info" | "warn" | "error" | "fatal" 

export class LevelLogger {
    constructor(
        public readonly logType: string,
        public s: Serializer = console.log.bind(console)
    ) { }

    o(o: LevelLoggerOption) {
        return this.s(JSON.stringify(o));
    }

    msg(msg: string) { 
        this.o({ msg })
    }

    msg_trace(msg: string, stack: string) { 
        this.o({ msg, stack })
    }

    msg_status(msg: string, status: { [index: string]: any }) { 
        this.o({ msg, status })
    }

    msg_status_trace(
        msg: string,
        status: { [index: string]: any },
        stack: string
    ) { 
        this.o({ msg, status, stack })
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
        public s: Serializer = console.log.bind(console),
        public msg: string,
        public status: { [index: string]: any },
        public hid: string
    ) {
    }

    def(msg: string, status: { [index: string]: any }) {
        this.s(`H${this.hid}${JSON.stringify(this.status)}`)
    }

    beat(msg: string, status: { [index: string]: any }) {
        this.s(`B${this.hid}`)
    }

}

export class Logger {
    // Very detailed infomation
    public debug = new LevelLogger("debug");
    public info = new LevelLogger("info");

    // Warning
    // Some unoccasional situation, not important
    public warn = new LevelLogger("warn");

    // Unexepected situation, handled or not
    // TODO: Issue established, explantion or solution MUST GIVEN
    public error = new LevelLogger("error");

    // Error that resulted in exit
    public fatal = new LevelLogger("fatal");
}

function main() {
    const llo = new Logger();
    llo.debug.o({
        msg: "Program ready"
    });

    llo.debug.msg("123");
    llo.debug.msg_status("123", {
        status: "on"
    });

    llo.debug.trace(new Error("Here").stack || "Here")

}

main()
