import { CursorType } from "../../types/CursorType";
import { IAppointmentService } from "../AppointmentService";
import { JsonRPCCredService } from "./jsonRpcService";
import { AppointmentMessage } from "../../messages/AppointmentMessage";
import { AppointmentFilters } from "../../services/filters/AppointmentFilters";
export declare class AppointmentService extends JsonRPCCredService implements IAppointmentService {
    getAppointmentById(id: string, cb: (err: any, appointment: AppointmentMessage) => void): void;
    getAppointmentByIdAsync(id: string): Promise<AppointmentMessage>;
    getPatientAppointments(patientId: string, limit: number, offset: number, prevCreated: string, cb: (err: any, appointments: AppointmentMessage[]) => void): void;
    getPatientAppointmentsAsync(patientId: string, limit: number, offset: number, prevCreated: string): Promise<AppointmentMessage[]>;
    getAppointments(limit: number, offset: number, lastId: string, prevCreated: string, cb: (err: any, appointments: AppointmentMessage[]) => void): void;
    getAppointmentsAsync(limit: number, offset: number, lastId: string, prevCreated: string): Promise<AppointmentMessage[]>;
    getFilteredAppointments(filters: AppointmentFilters, limit: number, offset: number, cb: (err: any, appointments: AppointmentMessage[]) => void): void;
    getFilteredAppointmentsAsync(filters: AppointmentFilters, limit: number, offset: number): Promise<AppointmentMessage[]>;
    getAppointmentsCount(cb: (err: any, count: number, support: boolean, cursorType: CursorType) => void): void;
    getAppointmentsCountAsync(): Promise<{
        count: number;
        support: boolean;
        cursorType: CursorType;
    }>;
    getPatientAppointmentsCount(patientId: string, cb: (err: any, count: number, support: boolean, cursorType: CursorType) => void): void;
    getPatientAppointmentsCountAsync(patientId: string): Promise<{
        count: number;
        support: boolean;
        cursorType: CursorType;
    }>;
}
