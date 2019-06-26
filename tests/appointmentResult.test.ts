"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IAppointmentResultService } from '../src/services/AppointmentResultService';
import { AppointmentResultModel } from "../src/models/AppointmentResultModel";

describe('AppointmentResult', function() {
    function getOneById(service: IAppointmentResultService, id: string, done: (err: Error, appointmentResult: AppointmentResultModel) => void) {
        service.getAppointmentResultModelById(id, (appointment: AppointmentResultModel) => {
            console.log("appointment.id:", appointment.id);
            assert.strictEqual(appointment.id, id);
            done(null, appointment);
        });
    }

    describe("JsonRPC", function() {
        let service = new JsonRPC.AppointmentResultService("http://localhost:9999/", JsonRPC.Transports.xhr);
        it("GetOneById", function(done: (err?: any) => void) {
            getOneById(service, "1", done);
        });
    });
});