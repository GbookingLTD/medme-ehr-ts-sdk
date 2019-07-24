/*
 jsonrpc 2.0 extention for the "cred" property supports.
*/

import * as jsonrpc from './jsonrpc';
import { Credentials } from "../Credentials";

export class RequestCredObject extends jsonrpc.RequestObject {
  public cred: Credentials;
  constructor(id: jsonrpc.ID, method: string, cred: Credentials, params?: jsonrpc.RpcParams) {
    super(id, method, params);
    this.cred = cred;
  }
}

/**
 * Creates a JSON-RPC 2.0 request object with "cred" property.
 *
 * @param  {String|Integer} id
 * @param  {String} method
 * @param  {Credentials} cred
 * @param  {Object|Array} [params]: optional
 * @return {Object} JsonRpc object
 * @api public
 */
export function requestCred (
    id: jsonrpc.ID,
    method: string,
    cred: Credentials,
    params?: jsonrpc.RpcParams,
  ): RequestCredObject {
    // call "standart" request function for validate message
    jsonrpc.request(id, method, params);
    return new RequestCredObject(id, method, cred, params);
  }


