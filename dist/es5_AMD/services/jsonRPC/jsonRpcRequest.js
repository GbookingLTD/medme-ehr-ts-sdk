define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonRpcHeader = void 0;
    var JsonRpcHeader = /** @class */ (function () {
        function JsonRpcHeader(id, method, cred) {
            if (cred === void 0) { cred = null; }
            this._id = id;
            this._method = method;
            this._cred = cred;
        }
        Object.defineProperty(JsonRpcHeader.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JsonRpcHeader.prototype, "method", {
            get: function () {
                return this._method;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JsonRpcHeader.prototype, "cred", {
            get: function () {
                return this._cred;
            },
            enumerable: false,
            configurable: true
        });
        return JsonRpcHeader;
    }());
    exports.JsonRpcHeader = JsonRpcHeader;
});
