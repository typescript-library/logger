import * as fs from "fs"

export namespace Output {

    export type Type = (msg: string) => void

    export const CONSOLE: Type = (msg: string) => console.log(msg)

    export function file(filepath: string): Type {
        return (msg: string) => fs.appendFile(filepath, msg + "\n", () => { })
    }

    export function combine(...outputs: Array<Type>): Type {
        return (msg: string) => outputs.forEach((e) => e(msg))
    }

}