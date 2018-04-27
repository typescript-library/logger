import * as index from "./index"

export var RootLogger = index.Logger.createRoot(
    "Logger",
    new index.Serializer.Major(
        index.Stringify.createChalk(),
        index.Output.combine(
            index.Output.CONSOLE,
            // index.Output.file("/tmp/a.txt")
        )
    )
)


export function injectLogger(logger: index.Logger){
    RootLogger = logger
}

