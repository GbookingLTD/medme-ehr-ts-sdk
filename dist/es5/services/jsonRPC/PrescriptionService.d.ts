import { JsonRPCCredService } from "./jsonRpcService";
import { PrescriptionModel } from "../../models/PrescriptionModel";
import { IPrescriptionService } from "../PrescriptionService";
export declare class PrescriptionService extends JsonRPCCredService implements IPrescriptionService {
    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getPrescriptionById(id: string, cb: (err: any, p: PrescriptionModel) => void): void;
    getPrescriptionByIdAsync(id: string): Promise<PrescriptionModel>;
    getPatientPrescriptions(patientId: string, limit: number, offset: number, cb: (err: any, p: PrescriptionModel[]) => void): void;
    getPatientPrescriptionsAsync(patientId: string, limit: number, offset: number): Promise<PrescriptionModel[]>;
}
