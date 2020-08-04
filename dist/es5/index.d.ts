/// <amd-module name="MedMe" />
import * as Types from './types/index';
import { Handlers } from './Handlers';
export declare const EHR: {
    SDK_VERSION: string;
    Types: typeof Types;
    Models: {
        AppointmentModel: typeof import("./models/AppointmentModel").AppointmentModel;
    };
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
        };
        PatientAuthenticationResult: typeof import("./services/AuthService").PatientAuthenticationResult;
        PatientAuthenticationStep: typeof import("./services/AuthService").PatientAuthenticationStep;
        PatientAuthenticationError: typeof import("./services/AuthService").PatientAuthenticationError;
        ConnectionError: typeof import("./services/AuthService").ConnectionError;
        getAuthenticatedPatient: typeof import("./services/AuthService").getAuthenticatedPatient;
        Credentials: typeof import("./services/Credentials").Credentials;
        RpcErrorCodes: typeof import("./services/RpcErrorCodes").RpcErrorCodes;
    };
    Formatters: {
        SimpleTextFormatter: typeof import("./formatters/SimpleTextFormatter").SimpleTextFormatter;
    };
    Handlers: typeof Handlers;
};
