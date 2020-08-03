define(["require", "exports", "./jsonRPC/index", "./AuthService", "./Credentials", "./RpcErrorCodes"], function (require, exports, index_1, AuthService_1, Credentials_1, RpcErrorCodes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        RpcErrorCodes: RpcErrorCodes_1.RpcErrorCodes
    };
});
