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
    readonly id: string;
    /**
     * Статус диагностического отчета.
     */
    readonly status: DiagnosticReportStatus;
    /**
     * Тип обследования.
     */
    readonly type: ObservationType;
    /**
     * Список оказанных на исследовании услуг.
     */
    readonly services: Service[];
    /**
     * Категория сервисов диагностики (код).
     * @see http://hl7.org/fhir/valueset-diagnostic-service-sections.html
     */
    readonly category: string;
    /**
     * Период дат, в течение которых результаты теста считать действительными.
     */
    readonly effectivePeriod: Period;
    /**
     * Дата публикации обследования пациенту.
     */
    readonly issuedDate: Date;
    /**
     * Результаты обследования в нормализованном виде.
     */
    readonly result: Observation[];
    /**
     * Врач, который интерпретировал результаты.
     */
    readonly resultInterpreter: Doctor[];
    /**
     * Интерпретация результатов обследования/анализов.
     */
    readonly resultInterpretation: string[];
    /**
     * Список ссылок на флюорографии, ЭКГ и т.п.
     */
    readonly imagineMedia: string[];
    /**
     * Весь отчет, как документ ворд, pdf  т.п.
     */
    readonly attachments: string[];
    constructor();
    fromJson(json: any): DiagnosticReportModel;
    toJson(): object;
}
