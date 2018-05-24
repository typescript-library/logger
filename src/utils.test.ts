import * as u from "./utils"

export function test() {
    console.log(u.formatDiffString(123423213133, 12))

    console.log(u.formatDiffString(1001))

    console.log(u.formatDiffString(60001))
}

test()