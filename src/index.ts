export type LevelLoggerOption = {
  stack?: string;
  msg?: string;
  status?: { [index: string]: any };
};

export type Serializer = (o: string) => void

export class LevelLogger {
  constructor(public s: Serializer = console.log.bind(console)) {}

  o(o: LevelLoggerOption) {
    return this.s(JSON.stringify(o));
  }

  msg(msg: string) {}

  msg_trace(msg: string, stack: string) {}

  msg_status(msg: string, status: { [index: string]: any }) {}

  msg_status_trace(
    msg: string,
    status: { [index: string]: any },
    stack: string
  ) {}

  trace(stack: string) {
    this.msg_trace(`$(arguments.callee.name)()`, stack);
  }
}

export class StatusLogger{
    constructor(
        public s: Serializer = console.log.bind(console),
        public Schema: { [index: string]: string }
    ) {
        this.s("D" + JSON.stringify(Schema))
    }

    rec(status: {[index: string]: any}){
        this.s("S" + JSON.stringify(status))
    }
}

export class HeartbeatLogger{
    
    constructor(
        public s: Serializer = console.log.bind(console),
        public msg: string, 
        public status: { [index: string]: any },
        public hid: string
    ) {
    }

    def(msg: string, status: { [index: string]: any }){
        this.s(`H${this.hid}${JSON.stringify(this.status)}`)
    }
    
    beat(msg: string, status: { [index: string]: any }){
        this.s(`B${this.hid}`)
    }

}

export class Logger {
  // Very detailed infomation
  public debug = new LevelLogger();
  public info = new LevelLogger();

  // Warning
  // Some unoccasional situation, not important
  public warn = new LevelLogger();

  // Unexepected situation, handled or not
  // TODO: Issue established, explantion or solution MUST GIVEN
  public error = new LevelLogger();

  // Error that resulted in exit
  public fatal = new LevelLogger();
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

}
