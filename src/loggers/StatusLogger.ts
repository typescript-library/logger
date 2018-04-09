import * as t from "../types"
import * as ser from "../Serializer"

export class StatusLogger {
    constructor(
        public s: ser.SERIALIZER_TYPE,
        public schema: { [index: string]: string }
    ) {
        this.s.defineStatus(schema)
    }

    rec(status: { [index: string]: any }) {
        this.s.rec(status)
    }
}
