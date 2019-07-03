import { IJsonModel } from './JsonModel';
import { PrescriptionInfo } from "../types/index";
import { PatientInfo } from '../types/PatientInfo';

/**
 * Класс модели медикаментозного назначения.
 */
export class PrescriptionModel extends PrescriptionInfo implements IJsonModel {
    patientId: string;
    patientInfo: PatientInfo;
    fromJson(json: any): PrescriptionInfo {
        super.fromJson(json);
        this.patientId = json.patientInfo.id;
        this.patientInfo = new PatientInfo();
        this.patientInfo.fromJson(json.patientInfo);
        return this;
    }
    toJson(): object {
        return this as object;
    }
}