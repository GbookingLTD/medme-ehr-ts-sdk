"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IPrescriptionService } from '../src/services/PrescriptionService';
import { PrescriptionModel } from '../src/models/PrescriptionModel';
import { Credentials } from '../src/services/Credentials';
import { getCreateServiceFn } from './login';
import {RpcErrorCodes} from "../src/services/RpcErrorCodes";

describe('Prescription', function() {
    function getOneById(service: IPrescriptionService, id: string, done: (err: Error, p: PrescriptionModel) => void) {
        service.getPrescriptionModelById(id, (err: any, appointment: PrescriptionModel) => {
            // console.log("prescription.id:", appointment.id);
            assert.strictEqual(appointment.id, id);
            done(null, appointment);
        });
    }

    function getPatientPrescriptions(service: IPrescriptionService, patientId: string, limit: number, offset: number,
            done: (err: Error, appointments: PrescriptionModel[]) => void) {
        service.getPatientPrescriptions(patientId, limit, offset, (err: any, appointments: PrescriptionModel[]) => {
            appointments.forEach(function(app) {
                assert.strictEqual(app.patientId, patientId);
            });
            done(null, appointments);
        });
   
    }

    describe('JsonRPC', function() {
        const createService = getCreateServiceFn<IPrescriptionService>(function(authCred: Credentials) {
            return new JsonRPC.PrescriptionService("http://localhost:9999/", authCred, JsonRPC.Transports.xhr);
        });
        it('GetOneById', function(done: (err?: any) => void) {
            createService(function(err: any, service?: IPrescriptionService) {
                if (err) return done(err);
                getOneById(service, "1", done);
            });
        });
        it('GetPatientPrescriptions', function(done: (err?: any) => void) {
            createService(function(err: any, service?: IPrescriptionService) {
                if (err) return done(err);
                getPatientPrescriptions(service, "1", 10, 0, done);
            });
        });
        it('GetOtherPatientPrescriptions', function(done: (err?: any) => void) {
            createService(function(err: any, service?: IPrescriptionService) {
                if (err) return done(err);
                service.getPatientPrescriptions("2", 10, 0, (err: any, appointments: PrescriptionModel[]) => {
                    if (err && err.code === RpcErrorCodes.AccessForbidden) return done();
                });
            });
        });
    });

});