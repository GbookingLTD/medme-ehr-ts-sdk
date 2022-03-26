import { IResourceService } from "./ResourceService";
import { AppointmentMessage } from "../messages/AppointmentMessage";
import { AppointmentFilters } from "./filters/AppointmentFilters";

export interface IAppointmentService extends IResourceService {
  /**
   * Возвращает запись по идентификатору.
   * @param id идентификатор записи
   * @param cb callback
   */
  getAppointmentById(
    id: string,
    cb: (err: any, appointment: AppointmentMessage) => void
  ): void;
  getAppointmentByIdAsync(id: string): Promise<AppointmentMessage>;

  /**
   * Возвращает список записей пациента.
   * @param patientId идентификатор пациента
   * @param limit максимальное количество записей, которое нужно вернуть
   * @param offset смещение относительно начала списка записей
   * @param cb callback
   */
  getPatientAppointments(
    patientId: string,
    limit: number,
    offset: number,
    cb: (err: any, appointments: AppointmentMessage[]) => void
  ): void;
  getPatientAppointmentsAsync(
    patientId: string,
    limit: number,
    offset: number
  ): Promise<AppointmentMessage[]>;

  /**
   * Возвращает список всех записей.
   * @param limit максимальное количество записей, которое нужно вернуть
   * @param offset смещение относительно начала списка записей
   * @param cb callback
   */
  getAppointments(
    limit: number,
    offset: number,
    lastId: string,
    cb: (err: any, appointments: AppointmentMessage[]) => void
  ): void;
  getAppointmentsAsync(
    limit: number,
    offset: number,
    lastId: string
  ): Promise<AppointmentMessage[]>;

  getFilteredAppointments(
    filters: AppointmentFilters,
    limit: number,
    offset: number,
    cb: (err: any, appointments: AppointmentMessage[]) => void
  ): void;
  getFilteredAppointmentsAsync(
    filters: AppointmentFilters,
    limit: number,
    offset: number
  ): Promise<AppointmentMessage[]>;

  getAppointmentsCount(
    cb: (err: any, count: number, support: boolean) => void
  ): void;
  getAppointmentsCountAsync(): Promise<{ count: number; support: boolean }>;

  getPatientAppointmentsCount(
    patientId: string,
    cb: (err: any, count: number, support: boolean) => void
  ): void;
  getPatientAppointmentsCountAsync(
    patientId: string
  ): Promise<{ count: number; support: boolean }>;
}
