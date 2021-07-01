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
import { PatientModel } from "../../models/PatientModel";
var PatientService = /** @class */ (function (_super) {
    __extends(PatientService, _super);
    function PatientService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PatientService.prototype.getPatient = function (cb) {
        var _this = this;
        this.exec(Handlers.HANDLER_GET_PATIENT_METHOD, {}, function (err, payload) {
            if (err)
                return cb(err);
            if (!payload['userSign'])
                return cb(new Error("userSign not found"));
            var patient = new PatientModel();
            _this.lastValidationErrors_ = payload['validationErrors'];
            patient.fromJson(payload['patient']);
            return cb(err, patient, payload['userSign']);
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
    return PatientService;
}(JsonRPCCredService));
export { PatientService };
