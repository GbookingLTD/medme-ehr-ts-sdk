import { CursorType } from "../../types/CursorType";
import { IAppointmentResultService } from "../AppointmentResultService";
import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
import { AppointmentResultMessage } from "../../messages/AppointmentResultMessage";
import { AppointmentFilters } from "../../services/filters/AppointmentFilters";

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
    cb: (err: any, appointmentResults: AppointmentResultMessage[]) => void
  ): void {
    let params = { patientId: patientId, limit: limit, offset: offset };
    this.exec(
      Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);
        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        let appointmentResults = payload["appointmentResults"];

        return cb(null, appointmentResults);
      }
    );
  }

  getPatientAppointmentResultsAsync(
    patientId: string,
    limit: number,
    offset: number
  ): Promise<AppointmentResultMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientAppointmentResults(
        patientId,
        limit,
        offset,
        (err: any, appResults: AppointmentResultMessage[]) => {
          if (err) return rej(err);

          res(appResults);
        }
      );
    });
  }

  getAppointmentResults(
    limit: number,
    offset: number,
    lastId: string,
    prevCreated: string,
    cb: (err: any, appointmentResults: AppointmentResultMessage[]) => void
  ): void {
    let params = prevCreated
      ? { limit, lastItemCreated: prevCreated }
      : lastId
      ? { limit, lastItemId: lastId }
      : { limit: limit, offset: offset };
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
    offset: number,
    lastId: string,
    prevCreated: string
  ): Promise<AppointmentResultMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getAppointmentResults(
        limit,
        offset,
        lastId,
        prevCreated,
        (err: any, appResults: AppointmentResultMessage[]) => {
          if (err) return rej(err);

          res(appResults);
        }
      );
    });
  }

  getAppointmentResultsCount(
    cb: (
      err: any,
      count: number,
      support: boolean,
      cursorType: CursorType
    ) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_APPOINTMENT_RESULTS_COUNT_METHOD,
      {},
      (err: any, payload: object) => {
        if (err) return cb(err, null, false, CursorType.None);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"], payload["cursorType"]);
      }
    );
  }

  getAppointmentResultsCountAsync(): Promise<{
    count: number;
    support: boolean;
    cursorType: CursorType;
  }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getAppointmentResultsCount(
        (err: any, count: number, support: boolean, cursorType: CursorType) => {
          if (err) return rej(err);

          res({ count, support, cursorType });
        }
      );
    });
  }

  getPatientAppointmentResultsCount(
    patientId: string,
    cb: (
      err: any,
      count: number,
      support: boolean,
      cursorType: CursorType
    ) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_COUNT_METHOD,
      { patientId },
      (err: any, payload: object) => {
        if (err) return cb(err, null, false, CursorType.None);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"], payload["cursorType"]);
      }
    );
  }

  getPatientAppointmentResultsCountAsync(
    patientId: string
  ): Promise<{ count: number; support: boolean; cursorType: CursorType }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientAppointmentResultsCount(
        patientId,
        (err: any, count: number, support: boolean, cursorType: CursorType) => {
          if (err) return rej(err);

          res({ count, support, cursorType });
        }
      );
    });
  }

  public searchAppointmentResults(
    includes: string[],
    excludes: string[],
    filters: AppointmentFilters,
    limit: number,
    offset: number,
    cb: (err: any, p: AppointmentResultMessage[]) => void
  ): void {
    const _this = this;
    this.exec(
      Handlers.HANDLER_SEARCH_APPOINTMENT_RESULTS_METHOD,
      { includes, excludes, filters: filters.plain(), limit, offset },
      (err: any, payload: object) => {
        if (err) return cb(err, []);

        _this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["appointmentResults"]);
      }
    );
  }

  public searchAppointmentResultsAsync(
    includes: string[],
    excludes: string[],
    filters: AppointmentFilters,
    limit: number,
    offset: number
  ): Promise<AppointmentResultMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.searchAppointmentResults(
        includes,
        excludes,
        filters,
        limit,
        offset,
        (err: any, reports: AppointmentResultMessage[]) => {
          if (err) return rej(err);
          res(reports);
        }
      );
    });
  }

  public searchAppointmentResultsCount(
    includes: string[],
    excludes: string[],
    filters: AppointmentFilters,
    cb: (err: any, count: number, support: boolean) => void
  ): void {
    const _this = this;
    this.exec(
      Handlers.HANDLER_SEARCH_APPOINTMENT_RESULTS_COUNT_METHOD,
      { includes, excludes, filters: filters.plain() },
      (err: any, payload: object) => {
        if (err) return cb(err, 0, false);

        _this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"]);
      }
    );
  }

  public searchAppointmentResultsCountAsync(
    includes: string[],
    excludes: string[],
    filters: AppointmentFilters
  ): Promise<{ count: number; support: boolean }> {
    const service = this;
    return new Promise((res, rej) => {
      service.searchAppointmentResultsCount(
        includes,
        excludes,
        filters,
        (err: any, count: number, support: boolean) => {
          if (err) return rej(err);
          res({ count, support });
        }
      );
    });
  }
}
