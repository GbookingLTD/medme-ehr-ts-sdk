import { xhr } from "./xhr";
import { AppointmentService } from './AppointmentService';
import { AppointmentResultService } from "./AppointmentResultService";
import { PrescriptionService } from "./PrescriptionService";
import { DiagnosticReportService } from "./DiagnosticReportService";

export default {
    Transports: {
        xhr
    },
    AppointmentService,
    AppointmentResultService,
    PrescriptionService,
    DiagnosticReportService
};