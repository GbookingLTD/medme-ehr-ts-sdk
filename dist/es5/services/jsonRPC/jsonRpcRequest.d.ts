import { Credentials } from "../Credentials";
export interface IJsonRpcHeader {
    id: string;
    method: string;
    cred: Credentials;
}
export interface IJsonRpcError {
    code: number;
    message: string;
    data: any;
}
export interface IJsonRpcResponseCallback {
    (err: IJsonRpcError | Error, payload?: object): void;
}
export interface IJsonRPCRequest {
    (endpoint: string, header: IJsonRpcHeader, requestPayload: object, cb?: IJsonRpcResponseCallback): void;
}
export declare class JsonRpcHeader implements IJsonRpcHeader {
    private _id;
    private _method;
    private _cred;
    constructor(id: string, method: string, cred?: Credentials);
    readonly id: string;
    readonly method: string;
    readonly cred: Credentials;
}
