import { IAppointmentResultService } from "../AppointmentResultService";
import { AppointmentResultModel } from "../../models/AppointmentResultModel";
import { JsonRPCService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";

export class AppointmentResultService extends JsonRPCService implements IAppointmentResultService {
    

    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    public getAppointmentResultModelById(id: string, cb: (appointmentResult: AppointmentResultModel) => void): void {
        this.exec(Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD, {id: id}, (err: any, payload: object) => {
            if (err) throw new Error("failed to load appointment results (id="+id+"): " + err);
            let app = new AppointmentResultModel();
            app.fromJson(payload['appointmentResult']);
            cb(app);
        });
    }

    public getPatientAppointmentResults(patientId: string, limit: number, offset: number, 
            cb: (appointmentResults: AppointmentResultModel[]) => void): void {
        let params = {patientId: patientId, limit: limit, offset: offset};
        this.exec(Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD, params, (err: any, payload: object) => {
            if (err) throw new Error("failed to load patient appointment results (patientId="+patientId+"): " + err);
            let appointmentResults = payload['appointmentResults'].map((jsonApp: object) => {
                let app = new AppointmentResultModel();
                app.fromJson(jsonApp);
                return app;
            });
            cb(appointmentResults);
        });
    }

}