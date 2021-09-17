import { IResourceService } from "./ResourceService";
import { PrescriptionModel } from "../models/PrescriptionModel";
import { PrescriptionMessage } from "../messages/PrescriptionMessage";
import { PrescriptionFilters } from "./filters/PrescriptionFilters";

export interface IPrescriptionService extends IResourceService {
  /**
   * Возвращает назначение по идентификатору.
   * @param id идентификатор записи
   * @param cb callback
   */
  getPrescriptionById(
    id: string,
    cb: (err: any, p: PrescriptionMessage) => void
  ): void;
  getPrescriptionByIdAsync(id: string): Promise<PrescriptionMessage>;

  /**
   * Возвращает список назначений пациента.
   * @param patientId идентификатор пациента
   * @param limit максимальное количество назначений, которое нужно вернуть
   * @param offset смещение относительно начала списка назначений
   * @param cb callback
   */
  getPatientPrescriptions(
    patientId: string,
    limit: number,
    offset: number,
    cb: (err: any, p: PrescriptionMessage[]) => void
  ): void;
  getPatientPrescriptionsAsync(
    patientId: string,
    limit: number,
    offset: number
  ): Promise<PrescriptionMessage[]>;

  getPrescriptions(
    limit: number,
    offset: number,
    cb: (err: any, p: PrescriptionMessage[]) => void
  ): void;
  getPrescriptionsAsync(
    limit: number,
    offset: number
  ): Promise<PrescriptionMessage[]>;

  getFilteredPrescriptions(
    filters: PrescriptionFilters,
    limit: number,
    offset: number,
    cb: (err: any, p: PrescriptionMessage[]) => void
  ): void;
  getFilteredPrescriptionsAsync(
    filters: PrescriptionFilters,
    limit: number,
    offset: number
  ): Promise<PrescriptionMessage[]>;

  getPrescriptionsCount(
    cb: (err: any, count: number, support: boolean) => void
  ): void;
  getPrescriptionsCountAsync(): Promise<{ count: number; support: boolean }>;

  getPatientPrescriptionsCount(
    patientId: string,
    cb: (err: any, count: number, support: boolean) => void
  ): void;
  getPatientPrescriptionsCountAsync(
    patientId: string
  ): Promise<{ count: number; support: boolean }>;
}
