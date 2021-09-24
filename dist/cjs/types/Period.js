"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Period = exports.TextPeriod = void 0;
var TextPeriod = /** @class */ (function () {
    function TextPeriod() {
    }
    return TextPeriod;
}());
exports.TextPeriod = TextPeriod;
var Period = /** @class */ (function () {
    function Period() {
    }
    Period.prototype.fromJson = function (json) {
        this.begin = new Date(json.begin);
        this.end = new Date(json.end);
        return this;
    };
    Period.prototype.toJson = function () {
        var payload = {};
        payload.begin = this.begin.toJSON();
        payload.end = this.end.toJSON();
        return payload;
    };
    return Period;
}());
exports.Period = Period;
