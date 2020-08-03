define(["require", "exports", "./xhr", "./AppointmentService", "./AppointmentResultService", "./PrescriptionService", "./DiagnosticReportService", "./AuthService", "./PatientService", "./jsonRpcRequest"], function (require, exports, xhr_1, AppointmentService_1, AppointmentResultService_1, PrescriptionService_1, DiagnosticReportService_1, AuthService_1, PatientService_1, jsonRpcRequest_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        Transports: {
            xhr: xhr_1.xhr
        },
        JsonRpcHeader: jsonRpcRequest_1.JsonRpcHeader,
        AppointmentService: AppointmentService_1.AppointmentService,
        AppointmentResultService: AppointmentResultService_1.AppointmentResultService,
        PrescriptionService: PrescriptionService_1.PrescriptionService,
        DiagnosticReportService: DiagnosticReportService_1.DiagnosticReportService,
        AuthService: AuthService_1.AuthService,
        PatientService: PatientService_1.PatientService
    };
});
