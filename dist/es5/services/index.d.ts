import { PatientAuthenticationResult, PatientAuthenticationStep, PatientAuthenticationError, getAuthenticatedPatient, ConnectionError } from "./AuthService";
import { Credentials } from "./Credentials";
import { RpcErrorCodes } from "./RpcErrorCodes";
declare const _default: {
    JsonRPC: {
        Transports: {
            xhr: import("./jsonRPC/jsonRpcRequest").IJsonRPCRequest;
        };
        JsonRpcHeader: typeof import("./jsonRPC/jsonRpcRequest").JsonRpcHeader;
        AppointmentService: typeof import("./jsonRPC/AppointmentService").AppointmentService;
        AppointmentResultService: typeof import("./jsonRPC/AppointmentResultService").AppointmentResultService;
        PrescriptionService: typeof import("./jsonRPC/PrescriptionService").PrescriptionService;
        DiagnosticReportService: typeof import("./jsonRPC/DiagnosticReportService").DiagnosticReportService;
        AuthService: typeof import("./jsonRPC/AuthService").AuthService;
        PatientService: typeof import("./jsonRPC/PatientService").PatientService;
    };
    PatientAuthenticationResult: typeof PatientAuthenticationResult;
    PatientAuthenticationStep: typeof PatientAuthenticationStep;
    PatientAuthenticationError: typeof PatientAuthenticationError;
    ConnectionError: typeof ConnectionError;
    getAuthenticatedPatient: typeof getAuthenticatedPatient;
    Credentials: typeof Credentials;
    RpcErrorCodes: typeof RpcErrorCodes;
};
export default _default;
