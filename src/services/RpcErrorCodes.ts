export class RpcErrorCodes {
    public static readonly ParseError: number = -32700;
    public static readonly InvalidRequest: number = -32600;
    public static readonly MethodNotFound: number = -32601;
    public static readonly InvalidParams: number = -32602;
    public static readonly UnknownError: number = -32603;
    public static readonly NotAuthorized: number = -33000;
    public static readonly AuthExpired: number = -33001;
    public static readonly UnknownAuthError: number = -33002;
    public static readonly AccessForbidden: number = -33403;
    public static readonly PatientAlreadyMatched: number = -34000;
    public static readonly PatientNotAuthenticated: number = -34001;
    public static readonly PatientNotFound: number = -34002;
    public static readonly SaveAuthInfoError: number = -34003;
    public static readonly SaveExchangeTokenError: number = -34004;
    public static readonly AppointmentNotFound: number = -34005;
    public static readonly DiagnosticReportNotFound: number = -34006;
    public static readonly UserNotFound: number = -34007;
    public static readonly PrescriptionNotFound: number = -34008;
    public static readonly PatientAlreadyLinked: number = -34009;
    public static readonly AppointmentResultNotFound: number = -34010;
    public static readonly LinkedPatientNotFound: number = -34011;
}

export function isAuthorizationError(err: any) {
    return err.code === RpcErrorCodes.NotAuthorized ||
        err.code === RpcErrorCodes.AuthExpired ||
        err.code === RpcErrorCodes.UnknownAuthError;
}
