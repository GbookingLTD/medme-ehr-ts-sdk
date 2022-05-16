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
  (
    endpoint: string,
    header: IJsonRpcHeader,
    requestPayload: object,
    cb?: IJsonRpcResponseCallback
  ): void;
}

export class JsonRpcHeader implements IJsonRpcHeader {
  private _id: string;
  private _method: string;
  private _cred: Credentials;
  private _apiKey: string|null;

  public constructor(
    id: string,
    method: string,
    cred: Credentials = null,
    apiKey: string|null = null
  ) {
    this._id = id;
    this._method = method;
    this._cred = cred;
    this._apiKey = apiKey;
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

  public get apiKey(): string|null {
    return this._apiKey;
  }
}
