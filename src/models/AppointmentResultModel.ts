import { IJsonModel } from './JsonModel';
import { BusinessInfo, Doctor, Diagnosis, ProcedureInfo, PrescriptionInfo } from "../types/index";

/**
 * Класс модели записи.
 * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
 */
export class AppointmentResultModel implements IJsonModel {
    private _id: string;
    private _patientId: string;
    private _business: BusinessInfo;
    private _created: Date;
    private _start: Date;
    private _doctor: Doctor;
    private _duration: number;
    private _anamnesis: string[];
    private _medicalExaminationResult: string[];
    private _diagnosis: Diagnosis[];
    private _recommendations: ProcedureInfo[];
    private _procedures: ProcedureInfo[];
    private _prescriptions: PrescriptionInfo[];
    private _diagnosticReportIds: string[];

    constructor() {}

    get id(): string { return this._id; }
    get patientId(): string { return this._patientId; }
    get business(): BusinessInfo { return this._business; }
    get created(): Date { return this._created; }
    get start(): Date { return this._start; }
    get doctor(): Doctor { return this._doctor; }
    get duration(): number { return this._duration; }
    get anamnesis(): string[] { return this._anamnesis; }
    get medicalExaminationResult(): string[] { return this._medicalExaminationResult; }
    get diagnosis(): Diagnosis[] { return this._diagnosis; }
    get recommendations(): ProcedureInfo[] { return this._recommendations; }
    get procedures(): ProcedureInfo[] { return this._procedures; }
    get prescriptions(): PrescriptionInfo[] { return this._prescriptions; }
    get diagnosticReportIds(): string[] { return this._diagnosticReportIds; }

    /**
     * 
     * @param json 
     */
    public fromJson(json: any): AppointmentResultModel {
        this._id = json.id;
        this._patientId = json.patientId;
        this._business = json.business;
        this._created = json.created;
        this._start = json.start;
        this._doctor = json.doctor;
        this._duration = json.duration;
        this._anamnesis = json.anamnesis;
        this._medicalExaminationResult = json.medicalExaminationResult;
        this._diagnosis = json.diagnosis ? json.diagnosis.map((d: any) => new Diagnosis(d)) : [];
        this._recommendations = json.recommendations ? json.recommendations.map((r: any) => new ProcedureInfo(r)) : [];
        this._procedures = json.procedures ? json.procedures.map((p: any) => new ProcedureInfo(p)) : [];
        this._prescriptions = json.prescriptions ? json.prescriptions.map((p: any) => (new PrescriptionInfo).fromJson(p)) : [];
        this._diagnosticReportIds = json.diagnosticReportIds || [];
        return this;
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
        payload.duration = this._duration;
        return payload;
    }
}
