import { IBinaryRequest, RpcRequestHeader, IRpcResponseCallback } from "./BinRpcRequest";

var net = require('net');

export const tcp: IBinaryRequest = function(header: RpcRequestHeader, buffer: Uint8Array, cb: IRpcResponseCallback) {
    var client = new net.Socket();
    client.connect(9999, '127.0.0.1', function() {
        console.log('Connected');
        client.write('a');
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
};