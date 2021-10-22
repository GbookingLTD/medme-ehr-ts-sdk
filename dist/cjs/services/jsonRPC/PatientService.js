"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
var jsonRpcService_1 = require("./jsonRpcService");
var Handlers_1 = require("../../Handlers");
var PatientModel_1 = require("../../models/PatientModel");
var PatientService = /** @class */ (function (_super) {
    __extends(PatientService, _super);
    function PatientService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PatientService.prototype.getPatient = function (cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_METHOD, {}, function (err, payload) {
            if (err)
                return cb(err);
            if (!payload["userSign"])
                return cb(new Error("userSign not found"));
            var patient = new PatientModel_1.PatientModel();
            _this.lastValidationErrors_ = payload["validationErrors"];
            patient.fromJson(payload["patient"]);
            return cb(err, patient, payload["userSign"]);
        });
    };
    PatientService.prototype.getPatientAsync = function () {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatient(function (err, patient, userSign) {
                if (err)
                    return rej(err);
                res({ patient: patient, userSign: userSign });
            });
        });
    };
    PatientService.prototype.getPatientById = function (id, cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_BY_ID_METHOD, { id: id }, function (err, payload) {
            if (err)
                return cb(err);
            _this.lastValidationErrors_ = payload["validationErrors"];
            return cb(err, payload["patient"]);
        });
    };
    PatientService.prototype.getPatientByIdAsync = function (id) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatientById(id, function (err, patient) {
                if (err)
                    return rej(err);
                res({ patient: patient });
            });
        });
    };
    PatientService.prototype.getPatients = function (limit, offset, cb) {
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENTS_METHOD, { limit: limit, offset: offset }, function (err, payload) {
            if (err)
                return cb(err, null);
            return cb(err, payload["patients"]);
        });
    };
    PatientService.prototype.getPatientsAsync = function (limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatients(limit, offset, function (err, patients) {
                if (err)
                    return rej(err);
                res(patients);
            });
        });
    };
    PatientService.prototype.getFilteredPatients = function (filters, limit, offset, cb) {
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENTS_METHOD, { filters: filters.plain(), limit: limit, offset: offset }, function (err, payload) {
            if (err)
                return cb(err, null);
            return cb(err, payload["patients"]);
        });
    };
    PatientService.prototype.getFilteredPatientsAsync = function (filters, limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getFilteredPatients(filters, limit, offset, function (err, patients) {
                if (err)
                    return rej(err);
                res(patients);
            });
        });
    };
    PatientService.prototype.getPatientsCount = function (cb) {
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENTS_COUNT_METHOD, {}, function (err, payload) {
            if (err)
                return cb(err, null, false);
            return cb(err, payload["count"], payload["support"]);
        });
    };
    PatientService.prototype.getPatientsCountAsync = function () {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatientsCount(function (err, count, support) {
                if (err)
                    return rej(err);
                res({ count: count, support: support });
            });
        });
    };
    return PatientService;
}(jsonRpcService_1.JsonRPCCredService));
exports.PatientService = PatientService;
