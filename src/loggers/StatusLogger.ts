import * as t from "../types"
import * as ser from "../Serializer"

export class StatusLogger {

    static SID = 0
    public readonly sid: number

    constructor(
        public s: ser.SERIALIZER_TYPE,
        public schema: { [index: string]: string }
    ) {
        this.sid = StatusLogger.SID ++
        this.s.defineStatus(this.sid, schema)
    }

    rec(status: { [index: string]: any }) {
        this.s.rec(this.sid, status)
    }
}
