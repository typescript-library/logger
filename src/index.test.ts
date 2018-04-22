import { Logger } from "./index"

import * as s from "./serialize"

function main() {
    const llo = new Logger(new s.ChalkSerializer());
    llo.debug.o({
        msg: "Program ready"
    });

    llo.debug.msg("123");
    llo.debug.msg_data("123", {
        status: "on",
        work: {
            a: 1,
            b: 2
        }
    });

    llo.warn.trace(new Error("Here").stack || "Here")
    llo.fatal.msg_data("Wrong", {
        status: "off",
        work: {
            a: 3,
            b: 4
        }
    })

    llo.error.msg_data("Wrong", {
        status: "off",
        work: {
            a: 3,
            b: 4
        }
    })

}

main()