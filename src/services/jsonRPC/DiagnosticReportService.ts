import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
import { DiagnosticReportModel } from "../../models/DiagnosticReportModel";
import { IDiagnosticReportService } from "../DiagnosticReportService";
import { DiagnosticReportMessage } from "../../messages/DiagnosticReportMessage";

export class DiagnosticReportService
  extends JsonRPCCredService
  implements IDiagnosticReportService
{
  /**
   * Возвращает назначение по идентификатору.
   * @param id идентификатор результата записи
   * @param cb callback
   */
  public getDiagnosticReportById(
    id: string,
    cb: (err: any, p: DiagnosticReportMessage) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD,
      { id: id },
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrors_ = payload["validationErrors"];
        return cb(null, payload["diagnosticReport"]);
      }
    );
  }

  public getDiagnosticReportByIdAsync(
    id: string
  ): Promise<DiagnosticReportMessage> {
    const service = this;
    return new Promise((res, rej) => {
      service.getDiagnosticReportById(
        id,
        (err: any, dr: DiagnosticReportMessage) => {
          if (err) return rej(err);

          // console.log("prescription.id:", appointment.id);
          res(dr);
        }
      );
    });
  }

  public getPatientDiagnosticReports(
    patientId: string,
    limit: number,
    offset: number,
    cb: (err: any, p: DiagnosticReportMessage[]) => void
  ): void {
    let params = { patientId: patientId, limit: limit, offset: offset };
    this.exec(
      Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["diagnosticReports"]);
      }
    );
  }

  public getPatientDiagnosticReportsAsync(
    patientId: string,
    limit: number,
    offset: number
  ): Promise<DiagnosticReportMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientDiagnosticReports(
        patientId,
        limit,
        offset,
        (err: any, reports: DiagnosticReportMessage[]) => {
          if (err) return rej(err);

          res(reports);
        }
      );
    });
  }

  public getDiagnosticReports(
    limit: number,
    offset: number,
    cb: (err: any, p: DiagnosticReportMessage[]) => void
  ): void {
    let params = { limit: limit, offset: offset };
    this.exec(
      Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["diagnosticReports"]);
      }
    );
  }

  public getDiagnosticReportsAsync(
    limit: number,
    offset: number
  ): Promise<DiagnosticReportMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getDiagnosticReports(
        limit,
        offset,
        (err: any, reports: DiagnosticReportMessage[]) => {
          if (err) return rej(err);

          res(reports);
        }
      );
    });
  }

  public getDiagnosticReportsCount(
    cb: (err: any, count: number, support: boolean) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_COUNT_METHOD,
      {},
      (err: any, payload: object) => {
        if (err) return cb(err, null, false);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"]);
      }
    );
  }

  public getDiagnosticReportsCountAsync(): Promise<{
    count: number;
    support: boolean;
  }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getDiagnosticReportsCount(
        (err: any, count: number, support: boolean) => {
          if (err) return rej(err);

          res({ count, support });
        }
      );
    });
  }

  public getPatientDiagnosticReportsCount(
    patientId: string,
    cb: (err: any, count: number, support: boolean) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_COUNT_METHOD,
      { patientId },
      (err: any, payload: object) => {
        if (err) return cb(err, null, false);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"]);
      }
    );
  }

  public getPatientDiagnosticReportsCountAsync(
    patientId: string
  ): Promise<{ count: number; support: boolean }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientDiagnosticReportsCount(
        patientId,
        (err: any, count: number, support: boolean) => {
          if (err) return rej(err);

          res({ count, support });
        }
      );
    });
  }
}
