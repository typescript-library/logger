"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Heartbeat {
    constructor(hid, data) {
        this.hid = hid;
        this.data = data;
    }
}
exports.Heartbeat = Heartbeat;
class Status {
    constructor(sid, data) {
        this.sid = sid;
        this.data = data;
    }
}
exports.Status = Status;
class DefaultUnserializerParser {
    constructor() {
        this.statusList = {};
        this.heartbeats = {};
    }
    record_status(st) {
        this.statusList[st.sid] = st;
    }
    parseStatusDefinition(astr) {
        const pos = astr.indexOf(" ");
        const id = Number.parseInt(astr.slice(1, pos));
        const data = JSON.parse(astr.slice(pos + 1));
        return new Status(id, data);
    }
    parseStatusRecord(astr) {
        const pos = astr.indexOf(" ");
        const id = Number.parseInt(astr.slice(1, pos));
        const pos2 = astr.indexOf(" ", pos);
        const timestamp = Number.parseInt(astr.slice(pos + 1, pos2));
        const data = JSON.parse(astr.slice(pos2 + 1));
        return {
            definition: this.statusList[id],
            timestamp,
            data
        };
    }
    record_heartbeat(hb) {
        this.heartbeats[hb.hid] = hb;
    }
    parseHeart(astr) {
        const pos = astr.indexOf(" ");
        const id = Number.parseInt(astr.slice(1, pos));
        const data = JSON.parse(astr.slice(pos + 1));
        return new Heartbeat(id, data);
    }
    parseBeat(astr) {
        const pos = astr.indexOf(" ");
        const id = Number.parseInt(astr.slice(1, pos));
        const timestamp = Number.parseInt(astr.slice(pos + 1));
        return {
            definition: this.heartbeats[id], timestamp
        };
    }
}
exports.DefaultUnserializerParser = DefaultUnserializerParser;
