import { IResourceService } from './ResourceService';
import { DiagnosticReportModel } from "../models/DiagnosticReportModel";

export interface IDiagnosticReportService extends IResourceService {

    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор записи
     * @param cb callback
     */
    getDiagnosticReportModelById(id: string, cb: (err: any, p: DiagnosticReportModel) => void): void;

    /**
     * Возвращает список назначений пациента.
     * @param patientId идентификатор пациента
     * @param limit максимальное количество назначений, которое нужно вернуть
     * @param offset смещение относительно начала списка назначений
     * @param cb callback
     */
    getPatientDiagnosticReports(patientId: string, limit: number, offset: number, 
        cb: (err: any, p: DiagnosticReportModel[]) => void): void;
}