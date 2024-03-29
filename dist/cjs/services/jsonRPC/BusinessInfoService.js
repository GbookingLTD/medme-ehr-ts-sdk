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
var Handlers_1 = require("../../Handlers");
var jsonRpcService_1 = require("./jsonRpcService");
var BusinessInfoService = /** @class */ (function (_super) {
    __extends(BusinessInfoService, _super);
    function BusinessInfoService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BusinessInfoService.prototype.getBusinessInfo = function (cb) {
        var _this = this;
        var params = {};
        this.exec(Handlers_1.Handlers.HANDLER_GET_BUSINESS_INFO_METHOD, params, function (err, payload) {
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
    BusinessInfoService.prototype.getSpecializationsByPattern = function (pattern, cb) {
        var _this = this;
        var params = {
            text: pattern,
        };
        this.exec(Handlers_1.Handlers.HANDLER_GET_SPECIALIZATIONS_BY_PATTERN_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["specializations"]);
        });
    };
    BusinessInfoService.prototype.getSpecializationsByPatternAsync = function (pattern) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getSpecializationsByPattern(pattern, function (err, specializations) {
                if (err)
                    return rej(err);
                res(specializations);
            });
        });
    };
    return BusinessInfoService;
}(jsonRpcService_1.JsonRPCCredService));
exports.BusinessInfoService = BusinessInfoService;
