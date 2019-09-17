import { flatbuffers } from '../../../../flatbuffer/dist/ts/flatbuffers';
import { MedMe as FbsResponse } from '../../../../flatbuffer/dist/ts/response_generated';
import { MedMe as MF0 } from '../../../../flatbuffer/dist/ts/medme-ehr-base_generated';
import { MedMe as MF1 } from '../../../../flatbuffer/dist/ts/medme-ehr-appointment_generated';

import { IAppointmentService } from '../AppointmentService';

import { BinRPCService } from "./BinRpcService";
import { Handlers } from '../../Handlers';
import { AppointmentModel } from "../../models/AppointmentModel";
import { AppointmentInputProperties } from "../../types/AppointmentInputProperties";

let readInt32 = function(b: Uint8Array, offs: number) {
    return b[offs] | b[offs + 1] << 8 | b[offs + 2] << 16 | b[offs + 3] << 24;
};

export class AppointmentService extends BinRPCService 
    implements IAppointmentService {

    public getAppointmentModelById(id: string, cb: (appointment: AppointmentModel) => void): void {
        this.exec(Handlers.HANDLER_GET_APPOINTMENT_BY_ID, (payload: { buffer: Uint8Array, replace: boolean }) => {
            let builder = new flatbuffers.Builder(1);

            let idValue = builder.createString(id);
            MF0.EHR.FlatBuffers.ID.startID(builder);
            MF0.EHR.FlatBuffers.ID.addValue(builder, idValue);
            let idOffset = MF0.EHR.FlatBuffers.ID.endID(builder);

            builder.finish(idOffset);

            // thanks for https://gist.github.com/alexvictoor/0b76764857b780ad8f83
            let bytes: Uint8Array = builder.asUint8Array();

            payload.buffer = bytes;
            payload.replace = true;
        }, (err: Error, resBuffer: ArrayBuffer) => {
            if (err)
                throw err;

            // read response header
            let headerBytes = new Uint8Array(resBuffer, 0, 8);
            let buf = new flatbuffers.ByteBuffer(headerBytes);
            let resHeaders = FbsResponse.EHR.FlatBuffers.ResponseHeader.getRootAsResponseHeader(buf);
            if (resHeaders.successCode() === FbsResponse.EHR.FlatBuffers.ResponseSuccessCodes.FAIL) {
                // handle request error
                throw new Error("response error code: " + resHeaders.errorCode());
            }

            // read appointment
            let payload = new Uint8Array(resBuffer, 8); // skip appointment size
            console.log(payload.slice(0, 10), payload.slice(payload.length-20));
            let payloadBuf = new flatbuffers.ByteBuffer(payload);
            let fbapp = MF1.EHR.FlatBuffers.Appointment.getRootAsAppointment(payloadBuf);

            let app = new AppointmentModel();
            app.fromFlatBuffers(fbapp);
            cb(app);
        });
    }
    public saveAppointment(appointmentProperties: AppointmentInputProperties, cb: (appointmentId: string) => void): void {
        // this.exec(Handlers.HANDLER_SAVE_APPOINTMENT, (payload: { buffer: Uint8Array, replace: boolean }) => {
        //     let fbapp = appointment.toFlatBuffers() as MF1.EHR.FlatBuffers.Appointment;
        //     let bytes = fbapp.bb.bytes();

        //     payload.buffer = bytes;
        //     payload.replace = true;
        // }, (err: Error, resBody: Uint8Array) => {
        //     console.log(err, resBody);
        // });
    }

    getPatientAppointments(patientId: string, limit: number, offset: number, 
        cb: (err: any, appointments: AppointmentModel[]) => void): void {
        throw new Error("not implemented");
    }
}
