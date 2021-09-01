import { IAppointmentService } from "../services/AppointmentService";
import { IJsonModel } from "./JsonModel";

import {
  BusinessInfo,
  Doctor,
  Service,
  AppointmentConfirmationStatus,
  ClientPrice,
  AppointmentSource,
  AppointmentHistoryItem,
} from "../types/index";
import { JSONObject, JSONValue } from "../json";

export function copyCommonPropertiesFromJson(json: any) {
  this._id = json.id;
  this._patientId = json.patientId;

  if (json.business) this._business = json.business;

  this._created = json.created;
  this._start = json.start;

  if (json.doctor) this._doctor = json.doctor;
}

/**
 * Класс модели записи.
 * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
 */
export class AppointmentModel implements IJsonModel {
  private _id: string;
  private _patientId: string;
  private _business: BusinessInfo;
  private _created: Date;
  private _start: Date;
  private _doctor: Doctor;
  private _services: Service[];
  private _duration: number;
  private _confirmationStatus: AppointmentConfirmationStatus;
  private _clientAppear: boolean;
  private _resultId: string;
  private _clientPrice: ClientPrice;
  private _source: AppointmentSource;
  private _history: AppointmentHistoryItem[];

  constructor() {}

  get id(): string {
    return this._id;
  }
  get patientId(): string {
    return this._patientId;
  }
  get business(): BusinessInfo {
    return this._business;
  }
  get created(): Date {
    return this._created;
  }
  get start(): Date {
    return this._start;
  }
  get doctor(): Doctor {
    return this._doctor;
  }
  get services(): Service[] {
    return this._services;
  }
  get duration(): number {
    return this._duration;
  }
  get confirmationStatus(): AppointmentConfirmationStatus {
    return this._confirmationStatus;
  }
  get clientAppear(): boolean {
    return this._clientAppear;
  }
  get resultId(): string {
    return this._resultId;
  }
  get clientPrice(): ClientPrice {
    return this._clientPrice;
  }
  get source(): AppointmentSource {
    return this._source;
  }
  get history(): AppointmentHistoryItem[] {
    return this._history;
  }

  /**
   *
   * @param json
   */
  public fromJson(json: any) {
    copyCommonPropertiesFromJson.call(this, json);
    this._services = json.services;
    this._duration = json.duration;
    this._confirmationStatus = json.confirmationStatus;
    this._clientAppear = json.clientAppear;
    this._resultId = json.resultId;
    this._clientPrice = json.clientPrice;
    this._confirmationStatus = json.status;
    this._source = json.source;
    this._history = json.history;
  }

  /**
   *
   */
  public toJson(): JSONValue {
    let payload: JSONObject = {
      id: this._id,
      patientId: this._patientId,
    };
    payload.business = this._business.toJson();
    payload.created = this._created.toJSON();
    payload.start = this._start.toJSON();
    payload.doctor = this._doctor.toJson();
    payload.services = Array.isArray(this._services)
      ? this._services.map((s) => s.toJson())
      : null;
    payload.duration = this._duration;
    payload.status = this._confirmationStatus;
    payload.clientAppear = this._clientAppear;
    payload.resultId = this._resultId;
    payload.clientPrice = this._clientPrice.toJson();
    payload.source = this._source;
    return payload;
  }

  public toJSON() {
    return this.toJson();
  }

  public toString(): string {
    return JSON.stringify(this.toJson());
  }
}
