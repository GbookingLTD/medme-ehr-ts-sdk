import { IAppointmentResultService } from "../AppointmentResultService";
import { AppointmentResultModel } from "../../models/AppointmentResultModel";
import { JsonRPCCredService } from "./jsonRpcService";
export declare class AppointmentResultService extends JsonRPCCredService implements IAppointmentResultService {
    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getAppointmentResultById(id: string, cb: (err: any, appointmentResult: AppointmentResultModel) => void): void;
    getAppointmentResultByIdAsync(id: string): Promise<AppointmentResultModel>;
    getPatientAppointmentResults(patientId: string, limit: number, offset: number, cb: (err: any, appointmentResults: AppointmentResultModel[]) => void): void;
    getPatientAppointmentResultsAsync(patientId: string, limit: number, offset: number): Promise<AppointmentResultModel[]>;
}
