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
}

export function isAuthorizationError(err: any) {
    return err.code === RpcErrorCodes.NotAuthorized ||
        err.code === RpcErrorCodes.AuthExpired ||
        err.code === RpcErrorCodes.UnknownAuthError;
}