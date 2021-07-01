import { IResourceService } from './ResourceService';
import { AppointmentModel } from "../models/AppointmentModel";
export interface IAppointmentService extends IResourceService {
    /**
     * Возвращает запись по идентификатору.
     * @param id идентификатор записи
     * @param cb callback
     */
    getAppointmentById(id: string, cb: (err: any, appointment: AppointmentModel) => void): void;
    getAppointmentByIdAsync(id: string): Promise<AppointmentModel>;
    /**
     * Возвращает список записей пациента.
     * @param patientId идентификатор пациента
     * @param limit максимальное количество записей, которое нужно вернуть
     * @param offset смещение относительно начала списка записей
     * @param cb callback
     */
    getPatientAppointments(patientId: string, limit: number, offset: number, cb: (err: any, appointments: AppointmentModel[]) => void): void;
    getPatientAppointmentsAsync(patientId: string, limit: number, offset: number): Promise<AppointmentModel[]>;
}
