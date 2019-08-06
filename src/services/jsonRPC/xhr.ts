if (typeof window === "undefined") {
    var XMLHttpRequest = require('xhr2');
} else {
    var XMLHttpRequest = (<any>window).XMLHttpRequest;
}

import { IJsonRpcHeader, IJsonRpcResponseCallback, IJsonRPCRequest } from "./jsonRpcRequest";
import { requestCred } from './jsonrpc_cred';

export const xhr: IJsonRPCRequest = function(endpoint: string, header: IJsonRpcHeader, requestPayload: object, 
            cb: IJsonRpcResponseCallback) {
    let req = new XMLHttpRequest();
    req.responseType = 'json';
    req.onload = (res: any) => {
        let target: XMLHttpRequest = res.target;
        if (target.status >= 400)
            cb(new Error("status code " + target.status));
        else if (target.response) {
            let jsonRpcResponse = target.response;
            if (jsonRpcResponse.result)
                cb(null, jsonRpcResponse.result);
            else if (jsonRpcResponse.error)
                cb(jsonRpcResponse.error);
            else
                cb(new Error("wrong json-rpc format " + jsonRpcResponse));
        } else
            cb(new Error("wrong json format"));
        
    };
    req.onerror = (res: any) => {
        let target: XMLHttpRequest = res.target;
        console.info('onerror ' + this.status + "\n" + target.response);
        cb(new Error("error request " + endpoint + " method #" + header.method), null);
    };
    req.open('POST', endpoint, true);
    req.overrideMimeType('application/json;charset=UTF-8');
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let jsonRpcRequest = requestCred(header.id, header.method, header.cred, requestPayload);
    console.log('jsonRpcRequest.serialize()', jsonRpcRequest.serialize());
    req.send(jsonRpcRequest.serialize());
};