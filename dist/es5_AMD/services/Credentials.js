define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Credentials = void 0;
    var Credentials = /** @class */ (function () {
        function Credentials(user, token) {
            this.user = user;
            this.token = token;
        }
        return Credentials;
    }());
    exports.Credentials = Credentials;
});
