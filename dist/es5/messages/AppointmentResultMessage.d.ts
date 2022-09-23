import { BusinessInfo, Doctor, Diagnosis, Procedure, PrescriptionInfo, PatientReportInfo, AttachmentInfo } from "../types/index";
export declare class AppointmentResultMessage {
    id: string;
    patientId: string;
    business: BusinessInfo;
    created: Date;
    start: Date;
    doctor: Doctor;
    duration: number;
    anamnesis: string[];
    medicalExaminationResult: string[];
    diagnosis: Diagnosis[];
    recommendations: Procedure[];
    scheduledProcedures: Procedure[];
    prescriptions: PrescriptionInfo[];
    diagnosticReportIds: string[];
    reportInfos?: PatientReportInfo[];
    attachments: AttachmentInfo[];
    appointmentId?: string;
    sourceAppointmentId?: string;
    sourceAppointmentResultId?: string;
}
//# sourceMappingURL=AppointmentResultMessage.d.ts.map