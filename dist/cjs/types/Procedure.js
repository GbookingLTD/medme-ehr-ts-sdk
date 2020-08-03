"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = require("./Service");
var Period_1 = require("./Period");
var Procedure = /** @class */ (function () {
    function Procedure() {
        this.services = [];
        this.period = new Period_1.Period();
        this.strictPeriod = new Period_1.Period();
        this.preparations = [];
        this.requiredPreparations = [];
    }
    Procedure.prototype.fromJson = function (json) {
        this.id = json.id;
        this.created = json.created;
        this.title = json.title;
        this.services = json.services ? json.services.map(function (s) { return (new Service_1.Service).fromJson(s); }) : [];
        this.type = json.type;
        this.required = json.required;
        this.status = json.status;
        if (json.period)
            this.period.fromJson(json.period);
        if (json.strictPeriod)
            this.strictPeriod.fromJson(json.strictPeriod);
        this.preparations = json.preparations;
        this.requiredPreparations = json.requiredPreparations;
        this.appointmentResultId = this.appointmentResultId;
        return this;
    };
    Procedure.prototype.toJson = function () {
        var payload;
        payload.id = this.id;
        payload.created = this.created;
        payload.title = this.title;
        payload.services = this.services ? this.services.map(function (s) { return s.toJson(); }) : [];
        payload.type = this.type;
        payload.required = this.required;
        payload.status = this.status;
        payload.period = this.period.toJson();
        payload.strictPeriod = this.strictPeriod.toJson();
        payload.preparations = this.preparations;
        payload.requiredPreparations = this.requiredPreparations;
        payload.appointmentResultId = this.appointmentResultId;
        return payload;
    };
    return Procedure;
}());
exports.Procedure = Procedure;
