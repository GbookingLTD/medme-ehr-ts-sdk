import { Credentials } from "../Credentials";
export interface IJsonRpcHeader {
    id: string;
    method: string;
    cred: Credentials;
    apiKey: string | null;
}
export interface IJsonRpcError {
    code: number;
    message: string;
    data: any;
}
export interface IJsonRpcResponseCallback {
    (err?: IJsonRpcError | Error, payload?: object): void;
}
export interface IJsonRPCRequest {
    (endpoint: string, header: IJsonRpcHeader, requestPayload: object, cb?: IJsonRpcResponseCallback): void;
}
export declare class JsonRpcHeader implements IJsonRpcHeader {
    private _id;
    private _method;
    private _cred;
    private _apiKey;
    constructor(id: string, method: string, cred?: Credentials, apiKey?: string | null);
    get id(): string;
    get method(): string;
    get cred(): Credentials;
    get apiKey(): string | null;
}
//# sourceMappingURL=jsonRpcRequest.d.ts.map