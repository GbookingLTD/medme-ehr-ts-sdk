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
define(["require", "exports", "./jsonRpcService", "../../Handlers", "../../models/PatientModel"], function (require, exports, jsonRpcService_1, Handlers_1, PatientModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatientService = void 0;
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
                if (!payload['userSign'])
                    return cb(new Error("userSign not found"));
                var patient = new PatientModel_1.PatientModel();
                _this.lastValidationErrors_ = payload['validationErrors'];
                patient.fromJson(payload['patient']);
                return cb(err, patient, payload['userSign']);
            });
        };
        return PatientService;
    }(jsonRpcService_1.JsonRPCCredService));
    exports.PatientService = PatientService;
});
