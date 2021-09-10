import { IJsonRPCRequest, IJsonRpcResponseCallback } from "./jsonRpcRequest";
import { Credentials } from "../Credentials";
import { IResourceService } from "../ResourceService";
export declare class JsonRPCService {
    static id: number;
    private _endpoint;
    private _request;
    constructor(endpoint: string, request: IJsonRPCRequest);
    get endpoint(): string;
    get request(): IJsonRPCRequest;
    exec(rpcMethod: string, payload: object, cb?: IJsonRpcResponseCallback, optionalEndpoint?: string, optionalCred?: Credentials): void;
}
export declare class JsonRPCCredService extends JsonRPCService implements IResourceService {
    private cred_;
    private apikey_;
    protected lastValidationErrors_: string[];
    protected lastValidationErrorsOfList_: string[][];
    constructor(endpoint: string, cred: Credentials, apiKey: string, request: IJsonRPCRequest);
    get cred(): Credentials;
    set cred(value: Credentials);
    get apiKey(): string;
    set apiKey(value: string);
    onAuthNotAuthorized: () => void;
    onAuthExpired: () => void;
    onAuthUnknownAuthError: () => void;
    exec(rpcMethod: string, payload: object, cb: IJsonRpcResponseCallback, optionalEndpoint?: string): void;
    getLastValidationErrors(): string[];
    getLastValidationErrorsOfList(): string[][];
}
