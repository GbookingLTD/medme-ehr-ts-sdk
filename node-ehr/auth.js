/*jslint esversion: 6 */
/*jshint node: true */

"use strict";

var http = require('http');
var util = require('util');
var crypto = require('crypto');

process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err.stack);
});

let jsonRpcIdCounter = 1;

function exchangeTokenRequestPost(config, exchangeToken, authInfo, cb) {
    console.log('exchangeToken=', exchangeToken, authInfo);
    let internalCred = {
        user: config.internalUser,
        token: sha1hex(config.internalPassword + exchangeToken) // hash(password + salt)
    };
    postJson(config, {
        jsonrpc: "2.0",
        id: jsonRpcIdCounter++,
        cred: internalCred,
        method: "embedded_storage.save_exchange_token",
        params: {
            exchangeToken,
            authInfo
        }
    }, jsonRpcResult(cb));
}

function saveAuthInfoRequestPost(config, authInfo, userSign, cb) {
    console.log('saveAuthInfo=', authInfo);
    let internalCred = {
        user: config.internalUser,
        token: sha1hex(config.internalPassword + userSign) // hash(password + user_sign)
    };
    postJson(config, {
        jsonrpc: "2.0",
        id: jsonRpcIdCounter++,
        cred: internalCred,
        method: "embedded_storage.save_auth_info",
        params: {
            authInfo
        }
    }, jsonRpcResult(cb));
}

function postJson(config, data, cb) {
    // Build the post string from an object
    var post_data = JSON.stringify(data);

    // An object of options to indicate where to post to
    var post_options = {
        host: config.host,
        port: config.port,
        path: config.path,
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

function EHRError(message) {
  this.message = message;
  Error.captureStackTrace(this, EHRError);
}

util.inherits(EHRError, Error);

EHRError.prototype.name = 'EHRError';

function handleEHRResponse(resp, cb) {
  if (resp.error) {
    // show validation errors
    if (resp.error.code === -32600 && resp.error.data && Array.isArray(resp.error.data.errors))
      return cb(new EHRError(`EHR Invalid Request: ${resp.error.data.errors.join("; ")}`));
    else
      return cb(new EHRError(`EHR request finished with error ${resp.error.message}`));
  }

  return cb(null, resp);
}

function jsonRpcResult(cb) {
    return function(err, body) {
        if (err) return cb(err, null);
        let json;
        try {
            json = JSON.parse(body);
        } catch (err) { 
            return cb(err, null);
        }
        
        handleEHRResponse(json, cb);
        
    };
}

function sha1hex(str) {
    return crypto.createHash('sha1').update(str, 'utf8').digest('hex');
}

exports.exchangeTokenRequestPost = exchangeTokenRequestPost;
exports.saveAuthInfoRequestPost = saveAuthInfoRequestPost;
exports.EHRError = EHRError;