import { AppointmentResultMessage } from "../messages/AppointmentResultMessage";
import { Diagnosis } from "../types/Diagnosis";
import { Procedure } from "../types/Procedure";
import { PrescriptionInfo } from "../types/PrescriptionInfo";
import { Medication } from "../types/Medication";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
import { Observation } from "../types/Observation";
export declare type DateFormatFunc = (d: Date) => string;
export declare enum LocaleCode {
    ruRU = "ru-ru",
    enUS = "en-US"
}
export declare const dateISOFormat: DateFormatFunc;
export declare function paragrathes(a: string[]): string;
export declare function paragrathes_nl(a: string[], offset: string): string;
export declare const trim: (str: any) => any;
export interface IFormatter<T> {
    appointmentResult(ar: AppointmentResultMessage): T;
    diagnosis(d: Diagnosis[]): T;
    procedure(p: Procedure): T;
    prescription(p: PrescriptionInfo): T;
    medication(s: Medication): T;
    diagnosticReport(dr: DiagnosticReportMessage): T;
    observation(o: Observation): T;
}
