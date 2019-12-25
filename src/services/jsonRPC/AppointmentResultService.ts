import { IAppointmentResultService } from "../AppointmentResultService";
import { AppointmentResultModel } from "../../models/AppointmentResultModel";
import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";

export class AppointmentResultService extends JsonRPCCredService implements IAppointmentResultService {
    

    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    public getAppointmentResultModelById(id: string, cb: (err: any, appointmentResult: AppointmentResultModel) => void): void {
        this.exec(Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD, {id: id}, (err: any, payload: object) => {
            if (err) return cb(err, null);
            let app = new AppointmentResultModel();
            this.lastValidationErrors_ = payload['validationErrors'];
            app.fromJson(payload['appointmentResult']);
            return cb(null, app);
        });
    }

    public getPatientAppointmentResults(patientId: string, limit: number, offset: number, 
            cb: (err: any, appointmentResults: AppointmentResultModel[]) => void): void {
        let params = {patientId: patientId, limit: limit, offset: offset};
        this.exec(Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD, params, (err: any, payload: object) => {
            if (err) return cb(err, null);
            this.lastValidationErrorsOfList_ = payload['validationErrors'];
            let appointmentResults = payload['appointmentResults'].map((jsonApp: object) => {
                let app = new AppointmentResultModel();
                app.fromJson(jsonApp);
                return app;
            });
            return cb(null, appointmentResults);
        });
    }

}