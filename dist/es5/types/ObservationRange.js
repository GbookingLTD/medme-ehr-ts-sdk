import { Period } from './Period';
var ObservationRange = /** @class */ (function () {
    function ObservationRange() {
        this.age = new Period();
    }
    ObservationRange.prototype.fromJson = function (json) {
        this.low = json.low;
        this.high = json.high;
        this.unit = json.unit;
        this.type = json.type;
        if (json.age)
            this.age.fromJson(json.age);
        this.text = json.text;
        return this;
    };
    ObservationRange.prototype.toJson = function () {
        var payload = {};
        payload.low = this.low;
        payload.high = this.high;
        payload.unit = this.unit;
        payload.type = this.type;
        payload.age = this.age ? this.age.toJson() : null;
        payload.text = this.text;
        return payload;
    };
    return ObservationRange;
}());
export { ObservationRange };
