export interface IJsonRpcHeader {
    id: string;
    method: string;
}

export interface IJsonRpcResponseCallback {
    (err: Error, payload?: object): void;
}

export interface IJsonRPCRequest {
    (endpoint: string, header: IJsonRpcHeader, requestPayload: object, cb?: IJsonRpcResponseCallback): void;
}

export class JsonRpcHeader implements IJsonRpcHeader {
    private _id: string;
    private _method: string;

    public constructor(id: string, method: string) {
        this._id = id;
        this._method = method;
    }

    public get id(): string {
        return this._id;
    }

    public get method(): string {
        return this._method;
    }
}
