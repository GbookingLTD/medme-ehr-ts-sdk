"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import InMemory from './inMemory/index';
//import BinRPC from './binRPC/index';
var index_1 = require("./jsonRPC/index");
var AuthService_1 = require("./AuthService");
var Credentials_1 = require("./Credentials");
var RpcErrorCodes_1 = require("./RpcErrorCodes");
var index_2 = require("./filters/index");
var PatientService_1 = require("./PatientService");
exports.default = {
    // InMemory
    //, BinRPC
    JsonRPC: index_1.default,
    PatientAuthenticationResult: AuthService_1.PatientAuthenticationResult,
    PatientAuthenticationStep: AuthService_1.PatientAuthenticationStep,
    PatientAuthenticationError: AuthService_1.PatientAuthenticationError,
    ConnectionError: AuthService_1.ConnectionError,
    getAuthenticatedPatient: AuthService_1.getAuthenticatedPatient,
    getAuthenticatedPatientByExchangeToken: AuthService_1.getAuthenticatedPatientByExchangeToken,
    Credentials: Credentials_1.Credentials,
    RpcErrorCodes: RpcErrorCodes_1.RpcErrorCodes,
    Filters: index_2.default,
    SearchEntityKeywords: PatientService_1.SearchEntityKeywords,
    SearchPatientEhrKeywords: PatientService_1.SearchPatientEhrKeywords,
    SearchPatientEhrFilters: PatientService_1.SearchPatientEhrFilters,
    SearchPatientEhrResultItem: PatientService_1.SearchPatientEhrResultItem,
};
