import { JsonRPCCredService } from "./jsonRpcService";
import { DiagnosticReportModel } from "../../models/DiagnosticReportModel";
import { IDiagnosticReportService } from "../DiagnosticReportService";
export declare class DiagnosticReportService extends JsonRPCCredService implements IDiagnosticReportService {
    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getDiagnosticReportById(id: string, cb: (err: any, p: DiagnosticReportModel) => void): void;
    getDiagnosticReportByIdAsync(id: string): Promise<DiagnosticReportModel>;
    getPatientDiagnosticReports(patientId: string, limit: number, offset: number, cb: (err: any, p: DiagnosticReportModel[]) => void): void;
    getPatientDiagnosticReportsAsync(patientId: string, limit: number, offset: number): Promise<DiagnosticReportModel[]>;
}
