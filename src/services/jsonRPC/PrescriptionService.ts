import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
import { PrescriptionModel } from "../../models/PrescriptionModel";
import { IPrescriptionService } from "../PrescriptionService";

export class PrescriptionService extends JsonRPCCredService implements IPrescriptionService {
    

    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    public getPrescriptionById(id: string, cb: (err: any, p: PrescriptionModel) => void): void {
        this.exec(Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD, {id: id}, (err: any, payload: object) => {
            if (err) return cb(err, null);
            let app = new PrescriptionModel();
            this.lastValidationErrors_ = payload['validationErrors'];
            app.fromJson(payload['prescription']);
            cb(null, app);
        });
    }
    
    public getPrescriptionByIdAsync(id: string): Promise<PrescriptionModel> {
        const service = this;
        return new Promise((res, rej) => {
            service.getPrescriptionById(id, (err: any, pm: PrescriptionModel) => {
                if (err)
                    return rej(err);

                res(pm);
            });
        });
    }

    public getPatientPrescriptions(patientId: string, limit: number, offset: number, 
            cb: (err: any, p: PrescriptionModel[]) => void): void {
        let params = {patientId: patientId, limit: limit, offset: offset};
        this.exec(Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD, params, (err: any, payload: object) => {
            if (err) return cb(err, null);
            let prescriptions = payload['prescriptions'].map((jsonApp: object) => {
                let app = new PrescriptionModel();
                this.lastValidationErrorsOfList_ = payload['validationErrors'];
                app.fromJson(jsonApp);
                return app;
            });
            return cb(null, prescriptions);
        });
    }

    public getPatientPrescriptionsAsync(patientId: string, limit: number, offset: number): Promise<PrescriptionModel[]> {
        const service = this;
        return new Promise((res, rej) => {
            service.getPatientPrescriptions(patientId, limit, offset, (err: any, values: PrescriptionModel[]) => {
                if (err)
                    return rej(err);

                res(values);
            });
        });
    }
}