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
var jsonRpcService_1 = require("./jsonRpcService");
var Handlers_1 = require("../../Handlers");
var DiagnosticReportModel_1 = require("../../models/DiagnosticReportModel");
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
    DiagnosticReportService.prototype.getDiagnosticReportModelById = function (id, cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD, { id: id }, function (err, payload) {
            if (err)
                return cb(err, null);
            var app = new DiagnosticReportModel_1.DiagnosticReportModel();
            _this.lastValidationErrors_ = payload['validationErrors'];
            app.fromJson(payload['diagnosticReport']);
            return cb(null, app);
        });
    };
    DiagnosticReportService.prototype.getPatientDiagnosticReports = function (patientId, limit, offset, cb) {
        var _this = this;
        var params = { patientId: patientId, limit: limit, offset: offset };
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            var diagnosticReports = payload['diagnosticReports'].map(function (jsonApp) {
                var app = new DiagnosticReportModel_1.DiagnosticReportModel();
                _this.lastValidationErrorsOfList_ = payload['validationErrors'];
                app.fromJson(jsonApp);
                return app;
            });
            cb(null, diagnosticReports);
        });
    };
    return DiagnosticReportService;
}(jsonRpcService_1.JsonRPCCredService));
exports.DiagnosticReportService = DiagnosticReportService;
