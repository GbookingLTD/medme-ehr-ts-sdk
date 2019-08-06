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

export type NotAuthorizedError = IJsonRpcError & { code: 33000 }

export interface IJsonRPCRequest {
    (endpoint: string, header: IJsonRpcHeader, requestPayload: object, cb?: IJsonRpcResponseCallback): void;
}

export class JsonRpcHeader implements IJsonRpcHeader {
    private _id: string;
    private _method: string;
    private _cred: Credentials;

    public constructor(id: string, method: string, cred: Credentials = null) {
        this._id = id;
        this._method = method;
        this._cred = cred;
    }

    public get id(): string {
        return this._id;
    }

    public get method(): string {
        return this._method;
    }

    public get cred(): Credentials {
        return this._cred;
    }
}
