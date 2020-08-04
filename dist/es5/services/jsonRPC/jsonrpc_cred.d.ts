import * as jsonrpc from './jsonrpc';
import { Credentials } from "../Credentials";
export declare class RequestCredObject extends jsonrpc.RequestObject {
    cred: Credentials;
    constructor(id: jsonrpc.ID, method: string, cred: Credentials, params?: jsonrpc.RpcParams);
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
export declare function requestCred(id: jsonrpc.ID, method: string, cred: Credentials, params?: jsonrpc.RpcParams): RequestCredObject;
