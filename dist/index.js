"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const t = __importStar(require("./types"));
const LevelLogger_1 = require("./loggers/LevelLogger");
const HeartbeatLogger_1 = require("./loggers/HeartbeatLogger");
const StatusLogger_1 = require("./loggers/StatusLogger");
const Serializer = __importStar(require("./serialize/Serializer"));
exports.Serializer = Serializer;
const Stringify = __importStar(require("./serialize/Stringify"));
exports.Stringify = Stringify;
const Output_1 = require("./serialize/Output");
exports.Output = Output_1.Output;
const path_1 = require("path");
class Logger {
    constructor(nameList, s = new Serializer.Major()) {
        this.nameList = nameList;
        this.s = s;
        // Very detailed infomation
        this.debug = new LevelLogger_1.LevelLogger(t.LevelType.DEUBG, this.s, this.nameList);
        this.info = new LevelLogger_1.LevelLogger(t.LevelType.INFO, this.s, this.nameList);
        // Warning
        // Some unoccasional situation, not important
        this.warn = new LevelLogger_1.LevelLogger(t.LevelType.WARN, this.s, this.nameList);
        // Unexepected situation, handled or not
        // TODO: Issue established, explantion or solution MUST GIVEN
        this.error = new LevelLogger_1.LevelLogger(t.LevelType.ERROR, this.s, this.nameList);
        // Error that resulted in exit
        this.fatal = new LevelLogger_1.LevelLogger(t.LevelType.FATAL, this.s, this.nameList);
    }
    static create(name, ...s) {
        const ss = s.length > 1 ?
            Serializer.combine(...s) :
            s.length == 1 ? s[0] : Serializer.toChalk();
        return new Logger([name], ss);
    }
    static createDefault(loggerName, logfileName = undefined, path = ".") {
        logfileName = logfileName || Logger.generateDateString();
        return Logger.create(loggerName, Serializer.toChalk(Output_1.Output.CONSOLE, Output_1.Output.file(path_1.join(path, logfileName + ".chalk.log"))), Serializer.toJSON(Output_1.Output.file(path_1.join(logfileName + ".json.log"))));
    }
    createChildLogger(name) {
        return new Logger([...this.nameList, name], this.s);
    }
    defineHeatbeatLogger(msg, data) {
        return new HeartbeatLogger_1.HeartbeatLogger(this.s, msg, data);
    }
    defineStatusLogger(Schema) {
        return new StatusLogger_1.StatusLogger(this.s, Schema);
    }
    static generateDateString() {
        return new Date().toISOString().replace(/:/g, "-");
    }
}
exports.Logger = Logger;
