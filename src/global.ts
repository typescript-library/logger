import * as index from "./index"

export class Instances {

    public static RootLogger = index.Logger.create(
        "Logger",
        index.Serializer.toChalk(
            index.Output.combine(
                index.Output.CONSOLE,
                // index.Output.file("/tmp/a.txt")
            )
        )
    )

}

