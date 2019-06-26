import { IAppointmentService } from "../AppointmentService";
import { AppointmentModel } from "../../models/AppointmentModel";
import { AppointmentInputProperties } from "../../types/AppointmentInputProperties";
import { JsonRPCService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";

export class AppointmentService extends JsonRPCService
        implements IAppointmentService {

    public getAppointmentModelById(id: string, cb: (appointment: AppointmentModel) => void): void {
        this.exec(Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD, {id: id}, (err: any, payload: object) => {
            if (err) throw new Error("failed to load appointment (id="+id+"): " + err);
            let app = new AppointmentModel();
            app.fromJson(payload['appointment']);
            cb(app);
        });
    }

    public saveAppointment(appointmentProperties: AppointmentInputProperties, cb: (appointmentId: string) => void): void {
        this.exec(Handlers.HANDLER_SAVE_APPOINTMENT_METHOD, {appointmentProperties: appointmentProperties}, (err: any, payload: object) => {
            if (err) throw new Error("failed to save appointment (id="+appointmentProperties.start+") " + err);
            cb(payload["id"]);
        });
    }

    public getPatientAppointments(patientId: string, limit: number, offset: number, 
        cb: (appointments: AppointmentModel[]) => void): void {
            let params = {patientId: patientId, limit: limit, offset: offset};
            this.exec(Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD, params, (err: any, payload: object) => {
                if (err) throw new Error("failed to load patient appointments (patientId="+patientId+"): " + err);
                let appointments = payload['appointments'].map((jsonApp: object) => {
                    let app = new AppointmentModel();
                    app.fromJson(jsonApp);
                    return app;
                });
                cb(appointments);
            });
    }
}