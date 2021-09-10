"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentResultModel = void 0;
var index_1 = require("../types/index");
var AppointmentModel_1 = require("./AppointmentModel");
/**
 * Класс модели записи.
 * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
 */
var AppointmentResultModel = /** @class */ (function () {
    function AppointmentResultModel() {
    }
    Object.defineProperty(AppointmentResultModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "patientId", {
        get: function () {
            return this._patientId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "business", {
        get: function () {
            return this._business;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "created", {
        get: function () {
            return this._created;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "start", {
        get: function () {
            return this._start;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "doctor", {
        get: function () {
            return this._doctor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "anamnesis", {
        get: function () {
            return this._anamnesis;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "medicalExaminationResult", {
        get: function () {
            return this._medicalExaminationResult;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "diagnosis", {
        get: function () {
            return this._diagnosis;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "recommendations", {
        get: function () {
            return this._recommendations;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "scheduledProcedures", {
        get: function () {
            return this._scheduledProcedures;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "prescriptions", {
        get: function () {
            return this._prescriptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentResultModel.prototype, "diagnosticReportIds", {
        get: function () {
            return this._diagnosticReportIds;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param json
     */
    AppointmentResultModel.prototype.fromJson = function (json) {
        AppointmentModel_1.copyCommonPropertiesFromJson.call(this, json);
        this._duration = json.duration;
        this._anamnesis = json.anamnesis;
        this._medicalExaminationResult = json.medicalExaminationResult;
        this._diagnosis = json.diagnosis
            ? json.diagnosis.map(function (d) { return new index_1.Diagnosis(d); })
            : [];
        this._recommendations = json.recommendations
            ? json.recommendations.map(function (r) { return new index_1.Procedure().fromJson(r); })
            : [];
        this._scheduledProcedures = json.scheduledProcedures
            ? json.scheduledProcedures.map(function (p) { return new index_1.Procedure().fromJson(p); })
            : [];
        this._prescriptions = json.prescriptions
            ? json.prescriptions.map(function (p) { return new index_1.PrescriptionInfo().fromJson(p); })
            : [];
        this._diagnosticReportIds = json.diagnosticReportIds || [];
        return this;
    };
    /**
     *
     */
    AppointmentResultModel.prototype.toJson = function () {
        var payload = {
            id: this._id,
            patientId: this._patientId,
        };
        payload.business = this._business.toJson();
        payload.created = this._created.toJSON();
        payload.start = this._start.toJSON();
        payload.doctor = this._doctor.toJson();
        payload.duration = this._duration;
        payload.anamnesis = this._anamnesis;
        payload.medicalExaminationResult = this._medicalExaminationResult;
        payload.diagnosis = Array.isArray(this._diagnosis)
            ? this._diagnosis.map(function (d) { return d.toJson(); })
            : [];
        payload.recommendations = Array.isArray(this._recommendations)
            ? this._recommendations.map(function (r) { return r.toJson(); })
            : [];
        payload.scheduledProcedures = Array.isArray(this._scheduledProcedures)
            ? this._scheduledProcedures.map(function (r) { return r.toJson(); })
            : [];
        payload.prescriptions = Array.isArray(this._prescriptions)
            ? this._prescriptions.map(function (p) { return p.toJson(); })
            : [];
        payload.diagnosticReportIds = this._diagnosticReportIds;
        return payload;
    };
    return AppointmentResultModel;
}());
exports.AppointmentResultModel = AppointmentResultModel;
