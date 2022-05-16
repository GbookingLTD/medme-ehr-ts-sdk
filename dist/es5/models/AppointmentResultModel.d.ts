import { IJsonModel } from "./JsonModel";
import { BusinessInfo, Doctor, Diagnosis, Procedure, PrescriptionInfo } from "../types/index";
import { JSONValue } from "../json";
export declare function copyCommonPropertiesFromJson(json: any): void;
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
    get id(): string;
    get patientId(): string;
    get business(): BusinessInfo;
    get created(): Date;
    get start(): Date;
    get doctor(): Doctor;
    get duration(): number;
    get anamnesis(): string[];
    get medicalExaminationResult(): string[];
    get diagnosis(): Diagnosis[];
    get recommendations(): Procedure[];
    get scheduledProcedures(): Procedure[];
    get prescriptions(): PrescriptionInfo[];
    get diagnosticReportIds(): string[];
    /**
     *
     * @param json
     */
    fromJson(json: any): AppointmentResultModel;
    /**
     *
     */
    toJson(): JSONValue;
}
//# sourceMappingURL=AppointmentResultModel.d.ts.map