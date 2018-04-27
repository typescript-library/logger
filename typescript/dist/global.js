"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index = __importStar(require("./index"));
class Instances {
}
Instances.RootLogger = index.Logger.createRoot("Logger", new index.Serializer.Major(index.Stringify.createChalk(), index.Output.combine(index.Output.CONSOLE)));
exports.Instances = Instances;
