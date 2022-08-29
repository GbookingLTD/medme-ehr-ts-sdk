import { JsonRPCCredService } from "./jsonRpcService";
import { IPatientService, SearchPatientEhrFilters, SearchPatientEhrKeywords, SearchPatientEhrResultItem } from "../PatientService";
import { UserSign } from "../../types/UserSign";
import { PatientMessage } from "../../messages/PatientMessage";
import { PatientFilters } from "../../services/filters/PatientFilters";
export declare class PatientService extends JsonRPCCredService implements IPatientService {
    getPatient(cb: (err?: any, patient?: PatientMessage, userSign?: UserSign) => void): void;
    getPatientAsync(): Promise<{
        patient: PatientMessage;
        userSign: UserSign;
    }>;
    getPatientById(id: string, cb: (err?: any, patient?: PatientMessage, userSign?: UserSign) => void): void;
    getPatientByIdAsync(id: string): Promise<{
        patient: PatientMessage;
    }>;
    getPatients(limit: number, offset: number, lastId: string, cb: (err: any, patients: PatientMessage[]) => void): void;
    getPatientsAsync(limit: number, offset: number, lastId: string): Promise<PatientMessage[]>;
    getFilteredPatients(filters: PatientFilters, limit: number, offset: number, cb: (err: any, patients: PatientMessage[]) => void): void;
    getFilteredPatientsAsync(filters: PatientFilters, limit: number, offset: number): Promise<PatientMessage[]>;
    getPatientsCount(cb: (err: any, count: number, support: boolean) => void): void;
    getPatientsCountAsync(): Promise<{
        count: number;
        support: boolean;
    }>;
    findPatientsByPhone(phone: string, limit: number, offset: number, cb: (err: any, patients: PatientMessage[]) => void): void;
    findPatientsByPhoneAsync(phone: string, limit: number, offset: number): Promise<PatientMessage[]>;
    findPatientsByMedCard(medCard: string, limit: number, offset: number, cb: (err: any, patients: PatientMessage[]) => void): void;
    findPatientsByMedCardAsync(medCard: string, limit: number, offset: number): Promise<PatientMessage[]>;
    searchPatientEhr(keywords: SearchPatientEhrKeywords, filters: SearchPatientEhrFilters, offsetPatientId: number, limit: number, cb: (err: any, result: SearchPatientEhrResultItem[]) => void): void;
    searchPatientEhrAsync(keywords: SearchPatientEhrKeywords, filters: SearchPatientEhrFilters, offsetPatientId: number, limit: number): Promise<SearchPatientEhrResultItem[]>;
    searchPatientEhrCount(keywords: SearchPatientEhrKeywords, filters: SearchPatientEhrFilters, cb: (err: any, count: number, support: boolean) => void): void;
    searchPatientEhrCountAsync(keywords: SearchPatientEhrKeywords, filters: SearchPatientEhrFilters): Promise<{
        count: number;
        support: boolean;
    }>;
}
//# sourceMappingURL=PatientService.d.ts.map