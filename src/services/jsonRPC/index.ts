import { xhr } from "./xhr";
import { AppointmentService } from "./AppointmentService";
import { AppointmentResultService } from "./AppointmentResultService";
import { PrescriptionService } from "./PrescriptionService";
import { DiagnosticReportService } from "./DiagnosticReportService";
import { AuthService } from "./AuthService";
import { PatientService } from "./PatientService";
import { JsonRpcHeader } from "./jsonRpcRequest";

export default {
  Transports: {
    xhr,
  },
  JsonRpcHeader,
  AppointmentService,
  AppointmentResultService,
  PrescriptionService,
  DiagnosticReportService,
  AuthService,
  PatientService,
};
