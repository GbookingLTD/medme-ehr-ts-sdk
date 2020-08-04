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
    AppointmentResultService.prototype.getAppointmentResultModelById = function (id, cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD, { id: id }, function (err, payload) {
            if (err)
                return cb(err, null);
            var app = new AppointmentResultModel_1.AppointmentResultModel();
            _this.lastValidationErrors_ = payload['validationErrors'];
            app.fromJson(payload['appointmentResult']);
            return cb(null, app);
        });
    };
    AppointmentResultService.prototype.getPatientAppointmentResults = function (patientId, limit, offset, cb) {
        var _this = this;
        var params = { patientId: patientId, limit: limit, offset: offset };
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload['validationErrors'];
            var appointmentResults = payload['appointmentResults'].map(function (jsonApp) {
                var app = new AppointmentResultModel_1.AppointmentResultModel();
                app.fromJson(jsonApp);
                return app;
            });
            return cb(null, appointmentResults);
        });
    };
    return AppointmentResultService;
}(jsonRpcService_1.JsonRPCCredService));
exports.AppointmentResultService = AppointmentResultService;
