define(["require", "exports", "./BinRpcRequest"], function (require, exports, BinRpcRequest_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BinRPCService = void 0;
    var BinRPCService = /** @class */ (function () {
        function BinRPCService(endpoint, request) {
            this._endpoint = endpoint;
            this._request = request;
        }
        Object.defineProperty(BinRPCService.prototype, "request", {
            get: function () {
                return this._request;
            },
            enumerable: false,
            configurable: true
        });
        BinRPCService.prototype.exec = function (rpcHandler, bodyWriter, cb) {
            var buffer = new ArrayBuffer(BinRPCService.MAX_REQUEST_SIZE);
            var ui8_buffer = new Uint8Array(buffer, 0, BinRPCService.MAX_REQUEST_SIZE);
            var header = new BinRpcRequest_1.RpcRequestHeader(this._endpoint, ui8_buffer);
            header.rpcHandler = rpcHandler;
            var body = {
                buffer: new Uint8Array(buffer, BinRpcRequest_1.REQUEST_HEADER_ALLOCATE_BYTES_LENGTH),
                replace: false
            };
            bodyWriter(body);
            if (body.replace) {
                //console.log('bytes.length =',body.buffer.length, "; ui8_buffer =", ui8_buffer.length);
                ui8_buffer.set(body.buffer, BinRpcRequest_1.REQUEST_HEADER_ALLOCATE_BYTES_LENGTH);
            }
            this._request(header, new Uint8Array(buffer, 0, BinRpcRequest_1.REQUEST_HEADER_ALLOCATE_BYTES_LENGTH + body.buffer.length), cb);
        };
        BinRPCService.MAX_REQUEST_SIZE = 1024;
        return BinRPCService;
    }());
    exports.BinRPCService = BinRPCService;
});
