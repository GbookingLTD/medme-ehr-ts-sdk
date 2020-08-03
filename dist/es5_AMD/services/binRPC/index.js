define(["require", "exports", "./xhr", "./tcp"], function (require, exports, xhr_1, tcp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        Transports: {
            xhr: xhr_1.xhr,
            tcp: tcp_1.tcp
        }
    };
});
