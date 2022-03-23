import { ConnectionError } from "../AuthService";

if (typeof window === "undefined") {
  var XMLHttpRequest = require("xhr2");
} else {
  var XMLHttpRequest = (<any>window).XMLHttpRequest;
}

import {
  IJsonRpcHeader,
  IJsonRpcResponseCallback,
  IJsonRPCRequest,
} from "./jsonRpcRequest";
import { requestCred } from "./jsonrpc_cred";

const verbose = true;
const debug = (...args) => {
  if (verbose) console.debug.apply(console, args);
};

export const xhr: IJsonRPCRequest = function (
  endpoint: string,
  header: IJsonRpcHeader,
  requestPayload: object,
  cb: IJsonRpcResponseCallback
) {
  let req = new XMLHttpRequest();
  req.responseType = "json";
  req.withCredentials = true;

  req.onload = (res: any) => {
    let target: XMLHttpRequest = res.target;
    if (target.status >= 400) cb(new Error("status code " + target.status));
    else if (target.response) {
      let jsonRpcResponse = target.response;
      if (jsonRpcResponse.result) cb(null, jsonRpcResponse.result);
      else if (jsonRpcResponse.error) cb(jsonRpcResponse.error);
      else cb(new Error("wrong json-rpc format " + jsonRpcResponse));
    } else cb(new Error("wrong json format"));
  };

  req.onerror = (res: any) => {
    let target: XMLHttpRequest = res.target;
    console.error("onerror " + this.status + "\n" + target.response);
    if (target.status === 0) return cb(new ConnectionError(), null);
    cb(
      new Error("error request " + endpoint + " method #" + header.method),
      null
    );
  };

  console.info('endpoint: ' + endpoint)

  req.open("POST", endpoint, true);
  //req.overrideMimeType('application/json;charset=UTF-8');
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  debug(
    `${header.method} cred=${JSON.stringify(header.cred)} apikey=${
      header.apiKey
    }\n${JSON.stringify(requestPayload)}`
  );
  //console.trace();
  let jsonRpcRequest = requestCred(
    header.id,
    header.method,
    header.cred,
    header.apiKey,
    requestPayload
  );
  debug("jsonRpcRequest.serialize()", jsonRpcRequest.serialize());
  req.send(jsonRpcRequest.serialize());
};
