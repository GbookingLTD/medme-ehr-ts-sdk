import { JsonRPCCredService } from "./jsonRpcService";
import { IPatientService } from "../PatientService";
import { PatientModel } from "../../models/PatientModel";
import { UserSign } from "../../types/UserSign";
import { PatientMessage } from "../../messages/PatientMessage";
export declare class PatientService extends JsonRPCCredService implements IPatientService {
    getPatient(cb: (err?: any, patient?: PatientModel, userSign?: UserSign) => void): void;
    getPatientAsync(): Promise<{
        patient: PatientModel;
        userSign: UserSign;
    }>;
    getPatients(limit: number, offset: number, cb: (err: any, patients: PatientMessage[]) => void): void;
    getPatientsAsync(limit: number, offset: number): Promise<PatientMessage[]>;
    getPatientsCount(cb: (err: any, count: number, support: boolean) => void): void;
    getPatientsCountAsync(): Promise<{
        count: number;
        support: boolean;
    }>;
}
