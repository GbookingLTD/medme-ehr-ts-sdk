import { CursorType } from "../../types/CursorType"
import { IAppointmentService } from "../AppointmentService";
import { AppointmentInputProperties } from "../../types/AppointmentInputProperties";
import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
import { AppointmentMessage } from "../../messages/AppointmentMessage";
import { AppointmentFilters } from "../../services/filters/AppointmentFilters";

export class AppointmentService
  extends JsonRPCCredService
  implements IAppointmentService
{
  public getAppointmentById(
    id: string,
    cb: (err: any, appointment: AppointmentMessage) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD,
      { id: id },
      (err: any, payload: object) => {
        if (err) return cb(err, null);
        return cb(null, payload["appointment"]);
      }
    );
  }

  public getAppointmentByIdAsync(id: string): Promise<AppointmentMessage> {
    const service = this;
    return new Promise((res, rej) => {
      service.getAppointmentById(
        id,
        (err: any, appointment: AppointmentMessage) => {
          // console.log("appointment.patientId:", appointment.patientId);
          if (err) return rej(err);

          res(appointment);
        }
      );
    });
  }

  public getPatientAppointments(
    patientId: string,
    limit: number,
    offset: number,
    prevCreated: string,
    cb: (err: any, appointments: AppointmentMessage[]) => void
  ): void {
    let params = { patientId, limit, offset, lastItemCreated: prevCreated };
    this.exec(
      Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);
        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        return cb(null, payload["appointments"]);
      }
    );
  }
  public async getPatientAppointmentsAsync(
    patientId: string,
    limit: number,
    offset: number,
    prevCreated: string
  ): Promise<AppointmentMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientAppointments(
        patientId,
        limit,
        offset,
        prevCreated,
        (err: any, appointments: AppointmentMessage[]) => {
          if (err) return rej(err);

          res(appointments);
        }
      );
    });
  }

  getAppointments(
    limit: number,
    offset: number,
    lastId: string,
    prevCreated: string,
    cb: (err: any, appointments: AppointmentMessage[]) => void
  ): void {
    let params = prevCreated
      ? { limit, lastItemCreated: prevCreated }
      : (lastId
      ? { limit, lastItemId: lastId }
      : { limit: limit, offset: offset });
    this.exec(
      Handlers.HANDLER_GET_APPOINTMENTS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["appointments"]);
      }
    );
  }

  getAppointmentsAsync(
    limit: number,
    offset: number,
    lastId: string,
    prevCreated: string
  ): Promise<AppointmentMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getAppointments(
        limit,
        offset,
        lastId,
        prevCreated,
        (err: any, appointments: AppointmentMessage[]) => {
          if (err) return rej(err);

          res(appointments);
        }
      );
    });
  }

  getFilteredAppointments(
    filters: AppointmentFilters,
    limit: number,
    offset: number,
    cb: (err: any, appointments: AppointmentMessage[]) => void
  ): void {
    let params = { filters: filters.plain(), limit: limit, offset: offset };
    this.exec(
      Handlers.HANDLER_GET_APPOINTMENTS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["appointments"]);
      }
    );
  }

  getFilteredAppointmentsAsync(
    filters: AppointmentFilters,
    limit: number,
    offset: number
  ): Promise<AppointmentMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getFilteredAppointments(
        filters,
        limit,
        offset,
        (err: any, appointments: AppointmentMessage[]) => {
          if (err) return rej(err);

          res(appointments);
        }
      );
    });
  }

  getAppointmentsCount(
    cb: (err: any, count: number, support: boolean, cursorType: CursorType) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_APPOINTMENTS_COUNT_METHOD,
      {},
      (err: any, payload: object) => {
        if (err) return cb(err, null, false, CursorType.None);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"], payload["cursorType"]);
      }
    );
  }

  getAppointmentsCountAsync(): Promise<{ count: number; support: boolean; cursorType: CursorType }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getAppointmentsCount(
        (err: any, count: number, support: boolean, cursorType: CursorType) => {
          if (err) return rej(err);

          res({ count, support, cursorType });
        }
      );
    });
  }

  getPatientAppointmentsCount(
    patientId: string,
    cb: (err: any, count: number, support: boolean, cursorType: CursorType) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_COUNT_METHOD,
      { patientId },
      (err: any, payload: object) => {
        if (err) return cb(err, null, false, CursorType.None);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"], payload["cursorType"]);
      }
    );
  }

  getPatientAppointmentsCountAsync(
    patientId: string
  ): Promise<{ count: number; support: boolean; cursorType: CursorType }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientAppointmentsCount(
        patientId,
        (err: any, count: number, support: boolean, cursorType: CursorType) => {
          if (err) return rej(err);

          res({ count, support, cursorType });
        }
      );
    });
  }
}
