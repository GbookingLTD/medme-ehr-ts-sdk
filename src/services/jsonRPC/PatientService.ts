import {JsonRPCCredService} from "./jsonRpcService";
import {IPatientService} from "../PatientService";
import {PatientInfo} from "../../types/PatientInfo";
import {Handlers} from "../../Handlers";
import {PatientModel} from "../../models/PatientModel";

export class PatientService extends JsonRPCCredService
    implements IPatientService {

    public getPatient(cb: (err?: any, patient?: PatientModel, userSign?: string) => void): void {
        this.exec(Handlers.HANDLER_GET_PATIENT_METHOD, {}, (err: any, payload: object) => {
            if (err)
                return cb(err);

            if (!payload['userSign'])
                return cb(new Error("userSign not found"));

            let patient = new PatientModel();
            patient.fromJson(payload['patient']);
            cb(err, patient, payload['userSign']);
        });
    }
}