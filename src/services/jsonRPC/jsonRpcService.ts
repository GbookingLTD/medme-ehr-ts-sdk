import {IJsonRPCRequest, IJsonRpcResponseCallback, JsonRpcHeader} from "./jsonRpcRequest";
import {Credentials} from "../Credentials";
import ServiceBase from "../ServiceBase";
import {RpcErrorCodes} from "./RpcErrorCodes";

export class JsonRPCService extends ServiceBase{
    public static id: number = 1;

    private _endpoint: string;
    private _request: IJsonRPCRequest;

    public constructor(endpoint: string, request: IJsonRPCRequest) {
        super();

        this._endpoint = endpoint;
        this._request = request;
    }

    public get endpoint(): string {
        return this._endpoint;
    }

    public get request(): IJsonRPCRequest {
        return this._request;
    }

    public exec(rpcMethod: string, payload: object, cb?: IJsonRpcResponseCallback,
                optionalEndpoint: string = undefined, optionalCred: Credentials = undefined): void {
        this.request(optionalEndpoint || this._endpoint, new JsonRpcHeader((JsonRPCService.id++).toString(), rpcMethod, optionalCred),
            payload, cb);
    }
}

export class JsonRPCCredService extends JsonRPCService {
    private cred_: Credentials;

    public constructor(endpoint: string, cred: Credentials, request: IJsonRPCRequest) {
        super(endpoint, request);
        this.cred_ = cred;
    }

    get cred(): Credentials {
        return this.cred_;
    }

    set cred(value: Credentials) {
        this.cred_ = value;
    }

    public exec(rpcMethod: string, payload: object, cb?: IJsonRpcResponseCallback,
                optionalEndpoint: string = undefined): void {
        const service = this;
        function auth(cb) {
            let this_ = this;
            return function() {
                let args = arguments;
                if (args[0].code && args[0].code === RpcErrorCodes.NotAuthenticated && service.onAuthNotAuthorized) service.onAuthNotAuthorized();
                if (args[0].code && args[0].code === RpcErrorCodes.TokenExpired && service.onAuthTokenExpired) service.onAuthTokenExpired();
                cb.apply(this_, args);
            }
        }

        this.request(optionalEndpoint || this.endpoint, new JsonRpcHeader((JsonRPCService.id++).toString(), rpcMethod, this.cred),
            payload, auth(cb));
    }
}
