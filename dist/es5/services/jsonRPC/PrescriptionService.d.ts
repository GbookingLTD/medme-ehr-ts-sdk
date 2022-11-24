import { CursorType } from "../../types/CursorType";
import { JsonRPCCredService } from "./jsonRpcService";
import { IPrescriptionService } from "../PrescriptionService";
import { PrescriptionMessage } from "../../messages/PrescriptionMessage";
import { PrescriptionFilters } from "../../services/filters/PrescriptionFilters";
export declare class PrescriptionService extends JsonRPCCredService implements IPrescriptionService {
    recognitionResults: object[];
    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getPrescriptionById(id: string, cb: (err: any, p: PrescriptionMessage) => void): void;
    getPrescriptionByIdAsync(id: string): Promise<PrescriptionMessage>;
    getPatientPrescriptions(patientId: string, limit: number, offset: number, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    getPatientPrescriptionsAsync(patientId: string, limit: number, offset: number): Promise<PrescriptionMessage[]>;
    getPrescriptions(limit: number, offset: number, lastId: string, prevCreated: string, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    getPrescriptionsAsync(limit: number, offset: number, lastId: string, prevCreated: string): Promise<PrescriptionMessage[]>;
    getFilteredPrescriptions(filters: PrescriptionFilters, limit: number, offset: number, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    getFilteredPrescriptionsAsync(filters: PrescriptionFilters, limit: number, offset: number): Promise<PrescriptionMessage[]>;
    getPrescriptionsCount(cb: (err: any, count: number, support: boolean, cursorType: CursorType) => void): void;
    getPrescriptionsCountAsync(): Promise<{
        count: number;
        support: boolean;
        cursorType: CursorType;
    }>;
    getPatientPrescriptionsCount(patientId: string, cb: (err: any, count: number, support: boolean, cursorType: CursorType) => void): void;
    getPatientPrescriptionsCountAsync(patientId: string): Promise<{
        count: number;
        support: boolean;
        cursorType: CursorType;
    }>;
    searchPrescriptions(includes: string[], excludes: string[], filters: PrescriptionFilters, limit: number, offset: number, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    searchPrescriptionsAsync(includes: string[], excludes: string[], filters: PrescriptionFilters, limit: number, offset: number): Promise<PrescriptionMessage[]>;
    searchPrescriptionsCount(includes: string[], excludes: string[], filters: PrescriptionFilters, cb: (err: any, count: number, support: boolean) => void): void;
    searchPrescriptionsCountAsync(includes: string[], excludes: string[], filters: PrescriptionFilters): Promise<{
        count: number;
        support: boolean;
    }>;
}
