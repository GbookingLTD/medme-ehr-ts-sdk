import { IJsonModel } from './JsonModel';
import { BusinessInfo, Doctor, Service, AppointmentConfirmationStatus, ClientPrice, AppointmentSource, AppointmentHistoryItem } from "../types/index";
export declare function copyCommonPropertiesFromJson(json: any): void;
/**
 * Класс модели записи.
 * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
 */
export declare class AppointmentModel implements IJsonModel {
    private _id;
    private _patientId;
    private _business;
    private _created;
    private _start;
    private _doctor;
    private _services;
    private _duration;
    private _confirmationStatus;
    private _clientAppear;
    private _resultId;
    private _clientPrice;
    private _source;
    private _history;
    constructor();
    readonly id: string;
    readonly patientId: string;
    readonly business: BusinessInfo;
    readonly created: Date;
    readonly start: Date;
    readonly doctor: Doctor;
    readonly services: Service[];
    readonly duration: number;
    readonly confirmationStatus: AppointmentConfirmationStatus;
    readonly clientAppear: boolean;
    readonly resultId: string;
    readonly clientPrice: ClientPrice;
    readonly source: AppointmentSource;
    readonly history: AppointmentHistoryItem[];
    /**
     *
     * @param json
     */
    fromJson(json: any): void;
    /**
     *
     */
    toJson(): object;
}
