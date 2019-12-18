
export const PROTOCOL_VERSION: string = "a";
export const REQUEST_HEADER_ALLOCATE_BYTES_LENGTH = 8; // = 1 byte protocol version 
                  // + 2 bytes for api version (major and minor) 
                  // + 1 byte for alignment
                  // + 4 bytes (uint32) for rpc method code

export class RpcRequestHeader {
    private _endpoint: string;
    private bytes_: Uint8Array;

    // Endian agnostic read|write operations (always little).
    protected writeInt32(offset: number, value: number) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
        this.bytes_[offset + 2] = value >> 16;
        this.bytes_[offset + 3] = value >> 24;
    }

    protected readInt32(offset: number) {
        return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
    }

    constructor(endpoint: string, buffer: Uint8Array) {
        this._endpoint = endpoint;
        this.bytes_ = buffer;

        // Initialize protocol and api versions
        this.protocolVersion = PROTOCOL_VERSION;
        this.setApiVersion(1, 0);
    }

    get bytes(): Uint8Array {
        return this.bytes_;
    }

    get allocateBytesLength() {
        return REQUEST_HEADER_ALLOCATE_BYTES_LENGTH; 
    }

    get endpoint(): string {
        return this._endpoint;
    }

    set endpoint(value: string) {
        this._endpoint = value;
    }

    get protocolVersion(): string {
        return String.fromCharCode(this.bytes_[0]);
    }

    set protocolVersion(char: string) {
        this.bytes_[0] = char.charCodeAt(0);
    }

    apiVersionAsArray(): number[] {
        return [this.bytes_[1], this.bytes_[2]];
    }

    apiVersionAsString(): string {
        return (this.bytes_[1] + 48).toString() + "." +
            (this.bytes_[2] + 48).toString();
    }

    setApiVersion(major: number, minor: number): void {
        this.bytes_[1] = major & 0xff;
        this.bytes_[2] = minor & 0xff;
    }

    get rpcHandler(): number {
        return this.readInt32(4);
    }

    set rpcHandler(value: number) {
        this.writeInt32(4, value);
    }
}

export interface IBodyWriter {
    (payload: {buffer: Uint8Array}): void;
}

export interface IRpcResponseCallback {
    (err: Error, payload: ArrayBuffer): void;
}

export interface IBinaryRequest {
    (header: RpcRequestHeader, body: Uint8Array, cb: IRpcResponseCallback): void;
}


