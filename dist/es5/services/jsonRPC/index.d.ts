import { AppointmentService } from "./AppointmentService";
import { AppointmentResultService } from "./AppointmentResultService";
import { PrescriptionService } from "./PrescriptionService";
import { DiagnosticReportService } from "./DiagnosticReportService";
import { AuthService } from "./AuthService";
import { PatientService } from "./PatientService";
import { JsonRpcHeader } from "./jsonRpcRequest";
declare const _default: {
    Transports: {
        xhr: import("./jsonRpcRequest").IJsonRPCRequest;
    };
    JsonRpcHeader: typeof JsonRpcHeader;
    AppointmentService: typeof AppointmentService;
    AppointmentResultService: typeof AppointmentResultService;
    PrescriptionService: typeof PrescriptionService;
    DiagnosticReportService: typeof DiagnosticReportService;
    AuthService: typeof AuthService;
    PatientService: typeof PatientService;
};
export default _default;
