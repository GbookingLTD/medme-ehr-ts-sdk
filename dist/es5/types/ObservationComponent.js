import { ObservationRange } from "./ObservationRange";
var ObservationComponent = /** @class */ (function () {
    function ObservationComponent() {
    }
    ObservationComponent.prototype.fromJson = function (json) {
        this.type = json.type;
        this.value = json.value;
        this.interpretation = json.interpretation;
        this.ranges = json.ranges ? new ObservationRange[json.ranges.length]() : [];
        if (json.ranges)
            for (var i = 0; i < json.ranges.length; ++i)
                this.ranges[i] = new ObservationRange().fromJson(json.ranges[i]);
        return this;
    };
    ObservationComponent.prototype.toJson = function () {
        var payload = {};
        payload.type = this.type;
        payload.value = this.value.toJson();
        payload.interpretation = this.interpretation;
        payload.ranges = this.ranges ? this.ranges.map(function (r) { return r.toJson(); }) : null;
        return payload;
    };
    return ObservationComponent;
}());
export { ObservationComponent };
//# sourceMappingURL=ObservationComponent.js.map