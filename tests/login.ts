import JsonRPC from '../src/services/jsonRPC/index';
import { Credentials } from '../src/services/Credentials';
import * as fs from "fs";
import { AUTH_SERVER_ENDPOINT } from './env';

export const getUserSignFile = (user) => __dirname + "/" + user + "_ehr_user_sign.txt";
export const readUserSignFile = (userPublicID: string) =>
    fs.readFileSync(getUserSignFile(userPublicID)).toString() || undefined;

export const writeUserSignFile = (user: string, val: string) => {
    fs.writeFileSync(getUserSignFile(user), val);
}

// В боевом окружении этот метод должен предоставлять API сервера авторизации.
export async function login(user: string, ehr_user_sign: string): Promise<Credentials> {
    let header = new JsonRPC.JsonRpcHeader("1", "auth.login", null);

    return new Promise((resolve, reject) => {

        JsonRPC.Transports.xhr(AUTH_SERVER_ENDPOINT, header, {user, ehr_user_sign}, function(err: any, jsonResp?: any) {
            if (err)
                reject(err);

            console.log('AuthLoginResult:', jsonResp);
            if (!jsonResp.authInfo)
                reject(new Error("user not logged in"));

            resolve(new Credentials(jsonResp.authInfo.user, jsonResp.authInfo.token));
        });

    });
}