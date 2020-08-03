define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.xhr = void 0;
    if (typeof window === "undefined") {
        var XMLHttpRequest = require('xhr2');
    }
    else {
        var XMLHttpRequest = window.XMLHttpRequest;
    }
    function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }
    // HTTP-wrapper of binary data
    exports.xhr = function (header, body, cb) {
        var _this = this;
        var req = new XMLHttpRequest();
        req.responseType = "arraybuffer";
        req.onload = function (res) {
            var target = res.target;
            cb(target.status === 200 ? null : new Error("status code " + target.status), target.response);
        };
        req.onerror = function (res) {
            var target = res.target;
            console.info('onerror ' + _this.status + "\n" + ab2str(target.response));
            cb(new Error("error request " + header.endpoint + " method #" + header.rpcHandler), null);
        };
        req.open('POST', header.endpoint, true);
        req.overrideMimeType('application/octet-stream');
        //req.setRequestHeader('Content-Length', body.byteLength.toString());
        req.send(body);
    };
});
