import { IAppointmentResultService } from "../AppointmentResultService";
import { AppointmentResultModel } from "../../models/AppointmentResultModel";
import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
import { AppointmentResultMessage } from "../../messages/AppointmentResultMessage";

export class AppointmentResultService
  extends JsonRPCCredService
  implements IAppointmentResultService
{
  /**
   * Возвращает результаты записи по идентификатору.
   * @param id идентификатор результата записи
   * @param cb callback
   */
  public getAppointmentResultById(
    id: string,
    cb: (err: any, appointmentResult: AppointmentResultMessage) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD,
      { id: id },
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrors_ = payload["validationErrors"];
        return cb(null, payload["appointmentResult"]);
      }
    );
  }

  public getAppointmentResultByIdAsync(
    id: string
  ): Promise<AppointmentResultMessage> {
    const service = this;
    return new Promise((res, rej) => {
      service.getAppointmentResultById(
        id,
        (err: any, appointment: AppointmentResultMessage) => {
          if (err) return rej(err);

          // console.log("appointment_result.id:", appointment.id);
          res(appointment);
        }
      );
    });
  }

  public getPatientAppointmentResults(
    patientId: string,
    limit: number,
    offset: number,
    cb: (err: any, appointmentResults: AppointmentResultModel[]) => void
  ): void {
    let params = { patientId: patientId, limit: limit, offset: offset };
    this.exec(
      Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);
        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        let appointmentResults = payload["appointmentResults"].map(
          (jsonApp: object) => {
            let app = new AppointmentResultModel();
            app.fromJson(jsonApp);
            return app;
          }
        );
        return cb(null, appointmentResults);
      }
    );
  }

  getPatientAppointmentResultsAsync(
    patientId: string,
    limit: number,
    offset: number
  ): Promise<AppointmentResultModel[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientAppointmentResults(
        patientId,
        limit,
        offset,
        (err: any, appResults: AppointmentResultModel[]) => {
          if (err) return rej(err);

          res(appResults);
        }
      );
    });
  }

  getAppointmentResults(
    limit: number,
    offset: number,
    cb: (err: any, appointmentResults: AppointmentResultModel[]) => void
  ): void {
    let params = { limit: limit, offset: offset };
    this.exec(
      Handlers.HANDLER_GET_APPOINTMENT_RESULTS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        return cb(null, payload["appointmentResults"]);
      }
    );
  }

  getAppointmentResultsAsync(
    limit: number,
    offset: number
  ): Promise<AppointmentResultModel[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getAppointmentResults(
        limit,
        offset,
        (err: any, appResults: AppointmentResultModel[]) => {
          if (err) return rej(err);

          res(appResults);
        }
      );
    });
  }

  getAppointmentResultsCount(
    cb: (err: any, count: number, support: boolean) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_APPOINTMENT_RESULTS_COUNT_METHOD,
      {},
      (err: any, payload: object) => {
        if (err) return cb(err, null, false);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"]);
      }
    );
  }

  getAppointmentResultsCountAsync(): Promise<{
    count: number;
    support: boolean;
  }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getAppointmentResultsCount(
        (err: any, count: number, support: boolean) => {
          if (err) return rej(err);

          res({ count, support });
        }
      );
    });
  }

  getPatientAppointmentResultsCount(
    patientId: string,
    cb: (err: any, count: number, support: boolean) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_COUNT_METHOD,
      { patientId },
      (err: any, payload: object) => {
        if (err) return cb(err, null, false);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"]);
      }
    );
  }

  getPatientAppointmentResultsCountAsync(
    patientId: string
  ): Promise<{ count: number; support: boolean }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientAppointmentResultsCount(
        patientId,
        (err: any, count: number, support: boolean) => {
          if (err) return rej(err);

          res({ count, support });
        }
      );
    });
  }
}
