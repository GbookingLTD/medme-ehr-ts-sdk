import { PatientModel } from "../models/PatientModel";

export class NotAuthenticatedError extends Error {
    constructor(message: string) {
        super(message);
        this.notAuthenticated = true;
    }
    notAuthenticated: boolean;
}

export interface IPatientService {

    getPatient(cb: (err?: any, patient?: PatientModel) => void): void;

}