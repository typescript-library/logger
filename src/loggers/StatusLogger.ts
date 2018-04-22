import * as t from "../types"
import { Serializer } from "../serialize/Serializer"

export class StatusLogger {

    static SID = 0
    public readonly sid: number

    constructor(
        public s: Serializer,
        public data: { [index: string]: any }
    ) {
        this.sid = StatusLogger.SID ++
        this.s.defineStatus(this.sid, data)
    }

    rec(status: { [index: string]: any }) {
        this.s.rec(this.sid, status)
    }
}
