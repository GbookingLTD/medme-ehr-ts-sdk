"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentResultService = void 0;
var AppointmentResultModel_1 = require("../../models/AppointmentResultModel");
var jsonRpcService_1 = require("./jsonRpcService");
var Handlers_1 = require("../../Handlers");
var AppointmentResultService = /** @class */ (function (_super) {
    __extends(AppointmentResultService, _super);
    function AppointmentResultService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    AppointmentResultService.prototype.getAppointmentResultById = function (id, cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD, { id: id }, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrors_ = payload["validationErrors"];
            return cb(null, payload["appointmentResult"]);
        });
    };
    AppointmentResultService.prototype.getAppointmentResultByIdAsync = function (id) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getAppointmentResultById(id, function (err, appointment) {
                if (err)
                    return rej(err);
                // console.log("appointment_result.id:", appointment.id);
                res(appointment);
            });
        });
    };
    AppointmentResultService.prototype.getPatientAppointmentResults = function (patientId, limit, offset, cb) {
        var _this = this;
        var params = { patientId: patientId, limit: limit, offset: offset };
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            var appointmentResults = payload["appointmentResults"].map(function (jsonApp) {
                var app = new AppointmentResultModel_1.AppointmentResultModel();
                app.fromJson(jsonApp);
                return app;
            });
            return cb(null, appointmentResults);
        });
    };
    AppointmentResultService.prototype.getPatientAppointmentResultsAsync = function (patientId, limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatientAppointmentResults(patientId, limit, offset, function (err, appResults) {
                if (err)
                    return rej(err);
                res(appResults);
            });
        });
    };
    AppointmentResultService.prototype.getAppointmentResults = function (limit, offset, cb) {
        var _this = this;
        var params = { limit: limit, offset: offset };
        this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENT_RESULTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            return cb(null, payload["appointmentResults"]);
        });
    };
    AppointmentResultService.prototype.getAppointmentResultsAsync = function (limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getAppointmentResults(limit, offset, function (err, appResults) {
                if (err)
                    return rej(err);
                res(appResults);
            });
        });
    };
    AppointmentResultService.prototype.getAppointmentResultsCount = function (cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENT_RESULTS_COUNT_METHOD, {}, function (err, payload) {
            if (err)
                return cb(err, null, false);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["count"], payload["support"]);
        });
    };
    AppointmentResultService.prototype.getAppointmentResultsCountAsync = function () {
        var service = this;
        return new Promise(function (res, rej) {
            service.getAppointmentResultsCount(function (err, count, support) {
                if (err)
                    return rej(err);
                res({ count: count, support: support });
            });
        });
    };
    AppointmentResultService.prototype.getPatientAppointmentResultsCount = function (patientId, cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
            if (err)
                return cb(err, null, false);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["count"], payload["support"]);
        });
    };
    AppointmentResultService.prototype.getPatientAppointmentResultsCountAsync = function (patientId) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatientAppointmentResultsCount(patientId, function (err, count, support) {
                if (err)
                    return rej(err);
                res({ count: count, support: support });
            });
        });
    };
    return AppointmentResultService;
}(jsonRpcService_1.JsonRPCCredService));
exports.AppointmentResultService = AppointmentResultService;
