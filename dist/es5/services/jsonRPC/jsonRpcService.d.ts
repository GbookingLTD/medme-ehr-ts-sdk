import { IJsonRPCRequest, IJsonRpcResponseCallback } from "./jsonRpcRequest";
import { Credentials } from "../Credentials";
import { IResourceService } from '../ResourceService';
export declare class JsonRPCService {
    static id: number;
    private _endpoint;
    private _request;
    constructor(endpoint: string, request: IJsonRPCRequest);
    readonly endpoint: string;
    readonly request: IJsonRPCRequest;
    exec(rpcMethod: string, payload: object, cb?: IJsonRpcResponseCallback, optionalEndpoint?: string, optionalCred?: Credentials): void;
}
export declare class JsonRPCCredService extends JsonRPCService implements IResourceService {
    private cred_;
    protected lastValidationErrors_: string[];
    protected lastValidationErrorsOfList_: string[][];
    constructor(endpoint: string, cred: Credentials, request: IJsonRPCRequest);
    cred: Credentials;
    onAuthNotAuthorized: () => void;
    onAuthExpired: () => void;
    onAuthUnknownAuthError: () => void;
    exec(rpcMethod: string, payload: object, cb: IJsonRpcResponseCallback, optionalEndpoint?: string): void;
    getLastValidationErrors(): string[];
    getLastValidationErrorsOfList(): string[][];
}
