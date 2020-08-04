import { Diagnosis, Procedure, PrescriptionInfo } from "../types/index";
import { copyCommonPropertiesFromJson } from './AppointmentModel';
/**
 * Класс модели записи.
 * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
 */
var AppointmentResultModel = /** @class */ (function () {
    function AppointmentResultModel() {
    }
    Object.defineProperty(AppointmentResultModel.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "patientId", {
        get: function () { return this._patientId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "business", {
        get: function () { return this._business; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "created", {
        get: function () { return this._created; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "start", {
        get: function () { return this._start; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "doctor", {
        get: function () { return this._doctor; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "duration", {
        get: function () { return this._duration; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "anamnesis", {
        get: function () { return this._anamnesis; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "medicalExaminationResult", {
        get: function () { return this._medicalExaminationResult; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "diagnosis", {
        get: function () { return this._diagnosis; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "recommendations", {
        get: function () { return this._recommendations; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "scheduledProcedures", {
        get: function () { return this._scheduledProcedures; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "prescriptions", {
        get: function () { return this._prescriptions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "diagnosticReportIds", {
        get: function () { return this._diagnosticReportIds; },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param json
     */
    AppointmentResultModel.prototype.fromJson = function (json) {
        copyCommonPropertiesFromJson.call(this, json);
        this._duration = json.duration;
        this._anamnesis = json.anamnesis;
        this._medicalExaminationResult = json.medicalExaminationResult;
        this._diagnosis = json.diagnosis ? json.diagnosis.map(function (d) { return new Diagnosis(d); }) : [];
        this._recommendations = json.recommendations ? json.recommendations.map(function (r) { return (new Procedure).fromJson(r); }) : [];
        this._scheduledProcedures = json.scheduledProcedures ? json.scheduledProcedures.map(function (p) { return (new Procedure).fromJson(p); }) : [];
        this._prescriptions = json.prescriptions ? json.prescriptions.map(function (p) { return (new PrescriptionInfo).fromJson(p); }) : [];
        this._diagnosticReportIds = json.diagnosticReportIds || [];
        return this;
    };
    /**
     *
     */
    AppointmentResultModel.prototype.toJson = function () {
        var payload = {
            id: this._id,
            patientId: this._patientId
        };
        payload.business = this._business;
        payload.created = this._created;
        payload.start = this._start;
        payload.doctor = this._doctor;
        payload.duration = this._duration;
        payload.anamnesis = this._anamnesis;
        payload.medicalExaminationResult = this._medicalExaminationResult;
        payload.diagnosis = this._diagnosis ? this._diagnosis.map(function (d) { return d.toJson(); }) : [];
        payload.recommendations = this._recommendations ? this._recommendations.map(function (r) { return r.toJson(); }) : [];
        payload.scheduledProcedures = this._scheduledProcedures ? this._scheduledProcedures.map(function (r) { return r.toJson(); }) : [];
        payload.prescriptions = this._prescriptions ? this._prescriptions.map(function (p) { return p.toJson(); }) : [];
        payload.diagnosticReportIds = this._diagnosticReportIds;
        return payload;
    };
    return AppointmentResultModel;
}());
export { AppointmentResultModel };
