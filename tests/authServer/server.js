/*jshint esversion: 6 */
/*jshint node: true */

/*
 Тестовый сервер, выполняющий роль сервера авторизации, для запуска юнит-тестов.
*/

const http = require('http');
const ehrAuth = require('medme-ehr');

const Tokens = [{user: "user123", token: "token456", ttl: 1440}];
const findToken = (cred) => {
    for (let i = 0; i < Tokens.length; ++i)
        if (Tokens[i].user === cred.user && Tokens[i].token === cred.token)
            return Tokens[i];

    return false;
};

const config = {
    host: '127.0.0.1',
    port: 9999,
    path: '/',
    internalUser: 'test_user',
    internalPassword: 'test_password'
};

const server = http.createServer((req, res) => {
    let body = [];
    let exchangeTokenCallback;
    let loginCallback;
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        if (req.method === 'OPTIONS') {
            console.log("<--> [OPTIONS]");
            res.writeHead(200, {
                'Content-Type':'text/plain',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Headers':'Content-Type, Authorization, Content-Length',
                'Access-Control-Allow-Origin':'http://localhost:9900'
            });
            res.end();
            return;
        }

        if (req.method !== 'POST') {
            console.error('<--- 405. Method not allowed. Expected http methods POST, OPTIONS');
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('405. Method not allowed');
            return;
        }

        let bodyAsString = Buffer.concat(body).toString();
        console.log("---> [POST]", bodyAsString);
        let jsonReq = JSON.parse(bodyAsString);
        if (jsonReq.method === 'auth.exchange_token')
            exchangeTokenCallback(jsonReq);
        else if (jsonReq.method === 'auth.login')
            loginCallback(jsonReq);
    });

    let response = (res, json) => {
        console.log("<--- [POST]", json);
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials':true,
            'Access-Control-Allow-Headers':'Content-Type, Authorization, Content-Length',
            'Access-Control-Allow-Origin':'http://localhost:9900'
        });
        res.end(json);
    };

    let error = (jsonReq, res, code, message) => {
        response(res, JSON.stringify({
            jsonrpc: "2.0",
            id: jsonReq.id,
            error: {
                code,
                message
            }
        }));
    };

    exchangeTokenCallback = (jsonReq) => {
        // Проверяем cred из json body.
        let foundAuthInfo;
        if (!(foundAuthInfo = findToken(jsonReq.cred)))
            return error(jsonReq, res, 401, "Not authorized");

        // Генерируем exchangeToken.
        let exchangeToken = makeid(12);

        // Отправляем exchangeToken и AuthInfo на EHR сервер.
        ehrAuth.exchangeTokenRequestPost(config, exchangeToken, foundAuthInfo, (err2, res2) => {
            if (err2)
                return error(jsonReq, res, 500, "Error when send an exchangeToken to the EHR server " + err2);

            // Отправляем exchangeToken в ответ на запрос.
            response(res, JSON.stringify({
                jsonrpc: "2.0",
                id: jsonReq.id,
                result: {
                    exchangeToken
                }
            }));
        });
    };

    loginCallback = (jsonReq) => {
        // Сохраняем в Tokens новую пару user, token.
        // Если user_is_authenticate=1 - данные авторизации идут в EHR.
        // Для этого пользователь (параметр user) должен быть аутентифицирован в EHR
        // (присутствовать в таблице userIdMap).
        let authInfo = {
            user: jsonReq.params.user,
            token: makeid(12),
            ttl: 1440
        };
        Tokens.push(authInfo);

        const sendResponse = () => {
            response(res, JSON.stringify({
                jsonrpc: "2.0",
                id: jsonReq.id,
                result: {
                    authInfo
                }
            }));
        };

        if (jsonReq.params.ehr_user_sign)
            ehrAuth.saveAuthInfoRequestPost(config, authInfo, jsonReq.params.ehr_user_sign, sendResponse);
        else
            sendResponse();
        
    };
});

server.listen(process.env.PORT);

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
