import { IAppointmentService } from '../services/AppointmentService';
import { IFlatBuffersModel } from './FlatBuffersModel';
import { IJsonModel } from './JsonModel';

import { BusinessInfo, Doctor, Service, AppointmentConfirmationStatus,
    ClientPrice, AppointmentSource, AppointmentHistoryItem } from "../types/index";
import { AppointmentInputProperties } from '../types/AppointmentInputProperties';

/**
 * Класс модели записи.
 * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
 */
export class AppointmentModel implements IFlatBuffersModel, IJsonModel {
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
    
    get id(): string { return this._id; }
    get patientId(): string { return this._patientId; }
    get business(): BusinessInfo { return this._business; }
    get created(): Date { return this._created; }
    get start(): Date { return this._start; }
    get doctor(): Doctor { return this._doctor; }
    get services(): Service[] { return this._services; }
    get duration(): number { return this._duration; }
    get confirmationStatus(): AppointmentConfirmationStatus { return this._confirmationStatus; }
    get clientAppear(): boolean { return this._clientAppear; }
    get resultId(): string { return this._resultId; }
    get clientPrice(): ClientPrice { return this._clientPrice; }
    get source(): AppointmentSource { return this._source; }
    get history(): AppointmentHistoryItem[] { return this._history; }

    /**
     * Read state of object from flatbuffers object.
     * 
     * @param fbobj
     */
    public fromFlatBuffers(fbobj: object): void {
        // let a = fbobj as MF1.EHR.FlatBuffers.Appointment;
        // this._id = a.id().value();
        // this._patientId = a.patientId().value();
    }
    
    /**
     * Write data of model to flatbuffers object.
     * 
     * @return {object}
     */
    public toFlatBuffers(): object { return {};
        // let builder = new flatbuffers.Builder(0);
        // let idValue = builder.createString(this._id);
        // let patientIdValue = builder.createString(this._patientId);

        // MF0.EHR.FlatBuffers.ID.startID(builder);
        // MF0.EHR.FlatBuffers.ID.addValue(builder, idValue);
        // let idOffset = MF0.EHR.FlatBuffers.ID.endID(builder);

        // MF0.EHR.FlatBuffers.ID.startID(builder);
        // MF0.EHR.FlatBuffers.ID.addValue(builder, patientIdValue);
        // let patientIdOffset = MF0.EHR.FlatBuffers.ID.endID(builder);

        // MF1.EHR.FlatBuffers.Appointment.startAppointment(builder);
        // MF1.EHR.FlatBuffers.Appointment.addId(builder, idOffset);
        // MF1.EHR.FlatBuffers.Appointment.addPatientId(builder, patientIdOffset);
        // let appOffset = MF1.EHR.FlatBuffers.Appointment.endAppointment(builder);

        // builder.finish(appOffset);
        
        // let arr = builder.asUint8Array();
        // let bb = new flatbuffers.ByteBuffer(arr);
        // return MF1.EHR.FlatBuffers.Appointment.getRootAsAppointment(bb);
    }

    /**
     * 
     * @param json 
     */
    public fromJson(json: any) {
        this._id = json.id;
        this._patientId = json.patientId;
        this._business = json.business;
        this._created = json.created;
        this._start = json.start;
        this._doctor = json.doctor;
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
    public toJson(): object {
        let payload: {
            [key: string]: any
        } = {
            id: this._id,
            patientId: this._patientId
        };
        payload.business = this._business;
        payload.created = this._created;
        payload.start = this._start;
        payload.doctor = this._doctor;
        payload.services = this._services;
        payload.duration = this._duration;
        payload.status = this._confirmationStatus;
        payload.clientAppear = this._clientAppear;
        payload.resultId = this._resultId;
        payload.clientPrice = this._clientPrice;
        payload.source = this._source;
        payload.history = this._history;
        return payload;
    }
}
