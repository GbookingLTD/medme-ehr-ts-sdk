import { IResourceService } from './ResourceService';
import { PrescriptionModel } from "../models/PrescriptionModel";

export interface IPrescriptionService extends IResourceService {

    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор записи
     * @param cb callback
     */
    getPrescriptionModelById(id: string, cb: (p: PrescriptionModel) => void): void;

    /**
     * Возвращает список назначений пациента.
     * @param patientId идентификатор пациента
     * @param limit максимальное количество назначений, которое нужно вернуть
     * @param offset смещение относительно начала списка назначений
     * @param cb callback
     */
    getPatientPrescriptions(patientId: string, limit: number, offset: number, 
        cb: (err: any, p: PrescriptionModel[]) => void): void;
}