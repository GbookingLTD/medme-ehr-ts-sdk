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
    public getDiagnosticReportModelById(id: string, cb: (err: any, p: DiagnosticReportModel) => void): void {
        this.exec(Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD, {id: id}, (err: any, payload: object) => {
            if (err) return cb(err, null);
            let app = new DiagnosticReportModel();
            this.lastValidationErrors_ = payload['validationErrors'];
            app.fromJson(payload['diagnosticReport']);
            return cb(null, app);
        });
    }

    public getPatientDiagnosticReports(patientId: string, limit: number, offset: number, 
            cb: (err: any, p: DiagnosticReportModel[]) => void): void {
        let params = {patientId: patientId, limit: limit, offset: offset};
        this.exec(Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD, params, (err: any, payload: object) => {
            if (err) return cb(err, null);
            let diagnosticReports = payload['diagnosticReports'].map((jsonApp: object) => {
                let app = new DiagnosticReportModel();
                this.lastValidationErrorsOfList_ = payload['validationErrors'];
                app.fromJson(jsonApp);
                return app;
            });
            cb(null, diagnosticReports);
        });
    }

}