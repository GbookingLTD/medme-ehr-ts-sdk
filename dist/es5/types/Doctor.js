import { Specialization } from "./Specialization";
var Doctor = /** @class */ (function () {
    function Doctor() {
    }
    Doctor.prototype.fromJson = function (json) {
        this.id = json.id;
        this.surname = json.surname;
        this.name = json.name;
        this.specialization = json.specialization ? (new Specialization()).fromJson(json.specialization) : new Specialization();
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
export { Doctor };
