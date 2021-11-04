import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
import { PrescriptionModel } from "../../models/PrescriptionModel";
import { IPrescriptionService } from "../PrescriptionService";
import { PrescriptionMessage } from "../../messages/PrescriptionMessage";
import { PrescriptionFilters } from "../../services/filters/PrescriptionFilters";

export class PrescriptionService
  extends JsonRPCCredService
  implements IPrescriptionService
{
  /**
   * Возвращает назначение по идентификатору.
   * @param id идентификатор результата записи
   * @param cb callback
   */
  public getPrescriptionById(
    id: string,
    cb: (err: any, p: PrescriptionMessage) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD,
      { id: id },
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrors_ = payload["validationErrors"];
        cb(null, payload["prescription"]);
      }
    );
  }

  public getPrescriptionByIdAsync(id: string): Promise<PrescriptionMessage> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPrescriptionById(id, (err: any, pm: PrescriptionMessage) => {
        if (err) return rej(err);

        res(pm);
      });
    });
  }

  public getPatientPrescriptions(
    patientId: string,
    limit: number,
    offset: number,
    cb: (err: any, p: PrescriptionMessage[]) => void
  ): void {
    let params = { patientId: patientId, limit: limit, offset: offset };
    this.exec(
      Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        return cb(null, payload["prescriptions"]);
      }
    );
  }

  public getPatientPrescriptionsAsync(
    patientId: string,
    limit: number,
    offset: number
  ): Promise<PrescriptionMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientPrescriptions(
        patientId,
        limit,
        offset,
        (err: any, values: PrescriptionMessage[]) => {
          if (err) return rej(err);

          res(values);
        }
      );
    });
  }

  getPrescriptions(
    limit: number,
    offset: number,
    cb: (err: any, p: PrescriptionMessage[]) => void
  ): void {
    let params = { limit: limit, offset: offset };
    this.exec(
      Handlers.HANDLER_GET_PRESCRIPTIONS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        return cb(null, payload["prescriptions"]);
      }
    );
  }

  getPrescriptionsAsync(
    limit: number,
    offset: number
  ): Promise<PrescriptionMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPrescriptions(
        limit,
        offset,
        (err: any, values: PrescriptionMessage[]) => {
          if (err) return rej(err);

          res(values);
        }
      );
    });
  }

  getFilteredPrescriptions(
    filters: PrescriptionFilters,
    limit: number,
    offset: number,
    cb: (err: any, p: PrescriptionMessage[]) => void
  ): void {
    let params = { filters: filters.plain(), limit: limit, offset: offset };
    this.exec(
      Handlers.HANDLER_GET_PRESCRIPTIONS_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        return cb(null, payload["prescriptions"]);
      }
    );
  }

  getFilteredPrescriptionsAsync(
    filters: PrescriptionFilters,
    limit: number,
    offset: number
  ): Promise<PrescriptionMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getFilteredPrescriptions(
        filters,
        limit,
        offset,
        (err: any, values: PrescriptionMessage[]) => {
          if (err) return rej(err);

          res(values);
        }
      );
    });
  }

  getPrescriptionsCount(
    cb: (err: any, count: number, support: boolean) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PRESCRIPTIONS_COUNT_METHOD,
      {},
      (err: any, payload: object) => {
        if (err) return cb(err, null, false);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"]);
      }
    );
  }

  getPrescriptionsCountAsync(): Promise<{ count: number; support: boolean }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPrescriptionsCount(
        (err: any, count: number, support: boolean) => {
          if (err) return rej(err);

          res({ count, support });
        }
      );
    });
  }

  getPatientPrescriptionsCount(
    patientId: string,
    cb: (err: any, count: number, support: boolean) => void
  ): void {
    this.exec(
      Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_COUNT_METHOD,
      { patientId },
      (err: any, payload: object) => {
        if (err) return cb(err, null, false);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"]);
      }
    );
  }

  getPatientPrescriptionsCountAsync(
    patientId: string
  ): Promise<{ count: number; support: boolean }> {
    const service = this;
    return new Promise((res, rej) => {
      service.getPatientPrescriptionsCount(
        patientId,
        (err: any, count: number, support: boolean) => {
          if (err) return rej(err);

          res({ count, support });
        }
      );
    });
  }

  public searchPrescriptions(
    includes: string[],
    excludes: string[],
    filters: PrescriptionFilters,
    limit: number,
    offset: number,
    cb: (err: any, p: PrescriptionMessage[]) => void
  ): void {
    const _this = this;
    this.exec(
      Handlers.HANDLER_SEARCH_PRESCRIPTIONS_METHOD,
      { includes, excludes, filters: filters.plain(), limit, offset },
      (err: any, payload: object) => {
        if (err) return cb(err, []);

        _this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["prescriptions"]);
      }
    );
  }

  public searchPrescriptionsAsync(
    includes: string[],
    excludes: string[],
    filters: PrescriptionFilters,
    limit: number,
    offset: number
  ): Promise<PrescriptionMessage[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.searchPrescriptions(
        includes,
        excludes,
        filters,
        limit,
        offset,
        (err: any, reports: PrescriptionMessage[]) => {
          if (err) return rej(err);
          res(reports);
        }
      );
    });
  }

  public searchPrescriptionsCount(
    includes: string[],
    excludes: string[],
    filters: PrescriptionFilters,
    cb: (err: any, count: number, support: boolean) => void
  ): void {
    const _this = this;
    this.exec(
      Handlers.HANDLER_SEARCH_PRESCRIPTIONS_COUNT_METHOD,
      { includes, excludes, filters: filters.plain() },
      (err: any, payload: object) => {
        if (err) return cb(err, 0, false);

        _this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["count"], payload["support"]);
      }
    );
  }

  public searchPrescriptionsCountAsync(
    includes: string[],
    excludes: string[],
    filters: PrescriptionFilters
  ): Promise<{ count: number; support: boolean }> {
    const service = this;
    return new Promise((res, rej) => {
      service.searchPrescriptionsCount(
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
