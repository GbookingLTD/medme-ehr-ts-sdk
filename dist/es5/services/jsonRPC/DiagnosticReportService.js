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
import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
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
        var _this = this;
        this.exec(Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD, { id: id }, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrors_ = payload["validationErrors"];
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
        var _this = this;
        var params = { patientId: patientId, limit: limit, offset: offset };
        this.exec(Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
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
    DiagnosticReportService.prototype.getDiagnosticReports = function (limit, offset, cb) {
        var _this = this;
        var params = { limit: limit, offset: offset };
        this.exec(Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["diagnosticReports"]);
        });
    };
    DiagnosticReportService.prototype.getDiagnosticReportsAsync = function (limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getDiagnosticReports(limit, offset, function (err, reports) {
                if (err)
                    return rej(err);
                res(reports);
            });
        });
    };
    DiagnosticReportService.prototype.getDiagnosticReportsCount = function (cb) {
        var _this = this;
        this.exec(Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_COUNT_METHOD, {}, function (err, payload) {
            if (err)
                return cb(err, null, false);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
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
        var _this = this;
        this.exec(Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
            if (err)
                return cb(err, null, false);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
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
    return DiagnosticReportService;
}(JsonRPCCredService));
export { DiagnosticReportService };
