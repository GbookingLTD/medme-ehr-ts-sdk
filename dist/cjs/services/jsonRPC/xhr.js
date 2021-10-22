"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xhr = void 0;
var AuthService_1 = require("../AuthService");
if (typeof window === "undefined") {
    var XMLHttpRequest = require("xhr2");
}
else {
    var XMLHttpRequest = window.XMLHttpRequest;
}
var jsonrpc_cred_1 = require("./jsonrpc_cred");
var verbose = true;
var debug = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (verbose)
        console.debug.apply(console, args);
};
exports.xhr = function (endpoint, header, requestPayload, cb) {
    var _this = this;
    var req = new XMLHttpRequest();
    req.responseType = "json";
    req.withCredentials = true;
    req.onload = function (res) {
        var target = res.target;
        if (target.status >= 400)
            cb(new Error("status code " + target.status));
        else if (target.response) {
            var jsonRpcResponse = target.response;
            if (jsonRpcResponse.result)
                cb(null, jsonRpcResponse.result);
            else if (jsonRpcResponse.error)
                cb(jsonRpcResponse.error);
            else
                cb(new Error("wrong json-rpc format " + jsonRpcResponse));
        }
        else
            cb(new Error("wrong json format"));
    };
    req.onerror = function (res) {
        var target = res.target;
        console.error("onerror " + _this.status + "\n" + target.response);
        if (target.status === 0)
            return cb(new AuthService_1.ConnectionError(), null);
        cb(new Error("error request " + endpoint + " method #" + header.method), null);
    };
    req.open("POST", endpoint, true);
    //req.overrideMimeType('application/json;charset=UTF-8');
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    debug(header.method + " cred=" + JSON.stringify(header.cred) + " apikey=" + header.apiKey + "\n" + JSON.stringify(requestPayload));
    //console.trace();
    var jsonRpcRequest = jsonrpc_cred_1.requestCred(header.id, header.method, header.cred, header.apiKey, requestPayload);
    debug("jsonRpcRequest.serialize()", jsonRpcRequest.serialize());
    req.send(jsonRpcRequest.serialize());
};
