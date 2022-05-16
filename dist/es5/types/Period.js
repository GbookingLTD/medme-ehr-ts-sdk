var TextPeriod = /** @class */ (function () {
    function TextPeriod() {
    }
    return TextPeriod;
}());
export { TextPeriod };
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
export { Period };
//# sourceMappingURL=Period.js.map