export class Heartbeat {
    constructor(
        public hid: number,
        public data: { [index: string]: string }) {

    }
}

export class Status {
    constructor(
        public sid: number,
        public data: { [index: string]: any }
    ) {

    }
}

export class DefaultUnserializerParser {

    statusList: { [index: number]: Status } = {}
    record_status(st: Status) {
        this.statusList[st.sid] = st
    }

    parseStatusDefinition(astr: string) {

        const pos = astr.indexOf(" ")
        const id = Number.parseInt(astr.slice(1, pos))
        const data = JSON.parse(astr.slice(pos + 1))

        return new Status(id, data)
    }

    parseStatusRecord(astr: string) {
        const pos = astr.indexOf(" ")
        const id = Number.parseInt(astr.slice(1, pos))
        const pos2 = astr.indexOf(" ", pos)
        const timestamp = Number.parseInt(astr.slice(pos + 1, pos2))
        const data = JSON.parse(astr.slice(pos2 + 1))
        return {
            definition: this.statusList[id],
            timestamp,
            data
        }

    }

    heartbeats: { [index: number]: Heartbeat } = {}
    record_heartbeat(hb: Heartbeat) {
        this.heartbeats[hb.hid] = hb
    }

    parseHeart(astr: string) {
        const pos = astr.indexOf(" ")
        const id = Number.parseInt(astr.slice(1, pos))
        const data = JSON.parse(astr.slice(pos + 1))

        return new Heartbeat(id, data)
    }

    parseBeat(astr: string) {
        const pos = astr.indexOf(" ")
        const id = Number.parseInt(astr.slice(1, pos))
        const timestamp = Number.parseInt(astr.slice(pos + 1))
        return {
            definition: this.heartbeats[id], timestamp
        }

    }
}
