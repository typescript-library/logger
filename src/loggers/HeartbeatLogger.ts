import * as t from "../types"
import * as ser from "../Serializer"

export class HeartbeatLogger {

    static HID = 0
    public readonly hid: number

    constructor(
        public s: ser.SERIALIZER_TYPE = new ser.DefaultSerializer(),
        public msg: string,
        public data: { [index: string]: any }
    ) {
        this.hid = HeartbeatLogger.HID ++
        this.def(msg, data)
    }

    def(msg: string, data: { [index: string]: any }) {
        this.s.logStr(`H${this.hid}${JSON.stringify(this.data)}`)
    }

    beat(msg: string, status: { [index: string]: any }) {
        this.s.logStr(`B${this.hid}`)
    }

}

