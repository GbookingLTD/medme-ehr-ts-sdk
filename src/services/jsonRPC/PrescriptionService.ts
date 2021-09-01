import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
import { PrescriptionModel } from "../../models/PrescriptionModel";
import { IPrescriptionService } from "../PrescriptionService";
import { PrescriptionMessage } from "../../messages/PrescriptionMessage";

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
}
