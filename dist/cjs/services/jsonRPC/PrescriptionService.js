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
exports.PrescriptionService = void 0;
var jsonRpcService_1 = require("./jsonRpcService");
var Handlers_1 = require("../../Handlers");
var PrescriptionModel_1 = require("../../models/PrescriptionModel");
var PrescriptionService = /** @class */ (function (_super) {
    __extends(PrescriptionService, _super);
    function PrescriptionService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    PrescriptionService.prototype.getPrescriptionById = function (id, cb) {
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD, { id: id }, function (err, payload) {
            if (err)
                return cb(err, null);
            var app = new PrescriptionModel_1.PrescriptionModel();
            _this.lastValidationErrors_ = payload['validationErrors'];
            app.fromJson(payload['prescription']);
            cb(null, app);
        });
    };
    PrescriptionService.prototype.getPrescriptionByIdAsync = function (id) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPrescriptionById(id, function (err, pm) {
                if (err)
                    return rej(err);
                res(pm);
            });
        });
    };
    PrescriptionService.prototype.getPatientPrescriptions = function (patientId, limit, offset, cb) {
        var _this = this;
        var params = { patientId: patientId, limit: limit, offset: offset };
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            var prescriptions = payload['prescriptions'].map(function (jsonApp) {
                var app = new PrescriptionModel_1.PrescriptionModel();
                _this.lastValidationErrorsOfList_ = payload['validationErrors'];
                app.fromJson(jsonApp);
                return app;
            });
            return cb(null, prescriptions);
        });
    };
    PrescriptionService.prototype.getPatientPrescriptionsAsync = function (patientId, limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatientPrescriptions(patientId, limit, offset, function (err, values) {
                if (err)
                    return rej(err);
                res(values);
            });
        });
    };
    return PrescriptionService;
}(jsonRpcService_1.JsonRPCCredService));
exports.PrescriptionService = PrescriptionService;
