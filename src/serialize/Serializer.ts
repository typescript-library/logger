import * as t from "../types"

// import * as time from "time"

import { Output } from "./Output"
import chalk from "chalk";
import { Stringify } from "..";

// export type SO = {
//     "stringify": (msg: string) => void
//     "output": Output.Type
// }

export interface Type {

    log(data: t.Persistant.LevelLog): void

    defineHeart(hid: number, data: { [index: string]: any }): void

    beat(hid: number): void

    defineStatus(sid: number, data: { [index: string]: any }): void

    rec(sid: number, status: { [index: string]: any }): void
}

export class Major implements Type {

    public output: Output.Type
    constructor(
        public levelLogStringify: (msg: t.Persistant.LevelLog) => string = JSON.stringify,
        ...output: Output.Type[],
    ) {
        this.output =
            output.length === 0 ?
                Output.CONSOLE :
                output.length === 1 ? output[0] : Output.combine(...output)
    }

    public log(data: t.Persistant.LevelLog): void {
        this.output(this.levelLogStringify(data))
    }

    defineHeart(hid: number, data: { [index: string]: any }) {
        this.output(`H${hid} ${JSON.stringify(data)}`)
    }

    beat(hid: number) {
        this.output(`B${hid} ${Date.now()}`)
    }

    defineStatus(sid: number, data: { [index: string]: any }) {
        this.output(`D${sid} ${JSON.stringify(data)}`)
    }

    rec(sid: number, status: { [index: string]: any }) {
        this.output(`S${sid} ${Date.now()} ${JSON.stringify(status)}`)
    }

}

export function toChalk(...output: Output.Type[]) {
    return new Major(Stringify.createChalk(), ...output)
}

export function toJSON(...output: Output.Type[]) {
    return new Major(JSON.stringify, ...output)
}

export function combine(...s: Array<Type>) {
    return new Combination(s)
}

// NOTICE: Serializer.forEach() could be catch. But we bet the serializer is exception-free
export class Combination implements Type {

    constructor(
        public s: Array<Type>
    ) {
    }

    public log(data: t.Persistant.LevelLog): void {
        this.s.forEach((e) => e.log(data))
    }

    defineHeart(hid: number, data: { [index: string]: any }) {
        this.s.forEach((e) => e.defineHeart(hid, data))
    }

    beat(hid: number) {
        this.s.forEach((e) => e.beat(hid))
    }

    defineStatus(sid: number, data: { [index: string]: any }) {
        this.s.forEach((e) => e.defineStatus(sid, data))
    }

    rec(sid: number, status: { [index: string]: any }) {
        this.s.forEach((e) => e.rec(sid, status))
    }

}
