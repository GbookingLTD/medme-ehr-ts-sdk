import { IResourceService } from "./ResourceService";
import { PatientModel } from "../models/PatientModel";
import { UserSign } from "../types/UserSign";
import { PatientMessage } from "../messages/PatientMessage";
import { PatientFilters } from "./filters/PatientFilters";

export interface IPatientService extends IResourceService {
  getPatient(
    cb: (err?: any, patient?: PatientModel, userSign?: UserSign) => void
  ): void;
  getPatientAsync(): Promise<{ patient: PatientModel; userSign: UserSign }>;

  getPatientById(
    id: string,
    cb: (err?: any, patient?: PatientModel) => void
  ): void;
  getPatientByIdAsync(id: string): Promise<{ patient: PatientModel }>;

  getPatients(
    limit: number,
    offset: number,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void;
  getPatientsAsync(limit: number, offset: number): Promise<PatientMessage[]>;

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
}
