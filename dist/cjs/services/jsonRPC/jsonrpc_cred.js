"use strict";
/*
 jsonrpc 2.0 extention for the "cred" property supports.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCred = exports.RequestCredObject = void 0;
var jsonrpc = require("./jsonrpc");
var RequestCredObject = /** @class */ (function (_super) {
    __extends(RequestCredObject, _super);
    function RequestCredObject(id, method, cred, apiKey, params) {
        var _this = _super.call(this, id, method, params) || this;
        _this.cred = cred;
        _this.apiKey = apiKey;
        return _this;
    }
    return RequestCredObject;
}(jsonrpc.RequestObject));
exports.RequestCredObject = RequestCredObject;
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
function requestCred(id, method, cred, apiKey, params) {
    // call "standart" request function for validate message
    jsonrpc.request(id, method, params);
    return new RequestCredObject(id, method, cred, apiKey, params);
}
exports.requestCred = requestCred;
