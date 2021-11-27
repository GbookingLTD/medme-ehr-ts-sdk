import { IBinaryRequest, IBodyWriter, IRpcResponseCallback } from "./BinRpcRequest";
export declare class BinRPCService {
    static readonly MAX_REQUEST_SIZE: number;
    private _endpoint;
    private _request;
    constructor(endpoint: string, request: IBinaryRequest);
    get request(): IBinaryRequest;
    exec(rpcHandler: number, bodyWriter: IBodyWriter, cb: IRpcResponseCallback): void;
}
