import { IResourceService } from "./ResourceService";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
import { DiagnosticReportFilters } from "./filters/DiagnosticReportFilters";
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
    getDiagnosticReports(limit: number, offset: number, lastId: string, cb: (err: any, p: DiagnosticReportMessage[]) => void): void;
    getDiagnosticReportsAsync(limit: number, offset: number, lastId: string): Promise<DiagnosticReportMessage[]>;
    getFilteredDiagnosticReports(filters: DiagnosticReportFilters, limit: number, offset: number, cb: (err: any, p: DiagnosticReportMessage[]) => void): void;
    getFilteredDiagnosticReportsAsync(filters: DiagnosticReportFilters, limit: number, offset: number): Promise<DiagnosticReportMessage[]>;
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
    searchDiagnosticReports(includes: string[], excludes: string[], filters: DiagnosticReportFilters, limit: number, offset: number, cb: (err: any, p: DiagnosticReportMessage[]) => void): void;
    searchDiagnosticReportsAsync(includes: string[], excludes: string[], filters: DiagnosticReportFilters, limit: number, offset: number): Promise<DiagnosticReportMessage[]>;
    searchDiagnosticReportsCount(includes: string[], excludes: string[], filters: DiagnosticReportFilters, cb: (err: any, p: number) => void): void;
    searchDiagnosticReportsCountAsync(includes: string[], excludes: string[], filters: DiagnosticReportFilters): Promise<{
        count: number;
        support: boolean;
    }>;
}
//# sourceMappingURL=DiagnosticReportService.d.ts.map