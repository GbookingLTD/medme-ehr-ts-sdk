"use strict";

import * as assert from 'assert';

import { AppointmentModel } from '../src/models/AppointmentModel';
import BinRPC from '../src/services/binRPC/index';
import JsonRPC from '../src/services/jsonRPC/index';
import { IAppointmentService } from '../src/services/AppointmentService';
import { AppointmentInputProperties } from "../src/types/AppointmentInputProperties";
import { Credentials } from '../src/services/Credentials';
import { getCreateServiceFn } from './login';
import {RpcErrorCodes} from "../src/services/RpcErrorCodes";

describe('Appointment', function() {
    function getOneById(service: IAppointmentService, id: string, done: (err: Error, appointment: AppointmentModel) => void) {
        service.getAppointmentModelById(id, (appointment: AppointmentModel) => {
            // console.log("appointment.patientId:", appointment.patientId);
            assert.strictEqual(appointment.id, id);
            done(null, appointment);
        });
    }

    function saveOneAppointment(service: IAppointmentService, done: (err: Error, appId: string) => void) {
        let props = new AppointmentInputProperties();
        props.businessId = "1";
        props.doctorId = "1";
        props.duration = 123;
        props.patientId = "1";
        props.services = ["1"];
        props.sourceId = "1";
        props.start = new Date();
        service.saveAppointment(props, (appId) => {
            assert.notEqual(appId, "");
            done(null, appId);
        });
    }

    function getPatientAppointments(service: IAppointmentService, patientId: string, limit: number, offset: number,
            done: (err: Error, appointments: AppointmentModel[]) => void) {
        service.getPatientAppointments(patientId, limit, offset, (appointments: AppointmentModel[]) => {
            appointments.forEach(function(app) {
                assert.strictEqual(app.patientId, patientId);
            });
            done(null, appointments);
        });
    }

    describe('BinRPC', function() {
        let service = new BinRPC.AppointmentService("http://localhost:9999/", BinRPC.Transports.xhr);
        it('GetOneById', function(done: (err?: any) => void) {
            getOneById(service, "1", done);
        });
        it('SaveModel', function(done: (err?: any) => void) {
            saveOneAppointment(service, done);
        });
    });

    describe.only('JsonRPC', function() {
        const createAppointmentService = getCreateServiceFn<IAppointmentService>(function(authCred: Credentials) {
            return new JsonRPC.AppointmentService("http://localhost:9999/", authCred, JsonRPC.Transports.xhr);
        });
        it('GetOneById', function(done: (err?: any) => void) {
            createAppointmentService(function(err: any, service?: IAppointmentService) {
                if (err) return done(err);
                getOneById(service, "1", done);
            });
        });
        it('SaveModel', function(done: (err?: any) => void) {
            createAppointmentService(function(err: any, service?: IAppointmentService) {
                if (err) return done(err);
                saveOneAppointment(service, done);
            });
        });
        it('GetPatientAppointments', function(done: (err?: any) => void) {
            createAppointmentService(function(err: any, service?: IAppointmentService) {
                if (err) return done(err);
                getPatientAppointments(service, "1", 10, 0, done);
            });
        });
        it('GetOtherPatientAppointments', function(done: (err?: any) => void) {
            createAppointmentService(function(err: any, service?: IAppointmentService) {
                if (err) return done(err);
                service.getPatientAppointments("2", 10, 0, (err:any, appointments: AppointmentModel[]) => {
                    if (err && err.code === RpcErrorCodes.AccessForbidden) return done();
                });
            });
        });
    });
});