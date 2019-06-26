import { IJsonRPCRequest, IJsonRpcResponseCallback, JsonRpcHeader } from "./jsonRpcRequest";

export class JsonRPCService {
    public static id: number = 1;

    private _endpoint: string;
    private _request: IJsonRPCRequest;

    public constructor(endpoint: string, request: IJsonRPCRequest) {
        this._endpoint = endpoint;
        this._request = request;
    }

    public get endpoint(): string {
        return this._endpoint;
    }

    public get request(): IJsonRPCRequest {
        return this._request;
    }

    public exec(rpcMethod: string, payload: object, cb?: IJsonRpcResponseCallback): void {
        this._request(this._endpoint, new JsonRpcHeader((JsonRPCService.id++).toString(), rpcMethod), 
            payload, cb);
    }
}

