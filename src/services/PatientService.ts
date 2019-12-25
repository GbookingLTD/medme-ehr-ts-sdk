import { IResourceService } from './ResourceService';
import { PatientModel } from "../models/PatientModel";
import {UserSign} from "../types/UserSign";

export interface IPatientService extends IResourceService {

    getPatient(cb: (err?: any, patient?: PatientModel, userSign?: UserSign) => void): void;

}