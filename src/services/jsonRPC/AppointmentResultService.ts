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
            if (err) throw new Error("failed to load appointment (id="+id+"): " + err);
            let app = new AppointmentResultModel();
            app.fromJson(payload['appointment']);
            cb(app);
        });
    }

}