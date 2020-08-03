define(["require", "exports", "./BusinessInfo", "./Doctor", "./PatientInfo", "./Period", "./ObservationValue", "./ObservationRange", "./ObservationComponent"], function (require, exports, BusinessInfo_1, Doctor_1, PatientInfo_1, Period_1, ObservationValue_1, ObservationRange_1, ObservationComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Observation = void 0;
    var Observation = /** @class */ (function () {
        function Observation() {
            this.patientInfo = new PatientInfo_1.PatientInfo();
            this.effectivePeriod = new Period_1.Period();
            this.performerDoctor = new Doctor_1.Doctor();
            this.performerBusiness = new BusinessInfo_1.BusinessInfo();
            this.value = new ObservationValue_1.ObservationValue();
            this.interpretation = [];
            this.ranges = [];
            this.components = [];
        }
        Observation.prototype.fromJson = function (json) {
            this.id = json.id;
            this.createdDate = new Date(json.createdDate);
            if (json.patientInfo)
                this.patientInfo.fromJson(json.patientInfo);
            this.type = json.type;
            this.observationKey = json.observationKey;
            this.status = json.status;
            if (json.effectivePeriod)
                this.effectivePeriod.fromJson(json.effectivePeriod);
            this.issuedDate = new Date(json.issuedDate);
            if (json.performerDoctor)
                this.performerDoctor.fromJson(json.performerDoctor);
            if (json.performerBusiness)
                this.performerBusiness.fromJson(json.performerBusiness);
            if (json.value)
                this.value.fromJson(json.value);
            this.note = json.note;
            this.interpretation = [];
            if (json.interpretation)
                for (var i = 0; i < json.interpretation.length; ++i)
                    this.interpretation.push(json.interpretation[i]);
            this.ranges = [];
            if (json.ranges)
                for (var i = 0; i < json.ranges.length; ++i)
                    this.ranges.push((new ObservationRange_1.ObservationRange).fromJson(json.ranges[i]));
            this.components = [];
            if (json.components)
                for (var i = 0; i < json.components.length; ++i)
                    this.components.push((new ObservationComponent_1.ObservationComponent).fromJson(json.components[i]));
            return this;
        };
        Observation.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.createdDate = this.createdDate;
            payload.patientInfo = this.patientInfo ? this.patientInfo.toJson() : null;
            payload.type = this.type;
            payload.observationKey = this.observationKey;
            payload.status = this.status;
            payload.effectivePeriod = this.effectivePeriod ? this.effectivePeriod.toJson() : null;
            payload.issuedDate = this.issuedDate;
            payload.performerDoctor = this.performerDoctor ? this.performerDoctor.toJson() : null;
            payload.performerBusiness = this.performerBusiness ? this.performerBusiness.toJson() : null;
            payload.value = this.value ? this.value.toJson() : null;
            payload.note = this.note;
            payload.interpretation = this.interpretation;
            payload.ranges = this.ranges ? this.ranges.map(function (r) { return r.toJson(); }) : null;
            payload.components = this.components ? this.components.map(function (c) { return c.toJson(); }) : null;
            return payload;
        };
        return Observation;
    }());
    exports.Observation = Observation;
});
