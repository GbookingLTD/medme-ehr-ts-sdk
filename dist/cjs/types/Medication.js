"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Medication = /** @class */ (function () {
    function Medication() {
    }
    Medication.prototype.fromJson = function (json) {
        this.form = json.from;
        this.amount = json.amount;
        this.expirationDate = json.expirationDate;
    };
    Medication.prototype.toJson = function () {
        var payload;
        payload.form = this.form;
        payload.amount = this.amount;
        payload.expirationDate = this.expirationDate;
        return payload;
    };
    return Medication;
}());
exports.Medication = Medication;
