import { Logger } from "./index"

import { Serializer } from "./serialize/Serializer"
import { sleep } from "./utils";

import * as Stringify from "./serialize/Stringify"

async function main() {
    const llo = new Logger(new Serializer(Stringify.createChalkStringify()));
    llo.debug.o({
        msg: "Program ready"
    });

    await sleep(1218)
    llo.debug.msg("123");
    llo.debug.msg_data("123", {
        status: "on",
        work: {
            a: 1,
            b: 2
        }
    });

    llo.info.msg_data("12321", {
        status: "off",
        work: {
            a: 3,
            b: 4
        }
    })
    llo.warn.trace(new Error("Here").stack || "Here")
    llo.fatal.msg_data("Fatal", {
        status: "off",
        work: {
            a: 3,
            b: 4
        }
    })

    llo.error.msg_data("Error", {
        status: "off",
        work: {
            a: 3,
            b: 4
        }
    })

}

main()