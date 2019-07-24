import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
import { DiagnosticReportModel } from "../../models/DiagnosticReportModel";
import { IDiagnosticReportService } from "../DiagnosticReportService";

export class DiagnosticReportService extends JsonRPCCredService implements IDiagnosticReportService {
    

    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    public getDiagnosticReportModelById(id: string, cb: (p: DiagnosticReportModel) => void): void {
        this.exec(Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD, {id: id}, (err: any, payload: object) => {
            if (err) throw new Error("failed to load DiagnosticReport results (id="+id+"): " + err);
            let app = new DiagnosticReportModel();
            app.fromJson(payload['diagnosticReport']);
            cb(app);
        });
    }

    public getPatientDiagnosticReports(patientId: string, limit: number, offset: number, 
            cb: (p: DiagnosticReportModel[]) => void): void {
        let params = {patientId: patientId, limit: limit, offset: offset};
        this.exec(Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD, params, (err: any, payload: object) => {
            if (err) throw new Error("failed to load patient DiagnosticReports results (patientId="+patientId+"): " + err);
            let diagnosticReports = payload['diagnosticReports'].map((jsonApp: object) => {
                let app = new DiagnosticReportModel();
                app.fromJson(jsonApp);
                return app;
            });
            cb(diagnosticReports);
        });
    }

}