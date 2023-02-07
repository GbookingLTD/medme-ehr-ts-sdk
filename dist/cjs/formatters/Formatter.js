"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateISOFormat = function (d) {
    return d == null ? "" : typeof d === "string" ? d : d.toISOString();
};
function paragrathes(a) {
    if (a.length == 0)
        return "";
    // this is simple string
    if (a.length == 1 && a[0].length < 100 && a[0].indexOf("\n") < 0)
        return a[0];
    return a.join("\n\n");
}
exports.paragrathes = paragrathes;
function paragrathes_nl(a, offset) {
    if (a.length == 0)
        return "";
    return "\n" + offset + a.join("\n\n");
}
exports.paragrathes_nl = paragrathes_nl;
exports.trim = function (str) { return str.replace(/^\s+/, "").replace(/\s+$/, ""); };
