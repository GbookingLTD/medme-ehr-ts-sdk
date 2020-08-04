import { AppointmentResultModel } from "../models/AppointmentResultModel";
import { Doctor } from "../types/Doctor";
import { Diagnosis } from "../types/Diagnosis";
import { Procedure } from "../types/Procedure";
import { PrescriptionInfo } from "../types/PrescriptionInfo";
import { Service } from "../types/Service";
import { ProcedureType } from "../types/ProcedureType";
import { ProcedureExecStatus } from "../types/ProcedureExecStatus";
import { Period } from "../types/Period";
import { DiagnosticReportModel } from "../models/DiagnosticReportModel";
import { Observation } from "../types/Observation";
import { Medication } from "../types/Medication";
export declare type DateFormatFunc = (d: Date) => string;
export declare class SimpleTextFormatter {
    static LOCALIZE: {
        "ru-ru": {
            "MINUTE_UNIT": string;
            "YES": string;
            "NO": string;
            "CREATED": string;
            "appointmentResult": {
                "created": string;
                "start": string;
                "doctor": string;
                "duration": string;
                "anamnesis": string;
                "medicalExaminationResult": string;
                "diagnosis": string;
                "recommendations": string;
                "scheduledProcedures": string;
                "prescriptions": string;
            };
            "procedure": {
                "created": string;
                "title": string;
                "services": string;
                "type": string;
                "required": string;
                "status": string;
                "period": string;
                "strictPeriod": string;
                "preparations": string;
                "requiredPreparations": string;
            };
            "procedureType": string[];
            "ProcedureExecStatus": string[];
            "Period": {
                "begin": string;
                "end": string;
            };
            "DiagnosticReport": {
                "Doctor": string;
                "EffectivePeriod": string;
                "Result": string;
                "Images": string;
                "Attachments": string;
            };
            "Prescription": {
                "title": string;
                "created": string;
                "recorderDoctor": string;
                "medications": string;
                "dosageText": string;
                "reasonText": string;
                "validityPeriod": string;
                "numberOfRepeats": string;
            };
            "MedicationForm": {
                0: string;
                1: string;
                2: string;
            };
        };
        "en-us": {
            "MINUTE_UNIT": string;
            "YES": string;
            "NO": string;
            "CREATED": string;
            "appointmentResult": {
                "created": string;
                "start": string;
                "doctor": string;
                "duration": string;
                "anamnesis": string;
                "medicalExaminationResult": string;
                "diagnosis": string;
                "recommendations": string;
                "scheduledProcedures": string;
                "prescriptions": string;
            };
            "procedure": {
                "created": string;
                "title": string;
                "services": string;
                "type": string;
                "required": string;
                "status": string;
                "period": string;
                "strictPeriod": string;
                "preparations": string;
                "requiredPreparations": string;
            };
            "procedureType": string[];
            "ProcedureExecStatus": string[];
            "Period": {
                "begin": string;
                "end": string;
            };
            "DiagnosticReport": {
                "Doctor": string;
                "EffectivePeriod": string;
                "Result": string;
                "Images": string;
                "Attachments": string;
            };
            "Prescription": {
                "title": string;
                "created": string;
                "recorderDoctor": string;
                "medications": string;
                "dosageText": string;
                "reasonText": string;
                "validityPeriod": string;
                "numberOfRepeats": string;
            };
            "MedicationForm": {
                0: string;
                1: string;
                2: string;
            };
        };
    };
    private _localize;
    private _dateFormat;
    constructor(localize: object, dateFormat?: DateFormatFunc);
    appointmentResult(ar: AppointmentResultModel, offset?: string): string;
    medicalExaminationResult(ar: string[], offset: string): string;
    anamnesis(ar: string[], offset: string): string;
    duration(n: number): string;
    doctor(d: Doctor, offset?: string): string;
    diagnosis(d: Diagnosis[], offset: string): string;
    procedures(p: Procedure[], offset: string): string;
    procedure(p: Procedure, offset: string): string;
    yesNo(b: boolean, offset: string): string;
    prescriptions(p: PrescriptionInfo[], offset: string): string;
    prescription(p: PrescriptionInfo, offset: string): string;
    medications(s: Medication[], offset: string): string;
    medication(s: Medication, offset: string): string;
    services(s: Service[], offset: string): string;
    service(s: Service, offset: string): string;
    procedureType(type: ProcedureType): string;
    procedureExecStatus(status: ProcedureExecStatus): string;
    period(period: Period, offset: string): string;
    diagnosticReport(dr: DiagnosticReportModel, offset?: string): string;
    diagnosticReportTitle(dr: DiagnosticReportModel): string;
    observations(o: Observation[], offset: string): string;
    observation(o: Observation, offset: string): string;
}
