"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IAppointmentResultService } from '../src/services/AppointmentResultService';
import { AppointmentResultModel } from "../src/models/AppointmentResultModel";

describe('AppointmentResult', function() {
    function getOneById(service: IAppointmentResultService, id: string, done: (err: Error, appointmentResult: AppointmentResultModel) => void) {
        service.getAppointmentResultModelById(id, (appointment: AppointmentResultModel) => {
            // console.log("appointment_result.id:", appointment.id);
            assert.strictEqual(appointment.id, id);
            done(null, appointment);
        });
    }

    function getPatientAppointmentResults(service: IAppointmentResultService, patientId: string, limit: number, offset: number,
            done: (err: Error, appointments: AppointmentResultModel[]) => void) {
        service.getPatientAppointmentResults(patientId, limit, offset, (appointments: AppointmentResultModel[]) => {
            appointments.forEach(function(app) {
                assert.strictEqual(app.patientId, patientId);
            });
            done(null, appointments);
        });
    }

    describe("JsonRPC", function() {
        let service = new JsonRPC.AppointmentResultService("http://localhost:9999/", JsonRPC.Transports.xhr);
        it("GetOneById", function(done: (err?: any) => void) {
            getOneById(service, "1", done);
        });
        it('GetPatientAppointmentResults', function(done: (err?: any) => void) {
            getPatientAppointmentResults(service, "1", 10, 0, done);
        });
    });
});