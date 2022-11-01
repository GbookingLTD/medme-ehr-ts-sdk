import { IResourceService } from "./ResourceService";
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
  getPatient(
    cb: (err?: any, patient?: PatientMessage, userSign?: UserSign) => void
  ): void;
  getPatientAsync(): Promise<{ patient: PatientMessage; userSign: UserSign }>;

  getPatientById(
    id: string,
    cb: (err?: any, patient?: PatientMessage) => void
  ): void;
  getPatientByIdAsync(id: string): Promise<{ patient: PatientMessage }>;

  getPatients(
    limit: number,
    offset: number,
    lastId: string,
    prevCreated: string,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void;
  getPatientsAsync(
    limit: number,
    offset: number,
    lastId: string,
    prevCreated: string
  ): Promise<PatientMessage[]>;

  getFilteredPatients(
    filters: PatientFilters,
    limit: number,
    offset: number,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void;
  getFilteredPatientsAsync(
    filters: PatientFilters,
    limit: number,
    offset: number
  ): Promise<PatientMessage[]>;

  getPatientsCount(
    cb: (err: any, count: number, support: boolean) => void
  ): void;
  getPatientsCountAsync(): Promise<{ count: number; support: boolean }>;

  findPatientsByPhone(
    phone: string,
    limit: number,
    offset: number,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void;
  findPatientsByPhoneAsync(
    phone: string,
    limit: number,
    offset: number
  ): Promise<PatientMessage[]>;

  findPatientsByMedCard(
    medCard: string,
    limit: number,
    offset: number,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void;
  findPatientsByMedCardAsync(
    medCard: string,
    limit: number,
    offset: number
  ): Promise<PatientMessage[]>;

  searchPatientEhr(
    keywords: SearchPatientEhrKeywords,
    filters: SearchPatientEhrFilters,
    offsetPatientId: number,
    limit: number,
    cb: (err: any, result: SearchPatientEhrResultItem[]) => void
  );
  searchPatientEhrAsync(
    keywords: SearchPatientEhrKeywords,
    filters: SearchPatientEhrFilters,
    offsetPatientId: number,
    limit: number
  ): Promise<SearchPatientEhrResultItem[]>;

  searchPatientEhrCount(
    keywords: SearchPatientEhrKeywords,
    filters: SearchPatientEhrFilters,
    cb: (err: any, count: number, support: boolean) => void
  );
  searchPatientEhrCountAsync(
    keywords: SearchPatientEhrKeywords,
    filters: SearchPatientEhrFilters
  ): Promise<{ count: number; support: boolean }>;
}

export class SearchEntityKeywords {
  public static createWithValues(
    i: string[],
    e: string[]
  ): SearchEntityKeywords {
    const kw = new SearchEntityKeywords();
    kw.includes = i;
    kw.excludes = e;
    return kw;
  }
  public includes: string[];
  public excludes: string[];
}

export class SearchPatientEhrKeywords {
  public patientKeywords: SearchEntityKeywords;
  public appointmentResultKeywords: SearchEntityKeywords;
  public diagnosticReportKeywords: SearchEntityKeywords;
  public prescriptionKeywords: SearchEntityKeywords;
}

export class SearchPatientEhrFilters {
  public patientFilters: PatientFilters;
  public appointmentResultFilters: AppointmentFilters;
  public diagnosticReportFilters: DiagnosticReportFilters;
  public prescriptionFilters: PrescriptionFilters;
}

export class SearchPatientEhrResultItem {
  public patient: PatientMessage;
  public appointmentResults: AppointmentResultMessage[];
  public diagnosticReports: DiagnosticReportMessage[];
  public prescriptions: PrescriptionMessage[];
}
