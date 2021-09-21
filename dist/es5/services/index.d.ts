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
        BusinessInfoService: typeof import("./jsonRPC/BusinessInfoService").BusinessInfoService;
    };
    PatientAuthenticationResult: typeof PatientAuthenticationResult;
    PatientAuthenticationStep: typeof PatientAuthenticationStep;
    PatientAuthenticationError: typeof PatientAuthenticationError;
    ConnectionError: typeof ConnectionError;
    getAuthenticatedPatient: typeof getAuthenticatedPatient;
    Credentials: typeof Credentials;
    RpcErrorCodes: typeof RpcErrorCodes;
    Filters: {
        PatientByNameFilter: typeof import("./filters/PatientFilters").PatientByNameFilter;
        PatientByMedCardFilter: typeof import("./filters/PatientFilters").PatientByMedCardFilter;
        PatientByPhoneFilter: typeof import("./filters/PatientFilters").PatientByPhoneFilter;
        PatientFilters: typeof import("./filters/PatientFilters").PatientFilters;
        AppointmentByBusinessIdFilter: typeof import("./filters/AppointmentFilters").AppointmentByBusinessIdFilter;
        AppointmentByCreatedFilter: typeof import("./filters/AppointmentFilters").AppointmentByCreatedFilter;
        AppointmentByStartFilter: typeof import("./filters/AppointmentFilters").AppointmentByStartFilter;
        AppointmentByPatientIdFilter: typeof import("./filters/AppointmentFilters").AppointmentByPatientIdFilter;
        AppointmentFilters: typeof import("./filters/AppointmentFilters").AppointmentFilters;
        DiagnosticReportByBusinessIdFilter: typeof import("./filters/DiagnosticReportFilters").DiagnosticReportByBusinessIdFilter;
        DiagnosticReportByCreatedFilter: typeof import("./filters/DiagnosticReportFilters").DiagnosticReportByCreatedFilter;
        DiagnosticReportByPatientIdFilter: typeof import("./filters/DiagnosticReportFilters").DiagnosticReportByPatientIdFilter;
        DiagnosticReportFilters: typeof import("./filters/DiagnosticReportFilters").DiagnosticReportFilters;
        PrescriptionByBusinessIdFilter: typeof import("./filters/PrescriptionFilters").PrescriptionByBusinessIdFilter;
        PrescriptionByCreatedFilter: typeof import("./filters/PrescriptionFilters").PrescriptionByCreatedFilter;
        PrescriptionByPatientIdFilter: typeof import("./filters/PrescriptionFilters").PrescriptionByPatientIdFilter;
        PrescriptionFilters: typeof import("./filters/PrescriptionFilters").PrescriptionFilters;
    };
};
export default _default;
