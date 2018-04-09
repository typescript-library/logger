import * as t from "../types"
import * as ser from "../Serializer"

export class StatusLogger {
    constructor(
        public s: ser.SERIALIZER_TYPE,
        public Schema: { [index: string]: string }
    ) {
        this.s.logStr("D" + JSON.stringify(Schema))
    }

    rec(status: { [index: string]: any }) {
        this.s.logStr("S" + JSON.stringify(status))
    }
}
