import {JsonRPCCredService} from "./jsonRpcService";
import {IPatientService, NotAuthenticatedError} from "../PatientService";
import {PatientInfo} from "../../types/PatientInfo";
import {Handlers} from "../../Handlers";
import {PatientModel} from "../../models/PatientModel";
import {RpcErrorCodes} from "./RpcErrorCodes";

export class PatientService extends JsonRPCCredService
    implements IPatientService {

    public getPatient(cb: (err?: any, patient?: PatientModel) => void): void {
        this.exec(Handlers.HANDLER_GET_PATIENT_METHOD, {}, (err: any, payload: object) => {
            if (err) {
                if (err.code === RpcErrorCodes.NotAuthenticated)
                    cb(new NotAuthenticatedError(err.message))
                else
                    cb(err)
            } else {
                let patient = new PatientModel();
                patient.fromJson(payload['patient']);
                cb(err, patient);
            }
        });
    }
}