"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IAppointmentResultService } from '../src/services/AppointmentResultService';
import { AppointmentResultModel } from "../src/models/AppointmentResultModel";
import { Credentials } from '../src/services/Credentials';
import { getCreateServiceFn } from './login';
import {RpcErrorCodes} from "../src/services/RpcErrorCodes";

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
        service.getPatientAppointmentResults(patientId, limit, offset, (err: any, appointments: AppointmentResultModel[]) => {
            appointments.forEach(function(app) {
                assert.strictEqual(app.patientId, patientId);
            });
            done(null, appointments);
        });
    }

    describe("JsonRPC", function() {
        const createAppointmentResultService = getCreateServiceFn<IAppointmentResultService>(function(authCred: Credentials) {
            return new JsonRPC.AppointmentResultService("http://localhost:9999/", authCred, JsonRPC.Transports.xhr);
        });
        it("GetOneById", function(done: (err?: any) => void) {
            createAppointmentResultService(function(err: any, service?: IAppointmentResultService) {
                if (err) return done(err);
                getOneById(service, "1", done);
            });
        });
        it('GetPatientAppointmentResults', function(done: (err?: any) => void) {
            createAppointmentResultService(function(err: any, service?: IAppointmentResultService) {
                if (err) return done(err);
                getPatientAppointmentResults(service, "1", 10, 0, done);
            });
        });
        it('GetOtherPatientAppointmentResults', function(done: (err?: any) => void) {
            createAppointmentResultService(function(err: any, service?: IAppointmentResultService) {
                if (err) return done(err);
                service.getPatientAppointmentResults("2", 10, 0, (err: any, appointments: AppointmentResultModel[]) => {
                    if (err && err.code === RpcErrorCodes.AccessForbidden) return done();
                });
            });
        });
    });
});