/*jshint esversion: 6 */
/*jshint node: true */

/*
 Тестовый сервер, выполняющий роль сервера авторизации, для запуска юнит-тестов.
*/

// TODO Использовать ehr-js-sdk для отправки запросов на EHR сервер.

const http = require('http');

const Tokens = [{user:"1", token:"test", ttl: 1440}, {user: "User123", token: "token_4444", ttl: 1440}];
const findToken = (cred) => {
    for (let i = 0; i < Tokens.length; ++i)
        if (Tokens[i].user === cred.user && Tokens[i].token === cred.token)
            return Tokens[i];

    return false;
};

const server = http.createServer((req, res) => {
    let body = [];
    let exchangeTokenCallback;
    let loginCallback;
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        let bodyAsString = Buffer.concat(body).toString();
        console.log("---> ", bodyAsString);
        let jsonReq = JSON.parse(bodyAsString);
        if (jsonReq.method === 'auth.exchange_token')
            exchangeTokenCallback(jsonReq);
        else if (jsonReq.method === 'auth.login')
            loginCallback(jsonReq);
    });

    let response = (res, json) => {
        console.log("<--- ", json);
        res.writeHead(200, { 'Content-Type': 'application/json' });
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
        exchangeTokenRequestPost(exchangeToken, foundAuthInfo, (err2, res2) => {
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

        if (jsonReq.params.user_is_authenticate)
            saveAuthInfoPostRequest(authInfo, sendResponse);
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

function postJson(data, cb) {
    // Build the post string from an object
    var post_data = JSON.stringify(data);

    // An object of options to indicate where to post to
    var post_options = {
        host: process.env.EHR_HOST,
        port: process.env.EHR_PORT,
        path: process.env.EHR_PATH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        
        res.on('data', function (chunk) {
            console.log("EHR Server Response Chunk: " + chunk);
            cb(null, chunk);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

let jsonRpcIdCounter = 1;
let internalCred = {
    user: 'Test',
    token: 'Test'
};
function exchangeTokenRequestPost(exchangeToken, authInfo, cb) {
    console.log('exchangeToken=', exchangeToken, authInfo);
    postJson({
        jsonrpc: "2.0",
        id: jsonRpcIdCounter++,
        cred: internalCred,
        method: "embedded_storage.save_exchange_token",
        params: {
            exchangeToken,
            authInfo
        }
    }, cb);
}
function saveAuthInfoPostRequest(authInfo, cb) {
    console.log('saveAuthInfo=', authInfo);
    postJson({
        jsonrpc: "2.0",
        id: jsonRpcIdCounter++,
        cred: internalCred,
        method: "embedded_storage.save_auth_info",
        params: {
            authInfo
        }
    }, cb);
}
 
