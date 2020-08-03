import { IJsonModel } from './JsonModel';
import { BusinessInfo, Doctor, Diagnosis, Procedure, PrescriptionInfo } from "../types/index";
/**
 * Класс модели записи.
 * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
 */
export declare class AppointmentResultModel implements IJsonModel {
    private _id;
    private _patientId;
    private _business;
    private _created;
    private _start;
    private _doctor;
    private _duration;
    private _anamnesis;
    private _medicalExaminationResult;
    private _diagnosis;
    private _recommendations;
    private _scheduledProcedures;
    private _prescriptions;
    private _diagnosticReportIds;
    constructor();
    readonly id: string;
    readonly patientId: string;
    readonly business: BusinessInfo;
    readonly created: Date;
    readonly start: Date;
    readonly doctor: Doctor;
    readonly duration: number;
    readonly anamnesis: string[];
    readonly medicalExaminationResult: string[];
    readonly diagnosis: Diagnosis[];
    readonly recommendations: Procedure[];
    readonly scheduledProcedures: Procedure[];
    readonly prescriptions: PrescriptionInfo[];
    readonly diagnosticReportIds: string[];
    /**
     *
     * @param json
     */
    fromJson(json: any): AppointmentResultModel;
    /**
     *
     */
    toJson(): object;
}
