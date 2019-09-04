import { IAppointmentService } from "../AppointmentService";
import { AppointmentModel } from "../../models/AppointmentModel";
import { AppointmentInputProperties } from "../../types/AppointmentInputProperties";
import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";

export class AppointmentService extends JsonRPCCredService
        implements IAppointmentService {

    public getAppointmentModelById(id: string, cb: (err: any, appointment: AppointmentModel) => void): void {
        this.exec(Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD, {id: id}, (err: any, payload: object) => {
            if (err) return cb(err, null);
            let app = new AppointmentModel();
            app.fromJson(payload['appointment']);
            return cb(null, app);
        });
    }

    public saveAppointment(appointmentProperties: AppointmentInputProperties, cb: (err: any, appointmentId: string) => void): void {
        this.exec(Handlers.HANDLER_SAVE_APPOINTMENT_METHOD, {appointmentProperties: appointmentProperties}, (err: any, payload: object) => {
            if (err) return cb(err, null);
            return cb(null, payload["id"]);
        });
    }

    public getPatientAppointments(patientId: string, limit: number, offset: number, 
        cb: (err: any, appointments: AppointmentModel[]) => void): void {
            let params = {patientId: patientId, limit: limit, offset: offset};
            this.exec(Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD, params, (err: any, payload: object) => {
                if (err) return cb(err, null);
                let appointments = payload['appointments'].map((jsonApp: object) => {
                    let app = new AppointmentModel();
                    app.fromJson(jsonApp);
                    return app;
                });
                return cb(null, appointments);
            });
    }
}