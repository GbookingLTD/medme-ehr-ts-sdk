import { IResourceService } from "./ResourceService";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
export interface IDiagnosticReportService extends IResourceService {
    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор записи
     * @param cb callback
     */
    getDiagnosticReportById(id: string, cb: (err: any, p: DiagnosticReportMessage) => void): void;
    getDiagnosticReportByIdAsync(id: string): Promise<DiagnosticReportMessage>;
    /**
     * Возвращает список назначений пациента.
     * @param patientId идентификатор пациента
     * @param limit максимальное количество назначений, которое нужно вернуть
     * @param offset смещение относительно начала списка назначений
     * @param cb callback
     */
    getPatientDiagnosticReports(patientId: string, limit: number, offset: number, cb: (err: any, p: DiagnosticReportMessage[]) => void): void;
    getPatientDiagnosticReportsAsync(patientId: string, limit: number, offset: number): Promise<DiagnosticReportMessage[]>;
    getDiagnosticReports(limit: number, offset: number, cb: (err: any, p: DiagnosticReportMessage[]) => void): void;
    getDiagnosticReportsAsync(limit: number, offset: number): Promise<DiagnosticReportMessage[]>;
    getDiagnosticReportsCount(cb: (err: any, count: number, support: boolean) => void): void;
    getDiagnosticReportsCountAsync(): Promise<{
        count: number;
        support: boolean;
    }>;
    getPatientDiagnosticReportsCount(patientId: string, cb: (err: any, count: number, support: boolean) => void): void;
    getPatientDiagnosticReportsCountAsync(patientId: string): Promise<{
        count: number;
        support: boolean;
    }>;
}
