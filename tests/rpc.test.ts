import JsonRPC from '../src/services/jsonRPC/index';
import {RpcErrorCodes} from "../src/services/RpcErrorCodes";
import {IJsonRpcError} from "../src/services/jsonRPC/jsonRpcRequest";
import {EHR_SERVER_ENDPOINT, login} from './login';
import {Credentials} from "../src/services/Credentials";
import {ConnectionError} from "../src/services/AuthService";
import * as assert from 'assert'

var XMLHttpRequest = require('xhr2');

describe('Rpc', function () {
    describe('Exceptions', function () {
        it('Handler not found', function (done: (err?: any) => void) {
            const header = new JsonRPC.JsonRpcHeader("1", "auth.nonexistentmethod", null);
            JsonRPC.Transports.xhr(EHR_SERVER_ENDPOINT, header, {}, err => {
                const rpcError = err as IJsonRpcError;
                if (rpcError && rpcError.code && rpcError.code === RpcErrorCodes.MethodNotFound)
                    done()
                else
                    done(err)
            })
        })

        it('Invalid params', function (done: (err?: any) => void) {
            login("user123", 'user_sign_222', function(err: any, authCred?: Credentials) {
                if (err) return done(err);

                let header = new JsonRPC.JsonRpcHeader("1", "appointment.get_appointment_by_id", authCred);
                JsonRPC.Transports.xhr(EHR_SERVER_ENDPOINT, header, {}, function(err: any) {
                    const rpcError = err as IJsonRpcError;
                    if (rpcError
                        && rpcError.code
                        && rpcError.code === RpcErrorCodes.InvalidParams
                        && rpcError.data.errors
                        && rpcError.data.errors.filter(i => i.includes('Id')))
                        done()
                    else
                        done(err)
                });
            });
        })

        function sendJson(json: string, cb: (res: any) => void) {
            let req = new XMLHttpRequest();
            req.responseType = 'json';
            req.onload = (res: any) => {
                cb(res);
            };
            req.onerror = (res: any) => {
                cb(res);
            };
            req.open('POST', EHR_SERVER_ENDPOINT, true);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.send(json);
        }

        it('Invalid json', function (done: (err?: any) => void) {
            sendJson("", function (res: any) {
                let target: XMLHttpRequest = res.target;
                if (target.response && target.response.error && target.response.error.code === RpcErrorCodes.ParseError) {
                    done();
                } else done(new Error('error'))
            })
        })

        it('Invalid request', function (done: (err?: any) => void) {
            const wrongRpcRequest = {
                id: null
            }
            sendJson(JSON.stringify(wrongRpcRequest), function (res: any) {
                let target: XMLHttpRequest = res.target;
                if (target.response && target.response.error && target.response.error.code === RpcErrorCodes.InvalidRequest) {
                    done();
                } else done(new Error('error'))
            })
        })

        it('Connection error', function (done: (err?: any) => void){
            let header = new JsonRPC.JsonRpcHeader("1", "api_info.healthcheck");
            JsonRPC.Transports.xhr(EHR_SERVER_ENDPOINT, header, {}, function(err: any) {
                assert(err instanceof ConnectionError);
                done()
            });
        });
    })
})