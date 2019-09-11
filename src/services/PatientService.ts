import { PatientModel } from "../models/PatientModel";
import {UserSign} from "../types/UserSign";

export interface IPatientService {

    getPatient(cb: (err?: any, patient?: PatientModel, userSign?: UserSign) => void): void;

}