import { IJsonModel } from './JsonModel';
import { Doctor } from '../types/Doctor';
import { Period } from '../types/Period';
import { DiagnosticReportStatus } from '../types/DiagnosticReportStatus';
import { ObservationType } from '../types/ObservationType';
import { Observation } from '../types/Observation';
import { Service } from '../types/Service';
/**
 * Класс модели медикаментозного назначения.
 */
export declare class DiagnosticReportModel implements IJsonModel {
    private _id;
    private _status;
    private _type;
    private _effectivePeriod;
    private _issuedDate;
    private _result;
    private _resultInterpreter;
    private _resultInterpretation;
    private _imagineMedia;
    private _attachments;
    private _services;
    private _category;
    get id(): string;
    /**
     * Статус диагностического отчета.
     */
    get status(): DiagnosticReportStatus;
    /**
     * Тип обследования.
     */
    get type(): ObservationType;
    /**
     * Список оказанных на исследовании услуг.
     */
    get services(): Service[];
    /**
     * Категория сервисов диагностики (код).
     * @see http://hl7.org/fhir/valueset-diagnostic-service-sections.html
     */
    get category(): string;
    /**
     * Период дат, в течение которых результаты теста считать действительными.
     */
    get effectivePeriod(): Period;
    /**
     * Дата публикации обследования пациенту.
     */
    get issuedDate(): Date;
    /**
     * Результаты обследования в нормализованном виде.
     */
    get result(): Observation[];
    /**
     * Врач, который интерпретировал результаты.
     */
    get resultInterpreter(): Doctor[];
    /**
     * Интерпретация результатов обследования/анализов.
     */
    get resultInterpretation(): string[];
    /**
     * Список ссылок на флюорографии, ЭКГ и т.п.
     */
    get imagineMedia(): string[];
    /**
     * Весь отчет, как документ ворд, pdf  т.п.
     */
    get attachments(): string[];
    constructor();
    fromJson(json: any): DiagnosticReportModel;
    toJson(): object;
}
