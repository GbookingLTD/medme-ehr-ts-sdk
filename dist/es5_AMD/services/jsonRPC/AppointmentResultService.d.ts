import { IAppointmentResultService } from "../AppointmentResultService";
import { AppointmentResultModel } from "../../models/AppointmentResultModel";
import { JsonRPCCredService } from "./jsonRpcService";
export declare class AppointmentResultService extends JsonRPCCredService implements IAppointmentResultService {
    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getAppointmentResultModelById(id: string, cb: (err: any, appointmentResult: AppointmentResultModel) => void): void;
    getPatientAppointmentResults(patientId: string, limit: number, offset: number, cb: (err: any, appointmentResults: AppointmentResultModel[]) => void): void;
}
