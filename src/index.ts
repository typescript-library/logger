import * as t from "./types"

import { LevelLogger } from "./loggers/LevelLogger"
import { HeartbeatLogger } from "./loggers/HeartbeatLogger"
import { StatusLogger } from "./loggers/StatusLogger"

import { SERIALIZER_TYPE, DefaultSerializer } from "./Serializer"
export { SERIALIZER_TYPE, DefaultSerializer }

export class Logger {

    constructor(public readonly s: SERIALIZER_TYPE = new DefaultSerializer()){
        
    }

    // Very detailed infomation
    public debug = new LevelLogger(t.LevelType.DEUBG, this.s);
    public info = new LevelLogger(t.LevelType.INFO, this.s);

    // Warning
    // Some unoccasional situation, not important
    public warn = new LevelLogger(t.LevelType.WARN, this.s);

    // Unexepected situation, handled or not
    // TODO: Issue established, explantion or solution MUST GIVEN
    public error = new LevelLogger(t.LevelType.ERROR, this.s);

    // Error that resulted in exit
    public fatal = new LevelLogger(t.LevelType.FATAL, this.s);

    defineHeatbeatLogger(
        msg: string,
        data: { [index: string]: any }
    ){
        return new HeartbeatLogger(this.s, msg, data)
    }

    defineStatusLogger(Schema: { [index: string]: string }){
        return new StatusLogger(this.s, Schema)
    }

}
