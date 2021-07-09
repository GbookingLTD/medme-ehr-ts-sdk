import { IJsonModel } from './JsonModel';
import { BusinessInfo, Doctor, Service, AppointmentConfirmationStatus, ClientPrice, AppointmentSource, AppointmentHistoryItem } from "../types/index";
import { JSONValue } from "../json";
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
    get id(): string;
    get patientId(): string;
    get business(): BusinessInfo;
    get created(): Date;
    get start(): Date;
    get doctor(): Doctor;
    get services(): Service[];
    get duration(): number;
    get confirmationStatus(): AppointmentConfirmationStatus;
    get clientAppear(): boolean;
    get resultId(): string;
    get clientPrice(): ClientPrice;
    get source(): AppointmentSource;
    get history(): AppointmentHistoryItem[];
    /**
     *
     * @param json
     */
    fromJson(json: any): void;
    /**
     *
     */
    toJson(): JSONValue;
    toJSON(): JSONValue;
    toString(): string;
}
