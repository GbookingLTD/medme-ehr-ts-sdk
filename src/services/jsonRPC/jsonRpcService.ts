import {
  IJsonRPCRequest,
  IJsonRpcResponseCallback,
  JsonRpcHeader,
} from "./jsonRpcRequest";
import { Credentials } from "../Credentials";
import { RpcErrorCodes } from "../RpcErrorCodes";
import { IResourceService } from "../ResourceService";

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

  public exec(
    rpcMethod: string,
    payload: object,
    cb?: IJsonRpcResponseCallback,
    optionalEndpoint: string = undefined,
    optionalCred: Credentials = undefined
  ): void {
    this.request(
      optionalEndpoint || this._endpoint,
      new JsonRpcHeader(
        (JsonRPCService.id++).toString(),
        rpcMethod,
        optionalCred
      ),
      payload,
      cb
    );
  }
}

export class JsonRPCCredService
  extends JsonRPCService
  implements IResourceService
{
  private cred_: Credentials;
  private apikey_: string | null;
  protected lastValidationErrors_: string[];
  protected lastValidationErrorsOfList_: string[][];

  public constructor(
    endpoint: string,
    cred: Credentials,
    apiKey: string | null,
    request: IJsonRPCRequest
  ) {
    super(endpoint, request);
    this.cred_ = cred;
    this.apikey_ = apiKey;
  }

  get cred(): Credentials {
    return this.cred_;
  }

  set cred(value: Credentials) {
    this.cred_ = value;
  }

  get apiKey(): string | null {
    return this.apikey_;
  }

  set apiKey(value: string | null) {
    this.apikey_ = value;
  }

  onAuthNotAuthorized: () => void;
  onAuthExpired: () => void;
  onAuthUnknownAuthError: () => void;

  public exec(
    rpcMethod: string,
    payload: object,
    cb: IJsonRpcResponseCallback,
    optionalEndpoint: string = undefined
  ): void {
    const service = this;

    function auth(cb: any) {
      let this_ = this;
      return function () {
        let args = arguments;
        if (
          args[0] &&
          args[0].code === RpcErrorCodes.NotAuthorized &&
          service.onAuthNotAuthorized
        )
          service.onAuthNotAuthorized();
        else if (
          args[0] &&
          args[0].code === RpcErrorCodes.AuthExpired &&
          service.onAuthExpired
        )
          service.onAuthExpired();
        else if (
          args[0] &&
          args[0].code === RpcErrorCodes.UnknownAuthError &&
          service.onAuthUnknownAuthError
        )
          service.onAuthUnknownAuthError();
        cb.apply(this_, args);
      };
    }

    const header = new JsonRpcHeader(
      (JsonRPCService.id++).toString(),
      rpcMethod,
      this.cred,
      this.apiKey,
    );
    this.request(optionalEndpoint || this.endpoint, header, payload, auth(cb));
  }

  public getLastValidationErrors(): string[] {
    return this.lastValidationErrors_;
  }

  public getLastValidationErrorsOfList(): string[][] {
    return this.lastValidationErrorsOfList_;
  }
}
