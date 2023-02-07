"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonRpcHeader = /** @class */ (function () {
    function JsonRpcHeader(id, method, cred, apiKey) {
        if (cred === void 0) { cred = null; }
        if (apiKey === void 0) { apiKey = null; }
        this._id = id;
        this._method = method;
        this._cred = cred;
        this._apiKey = apiKey;
    }
    Object.defineProperty(JsonRpcHeader.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonRpcHeader.prototype, "method", {
        get: function () {
            return this._method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonRpcHeader.prototype, "cred", {
        get: function () {
            return this._cred;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonRpcHeader.prototype, "apiKey", {
        get: function () {
            return this._apiKey;
        },
        enumerable: true,
        configurable: true
    });
    return JsonRpcHeader;
}());
exports.JsonRpcHeader = JsonRpcHeader;
