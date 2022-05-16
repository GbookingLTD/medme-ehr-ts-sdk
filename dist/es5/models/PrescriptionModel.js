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
import { PrescriptionInfo } from "../types/index";
import { PatientInfo } from "../types/PatientInfo";
/**
 * Класс модели медикаментозного назначения.
 */
var PrescriptionModel = /** @class */ (function (_super) {
    __extends(PrescriptionModel, _super);
    function PrescriptionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrescriptionModel.prototype.fromJson = function (json) {
        _super.prototype.fromJson.call(this, json);
        this.patientId = json.patientInfo.id;
        this.patientInfo = new PatientInfo();
        this.patientInfo.fromJson(json.patientInfo);
        return this;
    };
    PrescriptionModel.prototype.toJson = function () {
        return this;
    };
    return PrescriptionModel;
}(PrescriptionInfo));
export { PrescriptionModel };
//# sourceMappingURL=PrescriptionModel.js.map