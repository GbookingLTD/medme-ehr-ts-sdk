"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medication = void 0;
var Medication = /** @class */ (function () {
    function Medication() {
    }
    Medication.prototype.fromJson = function (json) {
        this.name = json.name;
        this.code = json.code;
        this.codeTable = json.codeTable;
        this.reference = json.reference;
        this.itemSize = json.itemSize;
        this.dosageText = json.dosageText;
        this.form = json.from;
        this.amount = json.amount;
        this.expirationDate = json.expirationDate;
    };
    Medication.prototype.toJson = function () {
        var payload = {};
        payload.name = this.name;
        payload.code = this.code;
        payload.codeTable = this.codeTable;
        payload.reference = this.reference;
        payload.itemSize = this.itemSize;
        payload.dosageText = this.dosageText;
        payload.form = this.form;
        payload.amount = this.amount;
        payload.expirationDate = this.expirationDate.toJSON();
        return payload;
    };
    return Medication;
}());
exports.Medication = Medication;
