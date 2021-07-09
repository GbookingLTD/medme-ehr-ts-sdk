import { IJsonModel } from './JsonModel';
import { BusinessInfo, Doctor, Diagnosis, Procedure, PrescriptionInfo } from "../types/index";
import { copyCommonPropertiesFromJson } from './AppointmentModel';
import { JSONObject, JSONValue } from "../json";

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
    private _recommendations: Procedure[];
    private _scheduledProcedures: Procedure[];
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
    get recommendations(): Procedure[] { return this._recommendations; }
    get scheduledProcedures(): Procedure[] { return this._scheduledProcedures; }
    get prescriptions(): PrescriptionInfo[] { return this._prescriptions; }
    get diagnosticReportIds(): string[] { return this._diagnosticReportIds; }

    /**
     *
     * @param json
     */
    public fromJson(json: any): AppointmentResultModel {
        copyCommonPropertiesFromJson.call(this, json);
        this._duration = json.duration;
        this._anamnesis = json.anamnesis;
        this._medicalExaminationResult = json.medicalExaminationResult;
        this._diagnosis = json.diagnosis ? json.diagnosis.map((d: any) => new Diagnosis(d)) : [];
        this._recommendations = json.recommendations ? json.recommendations.map((r: any) =>  (new Procedure).fromJson(r)) : [];
        this._scheduledProcedures = json.scheduledProcedures ? json.scheduledProcedures.map((p: any) => (new Procedure).fromJson(p)) : [];
        this._prescriptions = json.prescriptions ? json.prescriptions.map((p: any) => (new PrescriptionInfo).fromJson(p)) : [];
        this._diagnosticReportIds = json.diagnosticReportIds || [];
        return this;
    }

    /**
     *
     */
    public toJson(): JSONValue {
        let payload: JSONObject = {
            id: this._id,
            patientId: this._patientId
        };
        payload.business = this._business.toJson();
        payload.created = this._created.toJSON();
        payload.start = this._start.toJSON();
        payload.doctor = this._doctor.toJson();
        payload.duration = this._duration;
        payload.anamnesis = this._anamnesis;
        payload.medicalExaminationResult = this._medicalExaminationResult;
        payload.diagnosis = Array.isArray(this._diagnosis) ? this._diagnosis.map(d => d.toJson()) : [];
        payload.recommendations = Array.isArray(this._recommendations) ? this._recommendations.map(r => r.toJson()) : [];
        payload.scheduledProcedures = Array.isArray(this._scheduledProcedures) ? this._scheduledProcedures.map(r => r.toJson()) : [];
        payload.prescriptions = Array.isArray(this._prescriptions) ? this._prescriptions.map(p => p.toJson()) : [];
        payload.diagnosticReportIds = this._diagnosticReportIds;
        return payload;
    }
}
