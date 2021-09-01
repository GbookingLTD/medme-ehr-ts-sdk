"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = exports.paragrathes_nl = exports.paragrathes = exports.dateISOFormat = exports.LocaleCode = void 0;
var LocaleCode;
(function (LocaleCode) {
    LocaleCode["ruRU"] = "ru-ru";
    LocaleCode["enUS"] = "en-US";
})(LocaleCode = exports.LocaleCode || (exports.LocaleCode = {}));
var dateISOFormat = function (d) {
    return typeof d === "string" ? d : d.toISOString();
};
exports.dateISOFormat = dateISOFormat;
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
var trim = function (str) { return str.replace(/^\s+/, "").replace(/\s+$/, ""); };
exports.trim = trim;
