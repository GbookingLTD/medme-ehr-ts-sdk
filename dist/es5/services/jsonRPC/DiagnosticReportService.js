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
import { DiagnosticReportModel } from "../../models/DiagnosticReportModel";
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
            var app = new DiagnosticReportModel();
            _this.lastValidationErrors_ = payload['validationErrors'];
            app.fromJson(payload['diagnosticReport']);
            return cb(null, app);
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
            var diagnosticReports = payload['diagnosticReports'].map(function (jsonApp) {
                var app = new DiagnosticReportModel();
                _this.lastValidationErrorsOfList_ = payload['validationErrors'];
                app.fromJson(jsonApp);
                return app;
            });
            cb(null, diagnosticReports);
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
    return DiagnosticReportService;
}(JsonRPCCredService));
export { DiagnosticReportService };
