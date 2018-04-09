import { Logger } from "./index"

function main() {
    const llo = new Logger();
    llo.debug.o({
        msg: "Program ready"
    });

    llo.debug.msg("123");
    llo.debug.msg_data("123", {
        status: "on"
    });

    llo.warn.trace(new Error("Here").stack || "Here")

}

main()