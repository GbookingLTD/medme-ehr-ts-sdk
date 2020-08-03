define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RpcRequestHeader = exports.REQUEST_HEADER_ALLOCATE_BYTES_LENGTH = exports.PROTOCOL_VERSION = void 0;
    exports.PROTOCOL_VERSION = "a";
    exports.REQUEST_HEADER_ALLOCATE_BYTES_LENGTH = 8; // = 1 byte protocol version 
    // + 2 bytes for api version (major and minor) 
    // + 1 byte for alignment
    // + 4 bytes (uint32) for rpc method code
    var RpcRequestHeader = /** @class */ (function () {
        function RpcRequestHeader(endpoint, buffer) {
            this._endpoint = endpoint;
            this.bytes_ = buffer;
            // Initialize protocol and api versions
            this.protocolVersion = exports.PROTOCOL_VERSION;
            this.setApiVersion(1, 0);
        }
        // Endian agnostic read|write operations (always little).
        RpcRequestHeader.prototype.writeInt32 = function (offset, value) {
            this.bytes_[offset] = value;
            this.bytes_[offset + 1] = value >> 8;
            this.bytes_[offset + 2] = value >> 16;
            this.bytes_[offset + 3] = value >> 24;
        };
        RpcRequestHeader.prototype.readInt32 = function (offset) {
            return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
        };
        Object.defineProperty(RpcRequestHeader.prototype, "bytes", {
            get: function () {
                return this.bytes_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RpcRequestHeader.prototype, "allocateBytesLength", {
            get: function () {
                return exports.REQUEST_HEADER_ALLOCATE_BYTES_LENGTH;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RpcRequestHeader.prototype, "endpoint", {
            get: function () {
                return this._endpoint;
            },
            set: function (value) {
                this._endpoint = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RpcRequestHeader.prototype, "protocolVersion", {
            get: function () {
                return String.fromCharCode(this.bytes_[0]);
            },
            set: function (char) {
                this.bytes_[0] = char.charCodeAt(0);
            },
            enumerable: false,
            configurable: true
        });
        RpcRequestHeader.prototype.apiVersionAsArray = function () {
            return [this.bytes_[1], this.bytes_[2]];
        };
        RpcRequestHeader.prototype.apiVersionAsString = function () {
            return (this.bytes_[1] + 48).toString() + "." +
                (this.bytes_[2] + 48).toString();
        };
        RpcRequestHeader.prototype.setApiVersion = function (major, minor) {
            this.bytes_[1] = major & 0xff;
            this.bytes_[2] = minor & 0xff;
        };
        Object.defineProperty(RpcRequestHeader.prototype, "rpcHandler", {
            get: function () {
                return this.readInt32(4);
            },
            set: function (value) {
                this.writeInt32(4, value);
            },
            enumerable: false,
            configurable: true
        });
        return RpcRequestHeader;
    }());
    exports.RpcRequestHeader = RpcRequestHeader;
});
