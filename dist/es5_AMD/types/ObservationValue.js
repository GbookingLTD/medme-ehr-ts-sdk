define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObservationValue = void 0;
    var ObservationValue = /** @class */ (function () {
        function ObservationValue() {
        }
        ObservationValue.prototype.fromJson = function (json) {
            this.serializedValue = json.serializedValue;
            this.unit = json.unit;
            this.code = json.code;
            this.value = json.value;
            return this;
        };
        ObservationValue.prototype.toJson = function () {
            var payload = {};
            payload.serializedValue = this.serializedValue;
            payload.unit = this.unit;
            payload.code = this.code;
            payload.value = this.value;
            return payload;
        };
        return ObservationValue;
    }());
    exports.ObservationValue = ObservationValue;
});
