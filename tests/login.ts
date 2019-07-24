import JsonRPC from '../src/services/jsonRPC/index';
import { Credentials } from '../src/services/Credentials';

export const AUTH_SERVER_ENDPOINT = "http://localhost:4321/";
export const EHR_SERVER_ENDPOINT = "http://localhost:9999/";

// В боевом окружении этот метод должен предоставлять API сервера авторизации.
export function login(user: string, user_is_authenticate: boolean, cb: (err: any, authCred?: Credentials) => void) {
    let header = new JsonRPC.JsonRpcHeader("1", "auth.login", null);
    JsonRPC.Transports.xhr(AUTH_SERVER_ENDPOINT, header, {user, user_is_authenticate}, function(err: any, jsonResp?: any) {
        if (err) return cb(err);
        console.log('AuthLoginResult:', jsonResp);
        if (jsonResp.authInfo) {
            let cred = new Credentials(jsonResp.authInfo.user, jsonResp.authInfo.token);
            cb(null, cred);
        } else 
            cb(new Error("user not logged in"));
    });
}

export function getCreateServiceFn<T>(ctor: (authCred: Credentials) => T) {
    let authCred: Credentials = null;
    const _create = function(cb: (err: any, service?: T) => void) {
        let service = ctor(authCred);
        return cb(null, service);
    };
    const create = (cb: (err: any, service?: T) => void) => {
        if (authCred)
            return _create(cb);

        login("User123", true, function(err: any, authCred_?: Credentials) {
            if (err) return cb(err);
            authCred = authCred_;
            _create(cb);
        });
    };
    return create;
};