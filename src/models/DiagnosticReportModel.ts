import { IJsonModel } from './JsonModel';
import { Doctor } from '../types/Doctor';
import { Period } from '../types/Period';
import { DiagnosticReportStatus } from '../types/DiagnosticReportStatus';
import { ObservationType } from '../types/ObservationType';
import { Observation } from '../types/Observation'
import { Service } from '../types/Service';
import { JSONObject, JSONValue } from "../json";

/**
 * Класс модели медикаментозного назначения.
 */
export class DiagnosticReportModel implements IJsonModel {
    private _id: string;
    private _status: DiagnosticReportStatus;
    private _type: ObservationType;
    private _effectivePeriod: Period;
    private _issuedDate: Date;
    private _result: Observation[];
    private _resultInterpreter: Doctor[];
    private _resultInterpretation: string[];
    private _imagineMedia: string[];
    private _attachments: string[];
    private _services: Service[];
    private _category: string;

    get id(): string { return this._id; }

    /**
     * Статус диагностического отчета.
     */
    get status(): DiagnosticReportStatus { return this._status; }

    /**
     * Тип обследования.
     */
    get type(): ObservationType { return this._type; }

    /**
     * Список оказанных на исследовании услуг.
     */
    get services(): Service[] { return this._services; }

    /**
     * Категория сервисов диагностики (код).
     * @see http://hl7.org/fhir/valueset-diagnostic-service-sections.html
     */
    get category(): string { return this._category; }

    /**
     * Период дат, в течение которых результаты теста считать действительными.
     */
    get effectivePeriod(): Period { return this._effectivePeriod; }

    /**
     * Дата публикации обследования пациенту.
     */
    get issuedDate(): Date { return this._issuedDate; }

    /**
     * Результаты обследования в нормализованном виде.
     */
    get result(): Observation[] { return this._result; }

    /**
     * Врач, который интерпретировал результаты.
     */
    get resultInterpreter(): Doctor[] { return this._resultInterpreter; }

    /**
     * Интерпретация результатов обследования/анализов.
     */
    get resultInterpretation(): string[] { return this._resultInterpretation; }

    /**
     * Список ссылок на флюорографии, ЭКГ и т.п.
     */
    get imagineMedia(): string[] { return this._imagineMedia; }

    /**
     * Весь отчет, как документ ворд, pdf  т.п.
     */
    get attachments(): string[] { return this._attachments; }

    constructor() {
        this._issuedDate = new Date();
        this._effectivePeriod = new Period();
        this._result = [];
        this._resultInterpreter = [];
        this._resultInterpretation = [];
        this._imagineMedia = [];
        this._attachments = [];
        this._services = [];
    }

    fromJson(json: any): DiagnosticReportModel {
        this._id = json.id;
        this._status = json.status;
        this._type = json.type;
        this._effectivePeriod = (new Period).fromJson(json.effectivePeriod);
        this._issuedDate = new Date(json.issuedDate);

        this._result = [];
        if (json.result)
            for (let i: number = 0; i < json.result.length; ++i)
                this._result.push((new Observation).fromJson(json.result[i]));

        this._resultInterpreter = json.resultInterpreter ? json.resultInterpreter.map((d: any) => (new Doctor).fromJson(d)) : [];
        this._resultInterpretation = json.resultInterpretation || [];
        this._imagineMedia = json.imagineMedia || [];
        this._attachments = json.attachments || [];

        this._services = [];
        if (json.services)
            for (let i: number = 0; i < json.services.length; ++i)
                this._services.push((new Service).fromJson(json.services[i]));

        this._category = json.category;

        return this;
    }
    toJson(): JSONValue {
        let payload: JSONObject = {};
        payload.id = this._id;
        payload.status = this._status;
        payload.type = this._type;
        payload.effectivePeriod = this._effectivePeriod ? this._effectivePeriod.toJson() : null;
        payload.issuedDate = this._issuedDate.toJSON();
        payload.result = this._result ? this._result.map(value => value.toJson()) : null;
        payload.resultInterpreter = this._resultInterpreter ? this._resultInterpreter.map(i => i.toJson()) : null;
        payload.resultInterpretation = this._resultInterpretation;
        payload.imagineMedia = this._imagineMedia;
        payload.attachments = this._attachments;
        payload.services = this._services ? this._services.map(s => s.toJson()) : null;
        payload.category = this._category;
        return payload;
    }
}