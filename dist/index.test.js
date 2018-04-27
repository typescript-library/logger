"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
function main() {
    const llo = new index_1.Logger();
    llo.debug.o({
        msg: "Program ready"
    });
    llo.debug.msg("123");
    llo.debug.msg_data("123", {
        status: "on"
    });
    llo.warn.trace(new Error("Here").stack || "Here");
}
main();
