import { DateFormatFunc, IFormatter, LocaleCode } from "./Formatter";
import { AppointmentResultMessage } from "../messages/AppointmentResultMessage";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
import { Diagnosis, Procedure, PrescriptionInfo, Medication, Period } from "../types/index";
import { Observation } from "../types/Observation";
export declare enum FieldType {
    Text = "text",
    List = "list",
    FieldList = "fieldList",
    Date = "date",
    DateTime = "dateTime"
}
declare type FieldValue = string | Field[] | Date | string[];
export declare class Field {
    key: string;
    title: string;
    type: FieldType;
    value: FieldValue;
}
export declare class FieldsFormatter implements IFormatter<Field[]> {
    static LOCALIZE: {
        "ru-ru": {
            MINUTE_UNIT: string;
            YES: string;
            NO: string;
            CREATED: string;
            appointmentResult: {
                created: string;
                start: string;
                doctor: string;
                duration: string;
                anamnesis: string;
                medicalExaminationResult: string;
                diagnosis: string;
                recommendations: string;
                scheduledProcedures: string;
                prescriptions: string;
            };
            procedure: {
                created: string;
                title: string;
                services: string;
                type: string;
                required: string;
                status: string;
                period: string;
                strictPeriod: string;
                preparations: string;
                requiredPreparations: string;
            };
            procedureType: string[];
            ProcedureExecStatus: string[];
            Period: {
                begin: string;
                end: string;
            };
            DiagnosticReport: {
                Doctor: string;
                EffectivePeriod: string;
                Result: string;
                Images: string;
                Attachments: string;
            };
            Prescription: {
                title: string;
                created: string;
                recorderDoctor: string;
                medications: string;
                dosageText: string;
                reasonText: string;
                validityPeriod: string;
                numberOfRepeats: string;
            };
            MedicationForm: {
                0: string;
                1: string;
                2: string;
            };
        };
        "en-us": {
            MINUTE_UNIT: string;
            YES: string;
            NO: string;
            CREATED: string;
            appointmentResult: {
                created: string;
                start: string;
                doctor: string;
                duration: string;
                anamnesis: string;
                medicalExaminationResult: string;
                diagnosis: string;
                recommendations: string;
                scheduledProcedures: string;
                prescriptions: string;
            };
            procedure: {
                created: string;
                title: string;
                services: string;
                type: string;
                required: string;
                status: string;
                period: string;
                strictPeriod: string;
                preparations: string;
                requiredPreparations: string;
            };
            procedureType: string[];
            ProcedureExecStatus: string[];
            Period: {
                begin: string;
                end: string;
            };
            DiagnosticReport: {
                Doctor: string;
                EffectivePeriod: string;
                Result: string;
                Images: string;
                Attachments: string;
            };
            Prescription: {
                title: string;
                created: string;
                recorderDoctor: string;
                medications: string;
                dosageText: string;
                reasonText: string;
                validityPeriod: string;
                numberOfRepeats: string;
            };
            MedicationForm: {
                0: string;
                1: string;
                2: string;
            };
        };
    };
    static create(locale: LocaleCode, dateFormat?: DateFormatFunc): FieldsFormatter;
    private _localize;
    private _dateFormat;
    constructor(localize: object, dateFormat?: DateFormatFunc);
    appointmentResult(ar: AppointmentResultMessage): Field[];
    diagnosis(d: Diagnosis[]): Field[];
    procedure(p: Procedure): Field[];
    procedures(p: Procedure[]): Field[];
    prescriptions(p: PrescriptionInfo[]): string;
    prescription(p: PrescriptionInfo): Field[];
    medications(s: Medication[]): string;
    medication(s: Medication): Field[];
    diagnosticReport(dr: DiagnosticReportMessage): Field[];
    observation(o: Observation): Field[];
    anamnesis(a: string[]): string;
    duration(n: number): string;
    private doctor;
    private yesNo;
    medicalExaminationResult(ar: string[], offset: string): string;
    period(period: Period, offset: string): string;
}
export {};
