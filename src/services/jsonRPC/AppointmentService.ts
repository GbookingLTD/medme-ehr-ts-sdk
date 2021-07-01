import { IAppointmentService } from "../AppointmentService";
import { AppointmentModel } from "../../models/AppointmentModel";
import { AppointmentInputProperties } from "../../types/AppointmentInputProperties";
import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";

export class AppointmentService extends JsonRPCCredService
        implements IAppointmentService {

    public getAppointmentById(id: string, cb: (err: any, appointment: AppointmentModel) => void): void {
        this.exec(Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD, {id: id}, (err: any, payload: object) => {
            if (err) return cb(err, null);
            let app = new AppointmentModel();
            app.fromJson(payload['appointment']);
            return cb(null, app);
        });
    }

    public getAppointmentByIdAsync(id: string): Promise<AppointmentModel> {
        const service = this;
        return new Promise((res, rej) => {
            service.getAppointmentById(id, (err: any, appointment: AppointmentModel) => {
                // console.log("appointment.patientId:", appointment.patientId);
                if (err) 
                    return rej(err);

                res(appointment);
            });
        });
    }

    public getPatientAppointments(patientId: string, limit: number, offset: number, 
        cb: (err: any, appointments: AppointmentModel[]) => void): void {
            let params = {patientId: patientId, limit: limit, offset: offset};
            this.exec(Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD, params, (err: any, payload: object) => {
                if (err) return cb(err, null);
                this.lastValidationErrorsOfList_ = payload['validationErrors'];
                let appointments = payload['appointments'].map((jsonApp: object) => {
                    let app = new AppointmentModel();
                    app.fromJson(jsonApp);
                    return app;
                });
                return cb(null, appointments);
            });
    }
    public async getPatientAppointmentsAsync(patientId: string, limit: number, 
            offset: number): Promise<AppointmentModel[]> {
        const service = this;
        return new Promise((res, rej) => {
            service.getPatientAppointments(patientId, limit, offset, (err: any, appointments: AppointmentModel[]) => {
                if (err)
                    return rej(err);

                res(appointments);
            });
        });
    }
}