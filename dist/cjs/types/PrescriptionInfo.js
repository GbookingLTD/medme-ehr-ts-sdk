"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionInfo = void 0;
var Doctor_1 = require("./Doctor");
var Medication_1 = require("./Medication");
var Period_1 = require("./Period");
var PrescriptionInfo = /** @class */ (function () {
    function PrescriptionInfo() {
    }
    PrescriptionInfo.prototype.fromJson = function (json) {
        this.id = json.id;
        this.created = new Date(json.created);
        if (json.recorderDoctor)
            this.recorderDoctor = new Doctor_1.Doctor().fromJson(json.recorderDoctor);
        this.medications = json.medications
            ? json.medications.map(function (m) { return new Medication_1.Medication().fromJson(m); })
            : [];
        this.dosageText = json.dosageText;
        this.reasonText = json.reasonText;
        this.validityPeriod = json.validityPeriod
            ? new Period_1.Period().fromJson(json.validityPeriod)
            : new Period_1.Period();
        this.numberOfRepeats = json.numberOfRepeats;
        this.title = json.title;
        return this;
    };
    PrescriptionInfo.prototype.toJson = function () {
        var payload = {};
        payload.id = this.id;
        payload.created = this.created.toJSON();
        payload.recorderDoctor = this.recorderDoctor.toJson();
        payload.medications = this.medications
            ? this.medications.map(function (m) { return m.toJson(); })
            : [];
        payload.dosageText = this.dosageText;
        payload.reasonText = this.reasonText;
        payload.validityPeriod = this.validityPeriod.toJson();
        payload.numberOfRepeats = this.numberOfRepeats;
        payload.title = this.title;
        return payload;
    };
    return PrescriptionInfo;
}());
exports.PrescriptionInfo = PrescriptionInfo;
