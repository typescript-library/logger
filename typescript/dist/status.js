"use strict";
const given = { a: { b: 1, c: 2 }, d: 3 };
function rec(given, alist = []) {
    if (given.foreach) {
        given.foreach((d) => {
            rec(d, alist);
        });
    }
    else {
        alist.push(given);
    }
    return alist;
}
console.log(rec(given));
