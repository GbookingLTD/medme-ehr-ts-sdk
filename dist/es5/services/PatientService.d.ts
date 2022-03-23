import { IResourceService } from "./ResourceService";
import { PatientModel } from "../models/PatientModel";
import { UserSign } from "../types/UserSign";
import { PatientMessage } from "../messages/PatientMessage";
import { PatientFilters } from "./filters/PatientFilters";
import { AppointmentFilters } from "./filters/AppointmentFilters";
import { DiagnosticReportFilters } from "./filters/DiagnosticReportFilters";
import { PrescriptionFilters } from "./filters/PrescriptionFilters";
import { AppointmentResultMessage } from "../messages/AppointmentResultMessage";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
import { PrescriptionMessage } from "../messages/PrescriptionMessage";
export interface IPatientService extends IResourceService {
    getPatient(cb: (err?: any, patient?: PatientModel, userSign?: UserSign) => void): void;
    getPatientAsync(): Promise<{
        patient: PatientModel;
        userSign: UserSign;
    }>;
    getPatientById(id: string, cb: (err?: any, patient?: PatientModel) => void): void;
    getPatientByIdAsync(id: string): Promise<{
        patient: PatientModel;
    }>;
    getPatients(limit: number, offset: number, lastId: string, cb: (err: any, patients: PatientMessage[]) => void): void;
    getPatientsAsync(limit: number, offset: number, lastId: string): Promise<PatientMessage[]>;
    getFilteredPatients(filters: PatientFilters, limit: number, offset: number, cb: (err: any, patients: PatientMessage[]) => void): void;
    getFilteredPatientsAsync(filters: PatientFilters, limit: number, offset: number): Promise<PatientMessage[]>;
    getPatientsCount(cb: (err: any, count: number, support: boolean) => void): void;
    getPatientsCountAsync(): Promise<{
        count: number;
        support: boolean;
    }>;
    searchPatientEhr(keywords: SearchPatientEhrKeywords, filters: SearchPatientEhrFilters, offsetPatientId: number, limit: number, cb: (err: any, result: SearchPatientEhrResultItem[]) => void): any;
    searchPatientEhrAsync(keywords: SearchPatientEhrKeywords, filters: SearchPatientEhrFilters, offsetPatientId: number, limit: number): Promise<SearchPatientEhrResultItem[]>;
    searchPatientEhrCount(keywords: SearchPatientEhrKeywords, filters: SearchPatientEhrFilters, cb: (err: any, count: number, support: boolean) => void): any;
    searchPatientEhrCountAsync(keywords: SearchPatientEhrKeywords, filters: SearchPatientEhrFilters): Promise<{
        count: number;
        support: boolean;
    }>;
}
export declare class SearchEntityKeywords {
    static createWithValues(i: string[], e: string[]): SearchEntityKeywords;
    includes: string[];
    excludes: string[];
}
export declare class SearchPatientEhrKeywords {
    patientKeywords: SearchEntityKeywords;
    appointmentResultKeywords: SearchEntityKeywords;
    diagnosticReportKeywords: SearchEntityKeywords;
    prescriptionKeywords: SearchEntityKeywords;
}
export declare class SearchPatientEhrFilters {
    patientFilters: PatientFilters;
    appointmentResultFilters: AppointmentFilters;
    diagnosticReportFilters: DiagnosticReportFilters;
    prescriptionFilters: PrescriptionFilters;
}
export declare class SearchPatientEhrResultItem {
    patient: PatientMessage;
    appointmentResults: AppointmentResultMessage[];
    diagnosticReports: DiagnosticReportMessage[];
    prescriptions: PrescriptionMessage[];
}
