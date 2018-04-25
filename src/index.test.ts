import { sleep } from "./utils";
import { Logger, Output, Stringify, Serializer } from "./index";

async function main() {
    const llo = Logger.createRoot(
        "MainLogger",
        Serializer.combine(
            new Serializer.Major(
                Stringify.createChalk(),
                Output.combine(
                    Output.CONSOLE,
                    Output.file("/tmp/a.txt")
                )
            )
        )
    );
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