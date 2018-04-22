import * as t from "../types"

// import * as time from "time"

import { Output } from "./Output"

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

export class Major implements Type{
    
    constructor(
        public levelLogStringify = JSON.stringify,
        public output = Output.CONSOLE,
    ){
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

    defineStatus(sid: number, data: { [index: string]: any }){
        this.output(`D${sid} ${JSON.stringify(data)}`)
    }

    rec(sid: number, status: { [index: string]: any }) {
        this.output(`S${sid} ${Date.now()} ${JSON.stringify(status)}`)
    }

}

export class Combination implements Type {
    
    constructor(
        public s: Array<Type>
    ){
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

    defineStatus(sid: number, data: { [index: string]: any }){
        this.s.forEach((e) => e.defineStatus(sid, data))
    }

    rec(sid: number, status: { [index: string]: any }) {
        this.s.forEach((e) => e.rec(sid, status))
    }

}
