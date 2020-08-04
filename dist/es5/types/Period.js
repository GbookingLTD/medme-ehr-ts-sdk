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
        payload.begin = this.begin;
        payload.end = this.end;
        return payload;
    };
    return Period;
}());
export { Period };
