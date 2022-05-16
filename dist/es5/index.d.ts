/// <amd-module name="MedMe" />
import * as Types from "./types/index";
import { Handlers } from "./Handlers";
import * as Interfaces from "./interfaces/index";
export declare const EHR: {
    SDK_VERSION: string;
    Types: typeof Types;
    Services: {
        JsonRPC: {
            Transports: {
                xhr: import("./services/jsonRPC/jsonRpcRequest").IJsonRPCRequest;
            };
            JsonRpcHeader: typeof import("./services/jsonRPC/jsonRpcRequest").JsonRpcHeader;
            AppointmentService: typeof import("./services/jsonRPC/AppointmentService").AppointmentService;
            AppointmentResultService: typeof import("./services/jsonRPC/AppointmentResultService").AppointmentResultService;
            PrescriptionService: typeof import("./services/jsonRPC/PrescriptionService").PrescriptionService;
            DiagnosticReportService: typeof import("./services/jsonRPC/DiagnosticReportService").DiagnosticReportService;
            AuthService: typeof import("./services/jsonRPC/AuthService").AuthService;
            PatientService: typeof import("./services/jsonRPC/PatientService").PatientService;
            BusinessInfoService: typeof import("./services/jsonRPC/BusinessInfoService").BusinessInfoService;
        };
        PatientAuthenticationResult: typeof import("./services/AuthService").PatientAuthenticationResult;
        PatientAuthenticationStep: typeof import("./services/AuthService").PatientAuthenticationStep;
        PatientAuthenticationError: typeof import("./services/AuthService").PatientAuthenticationError;
        ConnectionError: typeof import("./services/AuthService").ConnectionError;
        getAuthenticatedPatient: typeof import("./services/AuthService").getAuthenticatedPatient;
        getAuthenticatedPatientByExchangeToken: typeof import("./services/AuthService").getAuthenticatedPatientByExchangeToken;
        Credentials: typeof import("./services/Credentials").Credentials;
        RpcErrorCodes: typeof import("./services/RpcErrorCodes").RpcErrorCodes;
        Filters: {
            PatientByNameFilter: typeof import("./services/filters/PatientFilters").PatientByNameFilter;
            PatientByMedCardFilter: typeof import("./services/filters/PatientFilters").PatientByMedCardFilter;
            PatientByPhoneFilter: typeof import("./services/filters/PatientFilters").PatientByPhoneFilter;
            PatientFilters: typeof import("./services/filters/PatientFilters").PatientFilters;
            AppointmentByBusinessIdFilter: typeof import("./services/filters/AppointmentFilters").AppointmentByBusinessIdFilter;
            AppointmentByCreatedFilter: typeof import("./services/filters/AppointmentFilters").AppointmentByCreatedFilter;
            AppointmentByStartFilter: typeof import("./services/filters/AppointmentFilters").AppointmentByStartFilter;
            AppointmentByPatientIdFilter: typeof import("./services/filters/AppointmentFilters").AppointmentByPatientIdFilter;
            AppointmentFilters: typeof import("./services/filters/AppointmentFilters").AppointmentFilters;
            DiagnosticReportByBusinessIdFilter: typeof import("./services/filters/DiagnosticReportFilters").DiagnosticReportByBusinessIdFilter;
            DiagnosticReportByCreatedFilter: typeof import("./services/filters/DiagnosticReportFilters").DiagnosticReportByCreatedFilter;
            DiagnosticReportByPatientIdFilter: typeof import("./services/filters/DiagnosticReportFilters").DiagnosticReportByPatientIdFilter;
            DiagnosticReportFilters: typeof import("./services/filters/DiagnosticReportFilters").DiagnosticReportFilters;
            PrescriptionByBusinessIdFilter: typeof import("./services/filters/PrescriptionFilters").PrescriptionByBusinessIdFilter;
            PrescriptionByCreatedFilter: typeof import("./services/filters/PrescriptionFilters").PrescriptionByCreatedFilter;
            PrescriptionByPatientIdFilter: typeof import("./services/filters/PrescriptionFilters").PrescriptionByPatientIdFilter;
            PrescriptionFilters: typeof import("./services/filters/PrescriptionFilters").PrescriptionFilters;
        };
        SearchEntityKeywords: typeof import("./services/PatientService").SearchEntityKeywords;
        SearchPatientEhrKeywords: typeof import("./services/PatientService").SearchPatientEhrKeywords;
        SearchPatientEhrFilters: typeof import("./services/PatientService").SearchPatientEhrFilters;
        SearchPatientEhrResultItem: typeof import("./services/PatientService").SearchPatientEhrResultItem;
    };
    Formatters: {
        LocaleCode: typeof import("./formatters/LocaleCode").LocaleCode;
        SimpleTextFormatter: typeof import("./formatters/SimpleTextFormatter").SimpleTextFormatter;
        SimpleTextFormatterV2: typeof import("./formatters/SimpleTextFormatterV2").SimpleTextFormatterV2;
        FieldsFormatter: typeof import("./formatters/FieldsFormatter").FieldsFormatter;
    };
    Handlers: typeof Handlers;
    Messages: {
        AppointmentMessage: typeof import("./messages/AppointmentMessage").AppointmentMessage;
    };
    Interfaces: typeof Interfaces;
};
//# sourceMappingURL=index.d.ts.map