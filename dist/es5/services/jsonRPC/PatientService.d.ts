import { JsonRPCCredService } from "./jsonRpcService";
import { IPatientService } from "../PatientService";
import { PatientModel } from "../../models/PatientModel";
import { UserSign } from "../../types/UserSign";
export declare class PatientService extends JsonRPCCredService implements IPatientService {
    getPatient(cb: (err?: any, patient?: PatientModel, userSign?: UserSign) => void): void;
}
