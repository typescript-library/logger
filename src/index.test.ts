import { sleep } from "./utils";
import { Logger, Output, Stringify, Serializer } from "./index";

import * as g from "./global"

async function main() {

    g.Instances.RootLogger = 
        Logger.createRoot(
            "MainLogger-123",
            Serializer.toChalk(
                Output.CONSOLE,
                Output.file("./a.log")
            ),

            Serializer.toChalk(
                Output.file("./a.json.log")
            )
        )
    
    const llo =  g.Instances.RootLogger
    
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

    const slog = llo.createSub("sublogger")

    slog.warn.trace(new Error("Here"))
    slog.fatal.msg_data("Fatal", {
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