import { JsonRPCCredService } from "./jsonRpcService";
import { IPatientService } from "../PatientService";
import { PatientInfo } from "../../types/PatientInfo";
import { Handlers } from "../../Handlers";
import { PatientModel } from "../../models/PatientModel";
import { UserSign } from "../../types/UserSign";
import { PatientMessage } from "../../messages/PatientMessage";
import { PatientFilters } from "../../services/filters/PatientFilters";

export class PatientService
  extends JsonRPCCredService
  implements IPatientService
{
  public getPatient(
    cb: (err?: any, patient?: PatientModel, userSign?: UserSign) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENT_METHOD,
      {},
      (err: any, payload: object) => {
        if (err) return cb(err);

        if (!payload["userSign"]) return cb(new Error("userSign not found"));

        let patient = new PatientModel();
        this.lastValidationErrors_ = payload["validationErrors"];
        patient.fromJson(payload["patient"]);
        return cb(err, patient, payload["userSign"]);
      }
    );
  }

  public getPatientAsync(): Promise<{
    patient: PatientModel;
    userSign: UserSign;
  }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatient((err, patient, userSign) => {
        if (err) return rej(err);

        res({ patient, userSign });
      });
    });
  }

  public getPatientById(
    id: string,
    cb: (err?: any, patient?: PatientModel, userSign?: UserSign) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENT_BY_ID_METHOD,
      { id },
      (err: any, payload: object) => {
        if (err) return cb(err);

        this.lastValidationErrors_ = payload["validationErrors"];
        return cb(err, payload["patient"]);
      }
    );
  }

  public getPatientByIdAsync(id: string): Promise<{
    patient: PatientModel;
  }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientById(id, (err, patient) => {
        if (err) return rej(err);

        res({ patient });
      });
    });
  }

  public getPatients(
    limit: number,
    offset: number,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENTS_METHOD,
      { limit, offset },
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        return cb(err, payload["patients"]);
      }
    );
  }

  public getPatientsAsync(
    limit: number,
    offset: number
  ): Promise<PatientMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatients(limit, offset, (err, patients) => {
        if (err) return rej(err);

        res(patients);
      });
    });
  }

  public getFilteredPatients(
    filters: PatientFilters,
    limit: number,
    offset: number,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENTS_METHOD,
      { filters: filters.plain(), limit, offset },
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        return cb(err, payload["patients"]);
      }
    );
  }

  public getFilteredPatientsAsync(
    filters: PatientFilters,
    limit: number,
    offset: number
  ): Promise<PatientMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getFilteredPatients(filters, limit, offset, (err, patients) => {
        if (err) return rej(err);

        res(patients);
      });
    });
  }

  public getPatientsCount(
    cb: (err: any, count: number, support: boolean) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENTS_COUNT_METHOD,
      {},
      (err: any, payload: object) => {
        if (err) return cb(err, null, false);

        return cb(err, payload["count"], payload["support"]);
      }
    );
  }

  public getPatientsCountAsync(): Promise<{ count: number; support: boolean }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientsCount((err, count, support) => {
        if (err) return rej(err);

        res({ count, support });
      });
    });
  }
}
