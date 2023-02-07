"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RpcErrorCodes = /** @class */ (function () {
    function RpcErrorCodes() {
    }
    RpcErrorCodes.ParseError = -32700;
    RpcErrorCodes.InvalidRequest = -32600;
    RpcErrorCodes.MethodNotFound = -32601;
    RpcErrorCodes.InvalidParams = -32602;
    RpcErrorCodes.UnknownError = -32603;
    RpcErrorCodes.NotAuthorized = -33000;
    RpcErrorCodes.AuthExpired = -33001;
    RpcErrorCodes.UnknownAuthError = -33002;
    RpcErrorCodes.AccessForbidden = -33403;
    RpcErrorCodes.PatientAlreadyMatched = -34000;
    RpcErrorCodes.PatientNotAuthenticated = -34001;
    RpcErrorCodes.PatientNotFound = -34002;
    RpcErrorCodes.SaveAuthInfoError = -34003;
    RpcErrorCodes.SaveExchangeTokenError = -34004;
    RpcErrorCodes.AppointmentNotFound = -34005;
    RpcErrorCodes.DiagnosticReportNotFound = -34006;
    RpcErrorCodes.UserNotFound = -34007;
    RpcErrorCodes.PrescriptionNotFound = -34008;
    RpcErrorCodes.PatientAlreadyLinked = -34009;
    RpcErrorCodes.AppointmentResultNotFound = -34010;
    RpcErrorCodes.LinkedPatientNotFound = -34011;
    return RpcErrorCodes;
}());
exports.RpcErrorCodes = RpcErrorCodes;
function isAuthorizationError(err) {
    return (err.code === RpcErrorCodes.NotAuthorized ||
        err.code === RpcErrorCodes.AuthExpired ||
        err.code === RpcErrorCodes.UnknownAuthError);
}
exports.isAuthorizationError = isAuthorizationError;
