import { CursorType } from "../../types/CursorType";
import { JsonRPCCredService } from "./jsonRpcService";
import { ReqOptions } from "../ReqOptions";
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
    getPrescriptionById(id: string, opts: ReqOptions, cb: (err: any, p: PrescriptionMessage) => void): void;
    getPrescriptionByIdAsync(id: string, opts: ReqOptions): Promise<PrescriptionMessage>;
    getPatientPrescriptions(patientId: string, limit: number, offset: number, prevCreated: string, opts: ReqOptions, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    getPatientPrescriptionsAsync(patientId: string, limit: number, offset: number, prevCreated: string, opts: ReqOptions): Promise<PrescriptionMessage[]>;
    getPrescriptions(limit: number, offset: number, lastId: string, prevCreated: string, opts: ReqOptions, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    getPrescriptionsAsync(limit: number, offset: number, lastId: string, prevCreated: string, opts: ReqOptions): Promise<PrescriptionMessage[]>;
    getFilteredPrescriptions(filters: PrescriptionFilters, limit: number, offset: number, opts: ReqOptions, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    getFilteredPrescriptionsAsync(filters: PrescriptionFilters, limit: number, offset: number, opts: ReqOptions): Promise<PrescriptionMessage[]>;
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
    searchPrescriptions(includes: string[], excludes: string[], filters: PrescriptionFilters, limit: number, offset: number, opts: ReqOptions, cb: (err: any, p: PrescriptionMessage[]) => void): void;
    searchPrescriptionsAsync(includes: string[], excludes: string[], filters: PrescriptionFilters, limit: number, offset: number, opts: ReqOptions): Promise<PrescriptionMessage[]>;
    searchPrescriptionsCount(includes: string[], excludes: string[], filters: PrescriptionFilters, cb: (err: any, count: number, support: boolean) => void): void;
    searchPrescriptionsCountAsync(includes: string[], excludes: string[], filters: PrescriptionFilters): Promise<{
        count: number;
        support: boolean;
    }>;
}
