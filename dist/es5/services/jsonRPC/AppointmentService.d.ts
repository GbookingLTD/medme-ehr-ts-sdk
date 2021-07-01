import { IAppointmentService } from "../AppointmentService";
import { AppointmentModel } from "../../models/AppointmentModel";
import { JsonRPCCredService } from "./jsonRpcService";
export declare class AppointmentService extends JsonRPCCredService implements IAppointmentService {
    getAppointmentById(id: string, cb: (err: any, appointment: AppointmentModel) => void): void;
    getAppointmentByIdAsync(id: string): Promise<AppointmentModel>;
    getPatientAppointments(patientId: string, limit: number, offset: number, cb: (err: any, appointments: AppointmentModel[]) => void): void;
    getPatientAppointmentsAsync(patientId: string, limit: number, offset: number): Promise<AppointmentModel[]>;
}
