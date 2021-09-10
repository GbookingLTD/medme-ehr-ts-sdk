import { IResourceService } from "./ResourceService";
import { AppointmentResultModel } from "../models/AppointmentResultModel";
import { AppointmentResultMessage } from "../messages/AppointmentResultMessage";
export interface IAppointmentResultService extends IResourceService {
    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getAppointmentResultById(id: string, cb: (err: any, appointmentResult: AppointmentResultMessage) => void): void;
    getAppointmentResultByIdAsync(id: string): Promise<AppointmentResultMessage>;
    /**
     * Возвращает список результатов приема пациента.
     * @param patientId идентификатор пациента
     * @param limit максимальное количество записей, которое нужно вернуть
     * @param offset смещение относительно начала списка записей
     * @param cb callback
     */
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
