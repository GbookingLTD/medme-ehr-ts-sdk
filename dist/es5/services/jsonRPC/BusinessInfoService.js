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
import { Handlers } from "../../Handlers";
import { JsonRPCCredService } from "./jsonRpcService";
var BusinessInfoService = /** @class */ (function (_super) {
    __extends(BusinessInfoService, _super);
    function BusinessInfoService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BusinessInfoService.prototype.getBusinessInfo = function (cb) {
        var _this = this;
        var params = {};
        this.exec(Handlers.HANDLER_GET_BUSINESS_INFO_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["businesses"]);
        });
    };
    BusinessInfoService.prototype.getBusinessInfoAsync = function () {
        var service = this;
        return new Promise(function (res, rej) {
            service.getBusinessInfo(function (err, businesses) {
                if (err)
                    return rej(err);
                res(businesses);
            });
        });
    };
    return BusinessInfoService;
}(JsonRPCCredService));
export { BusinessInfoService };
