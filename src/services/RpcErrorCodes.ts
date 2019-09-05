export class RpcErrorCodes {
    public static ParseError: number = -32700;
    public static InvalidRequest: number = -32600;
    public static MethodNotFound: number = -32601;
    public static InvalidParams: number = -32602;
    public static UnknownError: number = -32603;
    public static NotAuthorized: number = -33000;
    public static AuthExpired: number = -33001;
    public static UnknownAuthError: number = -33002;
    public static AccessForbidden: number = -33403;
    public static PatientAlreadyMatched: number = -34000;
    public static PatientNotAuthenticated: number = -34001;
    public static PatientNotFound: number = -34002;
    public static SaveAuthInfoError: number = -34003;
    public static SaveExchangeTokenError: number = -34004;
    public static AppointmentNotFound: number = -34005;
    public static DiagnosticReportNotFound: number = -34006;
    public static UserNotFound: number = -34007;
    public static PrescriptionNotFound: number = -34008;
    public static GetPatientError: number = -34009;
}

export function isAuthorizationError(err: any) {
    return err.code === RpcErrorCodes.NotAuthorized ||
        err.code === RpcErrorCodes.AuthExpired ||
        err.code === RpcErrorCodes.UnknownAuthError;
}