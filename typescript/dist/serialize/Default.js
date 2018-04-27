"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SERIALIZER_TYPE {
}
exports.SERIALIZER_TYPE = SERIALIZER_TYPE;
// import * as time from "time"
class Default extends SERIALIZER_TYPE {
    constructor(write = console.log.bind(console)) {
        super();
        this.write = write;
    }
    log(logType, o) {
        this.write(JSON.stringify({
            T: Date.now(),
            L: logType,
            M: o.msg,
            D: o.data,
            S: o.stack
        }));
    }
    defineHeart(hid, data) {
        this.write(`H${hid} ${JSON.stringify(data)}`);
    }
    beat(hid) {
        this.write(`B${hid} ${Date.now()}`);
    }
    defineStatus(sid, data) {
        this.write(`D${sid} ${JSON.stringify(data)}`);
    }
    rec(sid, status) {
        this.write(`S${sid} ${Date.now()} ${JSON.stringify(status)}`);
    }
}
exports.Default = Default;
