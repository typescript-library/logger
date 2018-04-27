"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Chalk extends Default {
    constructor(write = console.log.bind(console)) {
        super();
        this.history = Date.now();
    }
    log(logType, o) {
        const now = Date.now();
        this.write(jsonToChalkStr(logType, o, now - this.history, now));
        this.history = now;
    }
}
exports.Chalk = Chalk;
