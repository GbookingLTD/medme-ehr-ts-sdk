import { IJsonModel } from './JsonModel';
import { PrescriptionInfo } from "../types/index";
import { PatientInfo } from '../types/PatientInfo';
/**
 * Класс модели медикаментозного назначения.
 */
export declare class PrescriptionModel extends PrescriptionInfo implements IJsonModel {
    patientId: string;
    patientInfo: PatientInfo;
    fromJson(json: any): PrescriptionInfo;
    toJson(): object;
}
