import { JsonRPCCredService } from "./jsonRpcService";
import { IPrescriptionService } from "../PrescriptionService";
import { PrescriptionMessage } from "../../messages/PrescriptionMessage";
import { PrescriptionFilters } from "../../services/filters/PrescriptionFilters";
export declare class PrescriptionService extends JsonRPCCredService implements IPrescriptionService {
    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getPrescriptionById(id: string, cb: (err: any, p: PrescriptionMessage) => void): void;
    getPrescriptionByIdAsync(id: string): Promise<PrescriptionMessage>;
    getPatientPrescriptions(patientId: string, limit: number, offset: number, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    getPatientPrescriptionsAsync(patientId: string, limit: number, offset: number): Promise<PrescriptionMessage[]>;
    getPrescriptions(limit: number, offset: number, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    getPrescriptionsAsync(limit: number, offset: number): Promise<PrescriptionMessage[]>;
    getFilteredPrescriptions(filters: PrescriptionFilters, limit: number, offset: number, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    getFilteredPrescriptionsAsync(filters: PrescriptionFilters, limit: number, offset: number): Promise<PrescriptionMessage[]>;
    getPrescriptionsCount(cb: (err: any, count: number, support: boolean) => void): void;
    getPrescriptionsCountAsync(): Promise<{
        count: number;
        support: boolean;
    }>;
    getPatientPrescriptionsCount(patientId: string, cb: (err: any, count: number, support: boolean) => void): void;
    getPatientPrescriptionsCountAsync(patientId: string): Promise<{
        count: number;
        support: boolean;
    }>;
}
