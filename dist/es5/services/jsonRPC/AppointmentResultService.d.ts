import { IAppointmentResultService } from "../AppointmentResultService";
import { AppointmentResultModel } from "../../models/AppointmentResultModel";
import { JsonRPCCredService } from "./jsonRpcService";
import { AppointmentResultMessage } from "../../messages/AppointmentResultMessage";
export declare class AppointmentResultService extends JsonRPCCredService implements IAppointmentResultService {
    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getAppointmentResultById(id: string, cb: (err: any, appointmentResult: AppointmentResultMessage) => void): void;
    getAppointmentResultByIdAsync(id: string): Promise<AppointmentResultMessage>;
    getPatientAppointmentResults(patientId: string, limit: number, offset: number, cb: (err: any, appointmentResults: AppointmentResultModel[]) => void): void;
    getPatientAppointmentResultsAsync(patientId: string, limit: number, offset: number): Promise<AppointmentResultModel[]>;
    getAppointmentResults(limit: number, offset: number, cb: (err: any, appointmentResults: AppointmentResultModel[]) => void): void;
    getAppointmentResultsAsync(limit: number, offset: number): Promise<AppointmentResultModel[]>;
    getAppointmentResultsCount(cb: (err: any, count: number, support: boolean) => void): void;
    getAppointmentResultsCountAsync(): Promise<{
        count: number;
        support: boolean;
    }>;
    getPatientAppointmentResultsCount(patientId: string, cb: (err: any, count: number, support: boolean) => void): void;
    getPatientAppointmentResultsCountAsync(patientId: string): Promise<{
        count: number;
        support: boolean;
    }>;
}
