import { IBinaryRequest, RpcRequestHeader, IRpcResponseCallback } from "./BinRpcRequest";
if (typeof window === "undefined") {
    var XMLHttpRequest = require('xhr2');
} else {
    var XMLHttpRequest = (<any>window).XMLHttpRequest;
}

function ab2str(buf: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

// HTTP-wrapper of binary data
export const xhr: IBinaryRequest = function(header: RpcRequestHeader, body: Uint8Array, cb: IRpcResponseCallback) {
    let req = new XMLHttpRequest();
    req.responseType = "arraybuffer";
    req.onload = (res: any) => {
        let target: XMLHttpRequest = res.target;
        //console.log("status="+target.status+" "+target.response.constructor.name+"\n"+ab2str(target.response));

        //var buf = new flatbuffers.ByteBuffer(new Uint8Array(target.response));
        //var responseHeader = MedMe.EHR.FlatBuffers.ResponseHeader.getRootAsResponseHeader(buf);
        //console.log("responseHeader:\n  success_code=" + responseHeader.successCode() + "\n  error_code=" + 
        //    responseHeader.errorCode() + "\n  error_message=" + responseHeader.errorMessage() + "\n");

        cb(target.status === 200 ? null : new Error("status code " + target.status), target.response);
    };
    req.onerror = (res: any) => {
        let target: XMLHttpRequest = res.target;
        console.info('onerror ' + this.status + "\n" + ab2str(target.response));
        cb(new Error("error request " + header.endpoint + " method #" + header.rpcHandler), null);
    };
    req.open('POST', header.endpoint, true);
    req.overrideMimeType('application/octet-stream');
    //req.setRequestHeader('Content-Length', body.byteLength.toString());
    req.send(body);
};