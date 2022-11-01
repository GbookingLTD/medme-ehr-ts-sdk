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
exports.DiagnosticReportService = void 0;
var jsonRpcService_1 = require("./jsonRpcService");
var Handlers_1 = require("../../Handlers");
var DiagnosticReportService = /** @class */ (function (_super) {
    __extends(DiagnosticReportService, _super);
    function DiagnosticReportService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    DiagnosticReportService.prototype.getDiagnosticReportById = function (id, cb) {
        var _this_1 = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD, { id: id }, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.lastValidationErrors_ = payload["validationErrors"];
            return cb(null, payload["diagnosticReport"]);
        });
    };
    DiagnosticReportService.prototype.getDiagnosticReportByIdAsync = function (id) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getDiagnosticReportById(id, function (err, dr) {
                if (err)
                    return rej(err);
                // console.log("prescription.id:", appointment.id);
                res(dr);
            });
        });
    };
    DiagnosticReportService.prototype.getPatientDiagnosticReports = function (patientId, limit, offset, cb) {
        var _this_1 = this;
        var params = { patientId: patientId, limit: limit, offset: offset };
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["diagnosticReports"]);
        });
    };
    DiagnosticReportService.prototype.getPatientDiagnosticReportsAsync = function (patientId, limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatientDiagnosticReports(patientId, limit, offset, function (err, reports) {
                if (err)
                    return rej(err);
                res(reports);
            });
        });
    };
    DiagnosticReportService.prototype.getDiagnosticReports = function (limit, offset, lastId, prevCreated, cb) {
        var _this_1 = this;
        var params = prevCreated
            ? { limit: limit, lastItemCreated: prevCreated }
            : (lastId
                ? { limit: limit, lastItemId: lastId }
                : { limit: limit, offset: offset });
        this.exec(Handlers_1.Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["diagnosticReports"]);
        });
    };
    DiagnosticReportService.prototype.getDiagnosticReportsAsync = function (limit, offset, lastId, prevCreated) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getDiagnosticReports(limit, offset, lastId, prevCreated, function (err, reports) {
                if (err)
                    return rej(err);
                res(reports);
            });
        });
    };
    DiagnosticReportService.prototype.getFilteredDiagnosticReports = function (filters, limit, offset, cb) {
        var _this_1 = this;
        var params = { filters: filters.plain(), limit: limit, offset: offset };
        this.exec(Handlers_1.Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["diagnosticReports"]);
        });
    };
    DiagnosticReportService.prototype.getFilteredDiagnosticReportsAsync = function (filters, limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getFilteredDiagnosticReports(filters, limit, offset, function (err, reports) {
                if (err)
                    return rej(err);
                res(reports);
            });
        });
    };
    DiagnosticReportService.prototype.getDiagnosticReportsCount = function (cb) {
        var _this_1 = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_COUNT_METHOD, {}, function (err, payload) {
            if (err)
                return cb(err, null, false);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["count"], payload["support"]);
        });
    };
    DiagnosticReportService.prototype.getDiagnosticReportsCountAsync = function () {
        var service = this;
        return new Promise(function (res, rej) {
            service.getDiagnosticReportsCount(function (err, count, support) {
                if (err)
                    return rej(err);
                res({ count: count, support: support });
            });
        });
    };
    DiagnosticReportService.prototype.getPatientDiagnosticReportsCount = function (patientId, cb) {
        var _this_1 = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
            if (err)
                return cb(err, null, false);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["count"], payload["support"]);
        });
    };
    DiagnosticReportService.prototype.getPatientDiagnosticReportsCountAsync = function (patientId) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatientDiagnosticReportsCount(patientId, function (err, count, support) {
                if (err)
                    return rej(err);
                res({ count: count, support: support });
            });
        });
    };
    DiagnosticReportService.prototype.searchDiagnosticReports = function (includes, excludes, filters, limit, offset, cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_SEARCH_DIAGNOSTIC_REPORTS_METHOD, { includes: includes, excludes: excludes, filters: filters.plain(), limit: limit, offset: offset }, function (err, payload) {
            if (err)
                return cb(err, []);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["diagnosticReports"]);
        });
    };
    DiagnosticReportService.prototype.searchDiagnosticReportsAsync = function (includes, excludes, filters, limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.searchDiagnosticReports(includes, excludes, filters, limit, offset, function (err, reports) {
                if (err)
                    return rej(err);
                res(reports);
            });
        });
    };
    DiagnosticReportService.prototype.searchDiagnosticReportsCount = function (includes, excludes, filters, cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_SEARCH_DIAGNOSTIC_REPORTS_COUNT_METHOD, { includes: includes, excludes: excludes, filters: filters.plain() }, function (err, payload) {
            if (err)
                return cb(err, 0, false);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["count"], payload["support"]);
        });
    };
    DiagnosticReportService.prototype.searchDiagnosticReportsCountAsync = function (includes, excludes, filters) {
        var service = this;
        return new Promise(function (res, rej) {
            service.searchDiagnosticReportsCount(includes, excludes, filters, function (err, count, support) {
                if (err)
                    return rej(err);
                res({ count: count, support: support });
            });
        });
    };
    return DiagnosticReportService;
}(jsonRpcService_1.JsonRPCCredService));
exports.DiagnosticReportService = DiagnosticReportService;
