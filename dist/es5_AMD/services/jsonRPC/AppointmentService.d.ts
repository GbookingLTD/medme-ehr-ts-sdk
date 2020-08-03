import { IAppointmentService } from "../AppointmentService";
import { AppointmentModel } from "../../models/AppointmentModel";
import { AppointmentInputProperties } from "../../types/AppointmentInputProperties";
import { JsonRPCCredService } from "./jsonRpcService";
export declare class AppointmentService extends JsonRPCCredService implements IAppointmentService {
    getAppointmentModelById(id: string, cb: (err: any, appointment: AppointmentModel) => void): void;
    saveAppointment(appointmentProperties: AppointmentInputProperties, cb: (err: any, appointmentId: string) => void): void;
    getPatientAppointments(patientId: string, limit: number, offset: number, cb: (err: any, appointments: AppointmentModel[]) => void): void;
}
