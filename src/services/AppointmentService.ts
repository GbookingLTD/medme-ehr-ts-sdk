import { IResourceService } from './ResourceService';
import { AppointmentModel } from "../models/AppointmentModel";
import { AppointmentInputProperties } from "../types/AppointmentInputProperties";

export interface IAppointmentService extends IResourceService {

    /**
     * Возвращает запись по идентификатору.
     * @param id идентификатор записи
     * @param cb callback
     */
    getAppointmentModelById(id: string, cb: (err: any, appointment: AppointmentModel) => void): void;

    /**
     * Сохраняет данные записи.
     * @param appointment модель записи
     */
    saveAppointment(appointment: AppointmentInputProperties, cb: (appointmentId: string) => void): void;

    /**
     * Возвращает список записей пациента.
     * @param patientId идентификатор пациента
     * @param limit максимальное количество записей, которое нужно вернуть
     * @param offset смещение относительно начала списка записей
     * @param cb callback
     */
    getPatientAppointments(patientId: string, limit: number, offset: number, 
        cb: (err: any, appointments: AppointmentModel[]) => void): void;
}