import { AppointmentResultModel } from "../models/AppointmentResultModel";

export interface IAppointmentResultService {

    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getAppointmentResultModelById(id: string, cb: (appointmentResult: AppointmentResultModel) => void): void;
}
