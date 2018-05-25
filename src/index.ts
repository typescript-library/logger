import * as t from "./types"

import { LevelLogger } from "./loggers/LevelLogger"
import { HeartbeatLogger } from "./loggers/HeartbeatLogger"
import { StatusLogger } from "./loggers/StatusLogger"

import * as Serializer from "./serialize/Serializer"
export { Serializer }

import * as Stringify from "./serialize/Stringify"
export { Stringify }

import { Output } from "./serialize/Output"
export { Output }

import { join as pj } from "path"

export class Logger {

    constructor(
        public nameList: Array<string>,
        public readonly s: Serializer.Type = new Serializer.Major()) {

    }

    static create(name: string, ...s: Serializer.Type[]) {
        const ss = s.length > 1 ?
            Serializer.combine(...s) :
            s.length == 1 ? s[0] : Serializer.toChalk()

        return new Logger([name], ss)
    }

    static createDefault(
        loggerName: string,
        logfileName: string | undefined = undefined,
        path="."
    ){
        logfileName = logfileName || Logger.generateDateString()

        return Logger.create(
            loggerName,
            Serializer.toChalk(
                Output.CONSOLE,
                Output.file(pj(path, logfileName + ".chalk.log"))
            ),
            Serializer.toJSON(
                Output.file(pj(logfileName + ".json.log"))
            )
        )
    }

    createChildLogger(name: string) {
        return new Logger([...this.nameList, name], this.s)
    }

    // Very detailed infomation
    public debug = new LevelLogger(t.LevelType.DEUBG, this.s, this.nameList);
    public info = new LevelLogger(t.LevelType.INFO, this.s, this.nameList);

    // Warning
    // Some unoccasional situation, not important
    public warn = new LevelLogger(t.LevelType.WARN, this.s, this.nameList);

    // Unexepected situation, handled or not
    // TODO: Issue established, explantion or solution MUST GIVEN
    public error = new LevelLogger(t.LevelType.ERROR, this.s, this.nameList);

    // Error that resulted in exit
    public fatal = new LevelLogger(t.LevelType.FATAL, this.s, this.nameList);

    defineHeatbeatLogger(
        msg: string,
        data: { [index: string]: any }
    ) {
        return new HeartbeatLogger(this.s, msg, data)
    }

    defineStatusLogger(Schema: { [index: string]: string }) {
        return new StatusLogger(this.s, Schema)
    }

    static generateDateString(){
        return new Date().toISOString().replace(/:/g, "-")
    }

}
