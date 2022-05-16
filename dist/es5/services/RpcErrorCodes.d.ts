export declare class RpcErrorCodes {
    static readonly ParseError: number;
    static readonly InvalidRequest: number;
    static readonly MethodNotFound: number;
    static readonly InvalidParams: number;
    static readonly UnknownError: number;
    static readonly NotAuthorized: number;
    static readonly AuthExpired: number;
    static readonly UnknownAuthError: number;
    static readonly AccessForbidden: number;
    static readonly PatientAlreadyMatched: number;
    static readonly PatientNotAuthenticated: number;
    static readonly PatientNotFound: number;
    static readonly SaveAuthInfoError: number;
    static readonly SaveExchangeTokenError: number;
    static readonly AppointmentNotFound: number;
    static readonly DiagnosticReportNotFound: number;
    static readonly UserNotFound: number;
    static readonly PrescriptionNotFound: number;
    static readonly PatientAlreadyLinked: number;
    static readonly AppointmentResultNotFound: number;
    static readonly LinkedPatientNotFound: number;
}
export declare function isAuthorizationError(err: any): boolean;
//# sourceMappingURL=RpcErrorCodes.d.ts.map