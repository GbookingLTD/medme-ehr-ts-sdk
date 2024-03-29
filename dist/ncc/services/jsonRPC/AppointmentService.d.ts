import { IAppointmentService } from "../AppointmentService";
import { AppointmentModel } from "../../models/AppointmentModel";
import { JsonRPCCredService } from "./jsonRpcService";
import { AppointmentMessage } from "../../messages/AppointmentMessage";
import { AppointmentFilters } from "../../services/filters/AppointmentFilters";
export declare class AppointmentService extends JsonRPCCredService implements IAppointmentService {
    getAppointmentById(id: string, cb: (err: any, appointment: AppointmentMessage) => void): void;
    getAppointmentByIdAsync(id: string): Promise<AppointmentMessage>;
    getPatientAppointments(patientId: string, limit: number, offset: number, cb: (err: any, appointments: AppointmentModel[]) => void): void;
    getPatientAppointmentsAsync(patientId: string, limit: number, offset: number): Promise<AppointmentModel[]>;
    getAppointments(limit: number, offset: number, cb: (err: any, appointments: AppointmentMessage[]) => void): void;
    getAppointmentsAsync(limit: number, offset: number): Promise<AppointmentMessage[]>;
    getFilteredAppointments(filters: AppointmentFilters, limit: number, offset: number, cb: (err: any, appointments: AppointmentMessage[]) => void): void;
    getFilteredAppointmentsAsync(filters: AppointmentFilters, limit: number, offset: number): Promise<AppointmentMessage[]>;
    getAppointmentsCount(cb: (err: any, count: number, support: boolean) => void): void;
    getAppointmentsCountAsync(): Promise<{
        count: number;
        support: boolean;
    }>;
    getPatientAppointmentsCount(patientId: string, cb: (err: any, count: number, support: boolean) => void): void;
    getPatientAppointmentsCountAsync(patientId: string): Promise<{
        count: number;
        support: boolean;
    }>;
}
