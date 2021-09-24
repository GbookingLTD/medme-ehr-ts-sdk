"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientInfo = void 0;
var PatientInfo = /** @class */ (function () {
    function PatientInfo() {
    }
    PatientInfo.prototype.fromJson = function (json) {
        this.id = json.id;
        this.surname = json.surname;
        this.name = json.name;
        this.middleName = json.middleName;
        this.phones = json.phones;
        this.email = json.email;
        this.gender = json.gender;
        this.date = json.date;
        this.medcardNumber = json.medcardNumber;
        return this;
    };
    PatientInfo.prototype.toJson = function () {
        var payload = {};
        payload.id = this.id;
        payload.surname = this.surname;
        payload.name = this.name;
        payload.middleName = this.middleName;
        payload.phones = this.phones;
        payload.email = this.email;
        payload.gender = this.gender;
        payload.date = this.date.toJSON();
        payload.medcardNumber = this.medcardNumber;
        return payload;
    };
    return PatientInfo;
}());
exports.PatientInfo = PatientInfo;
