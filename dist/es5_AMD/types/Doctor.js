define(["require", "exports", "./Specialization"], function (require, exports, Specialization_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Doctor = void 0;
    var Doctor = /** @class */ (function () {
        function Doctor() {
        }
        Doctor.prototype.fromJson = function (json) {
            this.id = json.id;
            this.surname = json.surname;
            this.name = json.name;
            this.specialization = json.specialization ? (new Specialization_1.Specialization()).fromJson(json.specialization) : new Specialization_1.Specialization();
            return this;
        };
        Doctor.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.surname = this.surname;
            payload.name = this.name;
            payload.specialization = this.specialization ? this.specialization.toJson() : null;
            return payload;
        };
        return Doctor;
    }());
    exports.Doctor = Doctor;
});
