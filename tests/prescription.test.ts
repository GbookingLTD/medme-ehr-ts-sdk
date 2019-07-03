"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IPrescriptionService } from '../src/services/PrescriptionService';
import { PrescriptionModel } from '../src/models/PrescriptionModel';

describe('Prescription', function() {
    function getOneById(service: IPrescriptionService, id: string, done: (err: Error, p: PrescriptionModel) => void) {
        service.getPrescriptionModelById(id, (appointment: PrescriptionModel) => {
            // console.log("prescription.id:", appointment.id);
            assert.strictEqual(appointment.id, id);
            done(null, appointment);
        });
    }

    function getPatientPrescriptions(service: IPrescriptionService, patientId: string, limit: number, offset: number,
            done: (err: Error, appointments: PrescriptionModel[]) => void) {
        service.getPatientPrescriptions(patientId, limit, offset, (appointments: PrescriptionModel[]) => {
            appointments.forEach(function(app) {
                assert.strictEqual(app.patientId, patientId);
            });
            done(null, appointments);
        });
   
    }

    describe.only('JsonRPC', function() {
        let service = new JsonRPC.PrescriptionService("http://localhost:9999/", JsonRPC.Transports.xhr);
        it('GetOneById', function(done: (err?: any) => void) {
            getOneById(service, "1", done);
        });
        it('GetPatientPrescriptions', function(done: (err?: any) => void) {
            getPatientPrescriptions(service, "1", 10, 0, done);
        });
    });

});