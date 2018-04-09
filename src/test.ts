import { Logger } from "./index"

function main() {
    const llo = new Logger();
    llo.debug.o({
        msg: "Program ready"
    });

    llo.debug.msg("123");
    llo.debug.msg_dict("123", {
        dict: "on"
    });

    llo.warn.trace(new Error("Here").stack || "Here")

}

main()