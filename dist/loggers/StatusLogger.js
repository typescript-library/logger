"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusLogger {
    constructor(s, data) {
        this.s = s;
        this.data = data;
        this.sid = StatusLogger.SID++;
        this.s.defineStatus(this.sid, data);
    }
    rec(status) {
        this.s.rec(this.sid, status);
    }
}
StatusLogger.SID = 0;
exports.StatusLogger = StatusLogger;
