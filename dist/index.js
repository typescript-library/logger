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
const serialize_1 = require("./serialize");
exports.SERIALIZER_TYPE = serialize_1.SERIALIZER_TYPE;
exports.DefaultSerializer = serialize_1.DefaultSerializer;
class Logger {
    constructor(s = new serialize_1.DefaultSerializer()) {
        this.s = s;
        // Very detailed infomation
        this.debug = new LevelLogger_1.LevelLogger(t.LevelType.DEUBG, this.s);
        this.info = new LevelLogger_1.LevelLogger(t.LevelType.INFO, this.s);
        // Warning
        // Some unoccasional situation, not important
        this.warn = new LevelLogger_1.LevelLogger(t.LevelType.WARN, this.s);
        // Unexepected situation, handled or not
        // TODO: Issue established, explantion or solution MUST GIVEN
        this.error = new LevelLogger_1.LevelLogger(t.LevelType.ERROR, this.s);
        // Error that resulted in exit
        this.fatal = new LevelLogger_1.LevelLogger(t.LevelType.FATAL, this.s);
    }
    defineHeatbeatLogger(msg, data) {
        return new HeartbeatLogger_1.HeartbeatLogger(this.s, msg, data);
    }
    defineStatusLogger(Schema) {
        return new StatusLogger_1.StatusLogger(this.s, Schema);
    }
}
exports.Logger = Logger;
