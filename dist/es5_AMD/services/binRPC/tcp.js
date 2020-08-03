define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tcp = void 0;
    var net = require('net');
    exports.tcp = function (header, buffer, cb) {
        var client = new net.Socket();
        client.connect(9999, '127.0.0.1', function () {
            console.log('Connected');
            client.write('a');
        });
        client.on('data', function (data) {
            console.log('Received: ' + data);
            client.destroy(); // kill client after server's response
        });
        client.on('close', function () {
            console.log('Connection closed');
        });
    };
});
