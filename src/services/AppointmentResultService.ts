import { AppointmentResultModel } from "../models/AppointmentResultModel";

export interface IAppointmentResultService {

    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getAppointmentResultModelById(id: string, cb: (appointmentResult: AppointmentResultModel) => void): void;

    /**
     * Возвращает список результатов приема пациента.
     * @param patientId идентификатор пациента
     * @param limit максимальное количество записей, которое нужно вернуть
     * @param offset смещение относительно начала списка записей
     * @param cb callback
     */
    getPatientAppointmentResults(patientId: string, limit: number, offset: number, 
        cb: (err: any, appointmentResults: AppointmentResultModel[]) => void): void;
}
