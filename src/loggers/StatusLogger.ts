import * as t from "../types"
import { SERIALIZER_TYPE } from "../serialize/Default"

export class StatusLogger {

    static SID = 0
    public readonly sid: number

    constructor(
        public s: SERIALIZER_TYPE,
        public data: { [index: string]: any }
    ) {
        this.sid = StatusLogger.SID ++
        this.s.defineStatus(this.sid, data)
    }

    rec(status: { [index: string]: any }) {
        this.s.rec(this.sid, status)
    }
}
