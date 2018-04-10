import * as t from "../types"
import * as ser from "../serialize"

export class StatusLogger {

    static SID = 0
    public readonly sid: number

    constructor(
        public s: ser.SERIALIZER_TYPE,
        public data: { [index: string]: any }
    ) {
        this.sid = StatusLogger.SID ++
        this.s.defineStatus(this.sid, schema)
    }

    rec(status: { [index: string]: any }) {
        this.s.rec(this.sid, status)
    }
}
