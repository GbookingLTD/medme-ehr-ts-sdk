import { JsonRPCCredService } from "./jsonRpcService";
import { IDiagnosticReportService } from "../DiagnosticReportService";
import { DiagnosticReportMessage } from "../../messages/DiagnosticReportMessage";
import { DiagnosticReportFilters } from "../../services/filters/DiagnosticReportFilters";
export declare class DiagnosticReportService extends JsonRPCCredService implements IDiagnosticReportService {
    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getDiagnosticReportById(id: string, cb: (err: any, p: DiagnosticReportMessage) => void): void;
    getDiagnosticReportByIdAsync(id: string): Promise<DiagnosticReportMessage>;
    getPatientDiagnosticReports(patientId: string, limit: number, offset: number, cb: (err: any, p: DiagnosticReportMessage[]) => void): void;
    getPatientDiagnosticReportsAsync(patientId: string, limit: number, offset: number): Promise<DiagnosticReportMessage[]>;
    getDiagnosticReports(limit: number, offset: number, cb: (err: any, p: DiagnosticReportMessage[]) => void): void;
    getDiagnosticReportsAsync(limit: number, offset: number): Promise<DiagnosticReportMessage[]>;
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
}
