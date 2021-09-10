"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import InMemory from './inMemory/index';
//import BinRPC from './binRPC/index';
var index_1 = require("./jsonRPC/index");
var AuthService_1 = require("./AuthService");
var Credentials_1 = require("./Credentials");
var RpcErrorCodes_1 = require("./RpcErrorCodes");
exports.default = {
    // InMemory
    //, BinRPC
    JsonRPC: index_1.default,
    PatientAuthenticationResult: AuthService_1.PatientAuthenticationResult,
    PatientAuthenticationStep: AuthService_1.PatientAuthenticationStep,
    PatientAuthenticationError: AuthService_1.PatientAuthenticationError,
    ConnectionError: AuthService_1.ConnectionError,
    getAuthenticatedPatient: AuthService_1.getAuthenticatedPatient,
    Credentials: Credentials_1.Credentials,
    RpcErrorCodes: RpcErrorCodes_1.RpcErrorCodes,
};
