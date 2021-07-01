import {JsonRPCCredService} from "./jsonRpcService";
import {IPatientService} from "../PatientService";
import {PatientInfo} from "../../types/PatientInfo";
import {Handlers} from "../../Handlers";
import {PatientModel} from "../../models/PatientModel";
import {UserSign} from "../../types/UserSign";

export class PatientService extends JsonRPCCredService
    implements IPatientService {

    public getPatient(cb: (err?: any, patient?: PatientModel, userSign?: UserSign) => void): void {
        this.exec(Handlers.HANDLER_GET_PATIENT_METHOD, {}, (err: any, payload: object) => {
            if (err)
                return cb(err);

            if (!payload['userSign'])
                return cb(new Error("userSign not found"));

            let patient = new PatientModel();
            this.lastValidationErrors_ = payload['validationErrors'];
            patient.fromJson(payload['patient']);
            return cb(err, patient, payload['userSign']);
        });
    }

    public getPatientAsync(): Promise<{patient: PatientModel, userSign: UserSign}> {
        const service = this;
        return new Promise((res, rej) => {
            service.getPatient((err, patient, userSign) => {
                if (err)
                    return rej(err);

                res({patient, userSign});
            })
        });
    }
}