import * as index from "./index"

export class Instances {

    public static RootLogger = index.Logger.createRoot(
        "Logger",
        index.Serializer.stringifyToChalk(
            index.Output.combine(
                index.Output.CONSOLE,
                // index.Output.file("/tmp/a.txt")
            )
        )
    )

}

