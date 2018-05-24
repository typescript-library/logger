"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const index_1 = require("./index");
const g = __importStar(require("./global"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        g.Instances.RootLogger =
            index_1.Logger.createRoot("MainLogger-123", index_1.Serializer.toChalk(index_1.Output.CONSOLE, index_1.Output.file("./a.log")), index_1.Serializer.toChalk(index_1.Output.file("./a.json.log")));
        const llo = g.Instances.RootLogger;
        llo.debug.o({
            msg: "Program ready"
        });
        yield utils_1.sleep(1218);
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
        });
        const slog = llo.createSub("sublogger");
        slog.warn.trace(new Error("Here"));
        slog.fatal.msg_data("Fatal", {
            status: "off",
            work: {
                a: 3,
                b: 4
            }
        });
        llo.error.msg_data("Error", {
            status: "off",
            work: {
                a: 3,
                b: 4
            }
        });
    });
}
main();
