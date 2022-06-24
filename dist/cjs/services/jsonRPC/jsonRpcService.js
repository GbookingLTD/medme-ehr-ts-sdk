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
exports.JsonRPCCredService = exports.JsonRPCService = void 0;
var jsonRpcRequest_1 = require("./jsonRpcRequest");
var RpcErrorCodes_1 = require("../RpcErrorCodes");
var JsonRPCService = /** @class */ (function () {
    function JsonRPCService(endpoint, request) {
        this._endpoint = endpoint;
        this._request = request;
    }
    Object.defineProperty(JsonRPCService.prototype, "endpoint", {
        get: function () {
            return this._endpoint;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JsonRPCService.prototype, "request", {
        get: function () {
            return this._request;
        },
        enumerable: false,
        configurable: true
    });
    JsonRPCService.prototype.exec = function (rpcMethod, payload, cb, optionalEndpoint, optionalCred) {
        if (optionalEndpoint === void 0) { optionalEndpoint = undefined; }
        if (optionalCred === void 0) { optionalCred = undefined; }
        this.request(optionalEndpoint || this._endpoint, new jsonRpcRequest_1.JsonRpcHeader((JsonRPCService.id++).toString(), rpcMethod, optionalCred), payload, cb);
    };
    JsonRPCService.id = 1;
    return JsonRPCService;
}());
exports.JsonRPCService = JsonRPCService;
var JsonRPCCredService = /** @class */ (function (_super) {
    __extends(JsonRPCCredService, _super);
    function JsonRPCCredService(endpoint, cred, apiKey, request) {
        var _this = _super.call(this, endpoint, request) || this;
        _this.cred_ = cred;
        _this.apikey_ = apiKey;
        return _this;
    }
    Object.defineProperty(JsonRPCCredService.prototype, "cred", {
        get: function () {
            return this.cred_;
        },
        set: function (value) {
            this.cred_ = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JsonRPCCredService.prototype, "apiKey", {
        get: function () {
            return this.apikey_;
        },
        set: function (value) {
            this.apikey_ = value;
        },
        enumerable: false,
        configurable: true
    });
    JsonRPCCredService.prototype.exec = function (rpcMethod, payload, cb, optionalEndpoint) {
        if (optionalEndpoint === void 0) { optionalEndpoint = undefined; }
        var service = this;
        function auth(cb) {
            var this_ = this;
            return function () {
                var args = arguments;
                if (args[0] &&
                    args[0].code === RpcErrorCodes_1.RpcErrorCodes.NotAuthorized &&
                    service.onAuthNotAuthorized)
                    service.onAuthNotAuthorized();
                else if (args[0] &&
                    args[0].code === RpcErrorCodes_1.RpcErrorCodes.AuthExpired &&
                    service.onAuthExpired)
                    service.onAuthExpired();
                else if (args[0] &&
                    args[0].code === RpcErrorCodes_1.RpcErrorCodes.UnknownAuthError &&
                    service.onAuthUnknownAuthError)
                    service.onAuthUnknownAuthError();
                cb.apply(this_, args);
            };
        }
        var header = new jsonRpcRequest_1.JsonRpcHeader((JsonRPCService.id++).toString(), rpcMethod, this.cred, this.apiKey);
        this.request(optionalEndpoint || this.endpoint, header, payload, auth(cb));
    };
    JsonRPCCredService.prototype.getLastValidationErrors = function () {
        return this.lastValidationErrors_;
    };
    JsonRPCCredService.prototype.getLastValidationErrorsOfList = function () {
        return this.lastValidationErrorsOfList_;
    };
    return JsonRPCCredService;
}(JsonRPCService));
exports.JsonRPCCredService = JsonRPCCredService;
