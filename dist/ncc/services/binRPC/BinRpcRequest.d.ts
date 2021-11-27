export declare const PROTOCOL_VERSION: string;
export declare const REQUEST_HEADER_ALLOCATE_BYTES_LENGTH = 8;
export declare class RpcRequestHeader {
    private _endpoint;
    private bytes_;
    protected writeInt32(offset: number, value: number): void;
    protected readInt32(offset: number): number;
    constructor(endpoint: string, buffer: Uint8Array);
    get bytes(): Uint8Array;
    get allocateBytesLength(): number;
    get endpoint(): string;
    set endpoint(value: string);
    get protocolVersion(): string;
    set protocolVersion(char: string);
    apiVersionAsArray(): number[];
    apiVersionAsString(): string;
    setApiVersion(major: number, minor: number): void;
    get rpcHandler(): number;
    set rpcHandler(value: number);
}
export interface IBodyWriter {
    (payload: {
        buffer: Uint8Array;
    }): void;
}
export interface IRpcResponseCallback {
    (err: Error, payload: ArrayBuffer): void;
}
export interface IBinaryRequest {
    (header: RpcRequestHeader, body: Uint8Array, cb: IRpcResponseCallback): void;
}
