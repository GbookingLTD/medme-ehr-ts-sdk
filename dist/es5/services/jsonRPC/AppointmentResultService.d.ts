import { IAppointmentResultService } from "../AppointmentResultService";
import { JsonRPCCredService } from "./jsonRpcService";
import { AppointmentResultMessage } from "../../messages/AppointmentResultMessage";
import { AppointmentFilters } from "../../services/filters/AppointmentFilters";
export declare class AppointmentResultService extends JsonRPCCredService implements IAppointmentResultService {
    /**
     * Возвращает результаты записи по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    getAppointmentResultById(id: string, cb: (err: any, appointmentResult: AppointmentResultMessage) => void): void;
    getAppointmentResultByIdAsync(id: string): Promise<AppointmentResultMessage>;
    getPatientAppointmentResults(patientId: string, limit: number, offset: number, cb: (err: any, appointmentResults: AppointmentResultMessage[]) => void): void;
    getPatientAppointmentResultsAsync(patientId: string, limit: number, offset: number): Promise<AppointmentResultMessage[]>;
    getAppointmentResults(limit: number, offset: number, lastId: string, prevCreated: string, cb: (err: any, appointmentResults: AppointmentResultMessage[]) => void): void;
    getAppointmentResultsAsync(limit: number, offset: number, lastId: string, prevCreated: string): Promise<AppointmentResultMessage[]>;
    getAppointmentResultsCount(cb: (err: any, count: number, support: boolean) => void): void;
    getAppointmentResultsCountAsync(): Promise<{
        count: number;
        support: boolean;
    }>;
    getPatientAppointmentResultsCount(patientId: string, cb: (err: any, count: number, support: boolean) => void): void;
    getPatientAppointmentResultsCountAsync(patientId: string): Promise<{
        count: number;
        support: boolean;
    }>;
    searchAppointmentResults(includes: string[], excludes: string[], filters: AppointmentFilters, limit: number, offset: number, cb: (err: any, p: AppointmentResultMessage[]) => void): void;
    searchAppointmentResultsAsync(includes: string[], excludes: string[], filters: AppointmentFilters, limit: number, offset: number): Promise<AppointmentResultMessage[]>;
    searchAppointmentResultsCount(includes: string[], excludes: string[], filters: AppointmentFilters, cb: (err: any, count: number, support: boolean) => void): void;
    searchAppointmentResultsCountAsync(includes: string[], excludes: string[], filters: AppointmentFilters): Promise<{
        count: number;
        support: boolean;
    }>;
}
