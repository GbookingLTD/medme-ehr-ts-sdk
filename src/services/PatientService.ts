import { PatientModel } from "../models/PatientModel";

export interface IPatientService {

    getPatient(cb: (err?: any, patient?: PatientModel, userSign?: string) => void): void;

}