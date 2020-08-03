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
var AppointmentModel_1 = require("../../models/AppointmentModel");
var jsonRpcService_1 = require("./jsonRpcService");
var Handlers_1 = require("../../Handlers");
var AppointmentService = /** @class */ (function (_super) {
    __extends(AppointmentService, _super);
    function AppointmentService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppointmentService.prototype.getAppointmentModelById = function (id, cb) {
        this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD, { id: id }, function (err, payload) {
            if (err)
                return cb(err, null);
            var app = new AppointmentModel_1.AppointmentModel();
            app.fromJson(payload['appointment']);
            return cb(null, app);
        });
    };
    AppointmentService.prototype.saveAppointment = function (appointmentProperties, cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_SAVE_APPOINTMENT_METHOD, { appointmentProperties: appointmentProperties }, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrors_ = payload['validationErrors'];
            return cb(null, payload["id"]);
        });
    };
    AppointmentService.prototype.getPatientAppointments = function (patientId, limit, offset, cb) {
        var _this = this;
        var params = { patientId: patientId, limit: limit, offset: offset };
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload['validationErrors'];
            var appointments = payload['appointments'].map(function (jsonApp) {
                var app = new AppointmentModel_1.AppointmentModel();
                app.fromJson(jsonApp);
                return app;
            });
            return cb(null, appointments);
        });
    };
    return AppointmentService;
}(jsonRpcService_1.JsonRPCCredService));
exports.AppointmentService = AppointmentService;
