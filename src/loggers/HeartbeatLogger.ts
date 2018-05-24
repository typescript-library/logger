import * as t from "../types"
import * as Serializer from "../serialize/Serializer"

export class HeartbeatLogger {

    static HID = 0
    public readonly hid: number

    constructor(
        public s: Serializer.Type = new Serializer.Major(),
        public msg: string,
        public data: { [index: string]: any }
    ) {
        this.hid = HeartbeatLogger.HID++
        this.def(msg, data)
    }

    def(msg: string, data: { [index: string]: any }) {
        this.s.defineHeart(this.hid, this.data)
    }

    beat(msg: string, status: { [index: string]: any }) {
        this.s.beat(this.hid)
    }

}

