import { ConnectionError } from "../AuthService";
if (typeof window === "undefined") {
    var XMLHttpRequest = require('xhr2');
}
else {
    var XMLHttpRequest = window.XMLHttpRequest;
}
import { requestCred } from './jsonrpc_cred';
export var xhr = function (endpoint, header, requestPayload, cb) {
    var _this = this;
    var req = new XMLHttpRequest();
    req.responseType = 'json';
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
        console.info('onerror ' + _this.status + "\n" + target.response);
        if (target.status === 0)
            return cb(new ConnectionError(), null);
        cb(new Error("error request " + endpoint + " method #" + header.method), null);
    };
    req.open('POST', endpoint, true);
    //req.overrideMimeType('application/json;charset=UTF-8');
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(header.method + " " + JSON.stringify(header.cred) + "\n" + JSON.stringify(requestPayload));
    var jsonRpcRequest = requestCred(header.id, header.method, header.cred, requestPayload);
    //console.log('jsonRpcRequest.serialize()', jsonRpcRequest.serialize());
    req.send(jsonRpcRequest.serialize());
};
