import * as t from "../types"

// import * as time from "time"

import { Output } from "./Output"



export class Serializer {
    
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