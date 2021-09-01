import {
  RpcRequestHeader,
  IBinaryRequest,
  IBodyWriter,
  IRpcResponseCallback,
  REQUEST_HEADER_ALLOCATE_BYTES_LENGTH,
} from "./BinRpcRequest";

export class BinRPCService {
  public static readonly MAX_REQUEST_SIZE: number = 1024;

  private _endpoint: string;
  private _request: IBinaryRequest;

  constructor(endpoint: string, request: IBinaryRequest) {
    this._endpoint = endpoint;
    this._request = request;
  }

  get request(): IBinaryRequest {
    return this._request;
  }

  public exec(
    rpcHandler: number,
    bodyWriter: IBodyWriter,
    cb: IRpcResponseCallback
  ): void {
    let buffer = new ArrayBuffer(BinRPCService.MAX_REQUEST_SIZE);

    let ui8_buffer = new Uint8Array(buffer, 0, BinRPCService.MAX_REQUEST_SIZE);

    let header = new RpcRequestHeader(this._endpoint, ui8_buffer);
    header.rpcHandler = rpcHandler;

    let body = {
      buffer: new Uint8Array(buffer, REQUEST_HEADER_ALLOCATE_BYTES_LENGTH),
      replace: false,
    };
    bodyWriter(body);

    if (body.replace) {
      //console.log('bytes.length =',body.buffer.length, "; ui8_buffer =", ui8_buffer.length);
      ui8_buffer.set(body.buffer, REQUEST_HEADER_ALLOCATE_BYTES_LENGTH);
    }

    this._request(
      header,
      new Uint8Array(
        buffer,
        0,
        REQUEST_HEADER_ALLOCATE_BYTES_LENGTH + body.buffer.length
      ),
      cb
    );
  }
}
