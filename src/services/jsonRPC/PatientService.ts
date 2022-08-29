import { JsonRPCCredService } from "./jsonRpcService";
import {
  IPatientService,
  SearchPatientEhrFilters,
  SearchPatientEhrKeywords,
  SearchPatientEhrResultItem,
} from "../PatientService";
import { PatientInfo } from "../../types/PatientInfo";
import { Handlers } from "../../Handlers";
import { UserSign } from "../../types/UserSign";
import { PatientMessage } from "../../messages/PatientMessage";
import { PatientFilters } from "../../services/filters/PatientFilters";

export class PatientService
  extends JsonRPCCredService
  implements IPatientService
{
  public getPatient(
    cb: (err?: any, patient?: PatientMessage, userSign?: UserSign) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENT_METHOD,
      {},
      (err: any, payload: object) => {
        if (err) return cb(err);

        if (!payload["userSign"]) return cb(new Error("userSign not found"));

        this.lastValidationErrors_ = payload["validationErrors"];
        return cb(err, payload["patient"], payload["userSign"]);
      }
    );
  }

  public getPatientAsync(): Promise<{
    patient: PatientMessage;
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
    cb: (err?: any, patient?: PatientMessage, userSign?: UserSign) => void
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
    patient: PatientMessage;
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
    lastId: string,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENTS_METHOD,
      lastId ? { limit, lastItemId: lastId } : { limit, offset },
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        return cb(err, payload["patients"]);
      }
    );
  }

  public getPatientsAsync(
    limit: number,
    offset: number,
    lastId: string
  ): Promise<PatientMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatients(limit, offset, lastId, (err, patients) => {
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

  public findPatientsByPhone(
    phone: string,
    limit: number,
    offset: number,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void {
    this.exec(
      Handlers.HANDLER_FIND_PATIENTS_BY_PHONE_METHOD,
      { phone, limit, offset },
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        return cb(err, payload["patients"]);
      }
    );
  }

  public findPatientsByPhoneAsync(
    phone: string,
    limit: number,
    offset: number
  ): Promise<PatientMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.findPatientsByPhone(phone, limit, offset, (err, patients) => {
        if (err) return rej(err);

        res(patients);
      });
    });
  }

  public findPatientsByMedCard(
    medCard: string,
    limit: number,
    offset: number,
    cb: (err: any, patients: PatientMessage[]) => void
  ): void {
    this.exec(
      Handlers.HANDLER_FIND_PATIENTS_BY_MEDCARD_METHOD,
      { medcardNumber: medCard, limit, offset },
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        return cb(err, payload["patients"]);
      }
    );
  }

  public findPatientsByMedCardAsync(
    medCard: string,
    limit: number,
    offset: number
  ): Promise<PatientMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.findPatientsByMedCard(medCard, limit, offset, (err, patients) => {
        if (err) return rej(err);

        res(patients);
      });
    });
  }

  public searchPatientEhr(
    keywords: SearchPatientEhrKeywords,
    filters: SearchPatientEhrFilters,
    offsetPatientId: number,
    limit: number,
    cb: (err: any, result: SearchPatientEhrResultItem[]) => void
  ) {
    this.exec(
      Handlers.HANDLER_SEARCH_PATIENT_EHR_METHOD,
      {
        keywords,
        filters: {
          patientFilters: filters.patientFilters.plain(),
          appointmentResultFilters: filters.appointmentResultFilters.plain(),
          diagnosticReportFilters: filters.diagnosticReportFilters.plain(),
          prescriptionFilters: filters.prescriptionFilters.plain(),
        },
        offsetPatientId,
        limit,
      },
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        return cb(null, payload["results"]);
      }
    );
  }

  public searchPatientEhrAsync(
    keywords: SearchPatientEhrKeywords,
    filters: SearchPatientEhrFilters,
    offsetPatientId: number,
    limit: number
  ): Promise<SearchPatientEhrResultItem[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.searchPatientEhr(
        keywords,
        filters,
        offsetPatientId,
        limit,
        (err, result) => {
          if (err) return rej(err);
          res(result);
        }
      );
    });
  }

  public searchPatientEhrCount(
    keywords: SearchPatientEhrKeywords,
    filters: SearchPatientEhrFilters,
    cb: (err: any, count: number, support: boolean) => void
  ) {
    this.exec(
      Handlers.HANDLER_SEARCH_PATIENT_EHR_COUNT_METHOD,
      {
        keywords,
        filters: {
          patientFilters: filters.patientFilters.plain(),
          appointmentResultFilters: filters.appointmentResultFilters.plain(),
          diagnosticReportFilters: filters.diagnosticReportFilters.plain(),
          prescriptionFilters: filters.prescriptionFilters.plain(),
        },
      },
      (err: any, payload: object) => {
        if (err) return cb(err, null, false);

        return cb(err, payload["count"], payload["support"]);
      }
    );
  }

  public searchPatientEhrCountAsync(
    keywords: SearchPatientEhrKeywords,
    filters: SearchPatientEhrFilters
  ): Promise<{ count: number; support: boolean }> {
    const service = this;
    return new Promise((res, rej) => {
      service.searchPatientEhrCount(
        keywords,
        filters,
        (err, count, support) => {
          if (err) return rej(err);
          res({ count, support });
        }
      );
    });
  }
}
