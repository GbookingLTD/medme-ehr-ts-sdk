import { Service } from "./Service";
import { Period } from "./Period";
var Procedure = /** @class */ (function () {
    function Procedure() {
        this.services = [];
        this.period = new Period();
        this.strictPeriod = new Period();
        this.preparations = [];
        this.requiredPreparations = [];
    }
    Procedure.prototype.fromJson = function (json) {
        this.id = json.id;
        this.created = json.created;
        this.title = json.title;
        this.services = json.services
            ? json.services.map(function (s) { return new Service().fromJson(s); })
            : [];
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
        var payload = {};
        payload.id = this.id;
        payload.created = this.created.toJSON();
        payload.title = this.title;
        payload.services = this.services
            ? this.services.map(function (s) { return s.toJson(); })
            : [];
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
export { Procedure };
