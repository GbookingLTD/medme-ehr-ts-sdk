import { JsonRPCCredService } from "./jsonRpcService";
import { IPatientService, NotAuthenticatedError } from "../PatientService";
import { PatientInfo } from "../../types/PatientInfo";
import { Handlers } from "../../Handlers";
import { PatientModel } from "../../models/PatientModel";

export class PatientService extends JsonRPCCredService
        implements IPatientService {

    public getPatient(cb: (err?: any, patient?: PatientModel) => void): void {
        this.exec(Handlers.HANDLER_GET_PATIENT_METHOD, {}, (err: any, payload: object) => {
            if (err) throw new NotAuthenticatedError("failed to load patient by credentials");
            let patient = new PatientModel();
            patient.fromJson(payload['patient']);
            cb(patient);
        });
    }

}