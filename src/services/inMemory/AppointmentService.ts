import { flatbuffers } from '../../../../flatbuffer/dist/ts/flatbuffers';
import { MedMe as MF0 } from '../../../../flatbuffer/dist/ts/medme-ehr-base_generated';
import { MedMe as MF1 } from '../../../../flatbuffer/dist/ts/medme-ehr-appointment_generated';

import { IAppointmentService } from '../AppointmentService';
import { AppointmentModel } from "../../models/AppointmentModel";
import { AppointmentInputProperties } from "../../types/AppointmentInputProperties";

export class AppointmentService implements IAppointmentService {
    private data_: Array<object>;

    public constructor() {
        this.data_ = new Array<object>();
        this.initialize();
    }

    public initialize(): void {
        let builder = new flatbuffers.Builder(0);
        let idValue = builder.createString("1");
        let patientIdValue = builder.createString("parent_id");

        MF0.EHR.FlatBuffers.ID.startID(builder);
        MF0.EHR.FlatBuffers.ID.addValue(builder, idValue);
        let idOffset = MF0.EHR.FlatBuffers.ID.endID(builder);

        MF0.EHR.FlatBuffers.ID.startID(builder);
        MF0.EHR.FlatBuffers.ID.addValue(builder, patientIdValue);
        let patientIdOffset = MF0.EHR.FlatBuffers.ID.endID(builder);

        MF1.EHR.FlatBuffers.Appointment.startAppointment(builder);
        MF1.EHR.FlatBuffers.Appointment.addId(builder, idOffset);
        MF1.EHR.FlatBuffers.Appointment.addPatientId(builder, patientIdOffset);
        let appOffset = MF1.EHR.FlatBuffers.Appointment.endAppointment(builder);

        builder.finish(appOffset);
        
        let arr = builder.asUint8Array();
        let bb = new flatbuffers.ByteBuffer(arr);
        let app = MF1.EHR.FlatBuffers.Appointment.getRootAsAppointment(bb);
        this.data_.push(app);
    }

    public getAppointmentModelById(id: string, cb: (appointment: AppointmentModel) => void): void {
        let fbapp = this.data_.find((item: MF1.EHR.FlatBuffers.Appointment) => item.id().value() == id);
        let app = new AppointmentModel();
        app.fromFlatBuffers(fbapp);
        cb(app);
    }

    public saveAppointment(appointmentProperties: AppointmentInputProperties, cb: (appointmentId: string) => void): void {
        // this.data_.push(appointment.toFlatBuffers());
    }

    getPatientAppointments(patientId: string, limit: number, offset: number, 
        cb: (err:any, appointments: AppointmentModel[]) => void): void {
        throw new Error("not implemented");
    }
}