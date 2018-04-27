"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as time from "time"
const Output_1 = require("./Output");
class Major {
    constructor(levelLogStringify = JSON.stringify, output = Output_1.Output.CONSOLE) {
        this.levelLogStringify = levelLogStringify;
        this.output = output;
    }
    log(data) {
        this.output(this.levelLogStringify(data));
    }
    defineHeart(hid, data) {
        this.output(`H${hid} ${JSON.stringify(data)}`);
    }
    beat(hid) {
        this.output(`B${hid} ${Date.now()}`);
    }
    defineStatus(sid, data) {
        this.output(`D${sid} ${JSON.stringify(data)}`);
    }
    rec(sid, status) {
        this.output(`S${sid} ${Date.now()} ${JSON.stringify(status)}`);
    }
}
exports.Major = Major;
function combine(...s) {
    return new Combination(s);
}
exports.combine = combine;
class Combination {
    constructor(s) {
        this.s = s;
    }
    log(data) {
        this.s.forEach((e) => e.log(data));
    }
    defineHeart(hid, data) {
        this.s.forEach((e) => e.defineHeart(hid, data));
    }
    beat(hid) {
        this.s.forEach((e) => e.beat(hid));
    }
    defineStatus(sid, data) {
        this.s.forEach((e) => e.defineStatus(sid, data));
    }
    rec(sid, status) {
        this.s.forEach((e) => e.rec(sid, status));
    }
}
exports.Combination = Combination;
