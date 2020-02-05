"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IDiagnosticReportService } from '../src/services/DiagnosticReportService';
import { DiagnosticReportModel } from '../src/models/DiagnosticReportModel';
import { Credentials } from '../src/services/Credentials';
import { getCreateServiceFn } from './login';
import {RpcErrorCodes} from "../src/services/RpcErrorCodes";
import {medialogDiagnosticReportJson} from "./fixtures";

describe('DiagnosticReport', function() {
    function getOneById(service: IDiagnosticReportService, id: string, done: (err: Error, p: DiagnosticReportModel) => void) {
        service.getDiagnosticReportModelById(id, (err: any, appointment: DiagnosticReportModel) => {
            // console.log("prescription.id:", appointment.id);
            assert.strictEqual(appointment.id, id);
            done(null, appointment);
        });
    }

    function getPatientDiagnosticReports(service: IDiagnosticReportService, patientId: string, limit: number, offset: number,
            done: (err: Error, appointments: DiagnosticReportModel[]) => void) {
        service.getPatientDiagnosticReports(patientId, limit, offset, (err: any, reports: DiagnosticReportModel[]) => {
            reports.forEach(function(r) {
                assert.strictEqual(r.id, "1");
            });
            done(null, reports);
        });
   
    }

    describe('JsonRPC', function() {
        const createService = getCreateServiceFn<IDiagnosticReportService>(function(authCred: Credentials) {
            return new JsonRPC.DiagnosticReportService("http://localhost:9999/", authCred, JsonRPC.Transports.xhr);
        });
        it('GetOneById', function(done: (err?: any) => void) {
            createService(function(err: any, service?: IDiagnosticReportService) {
                if (err) return done(err);
                getOneById(service, "1", done);
            });
        });
        it('GetPatientDiagnosticReports', function(done: (err?: any) => void) {
            createService(function(err: any, service?: IDiagnosticReportService) {
                if (err) return done(err);
                getPatientDiagnosticReports(service, "1", 10, 0, done);
            });
        });
        it('GetOtherPatientDiagnosticReports', function(done: (err?: any) => void) {
            createService(function(err: any, service?: IDiagnosticReportService) {
                if (err) return done(err);
                service.getPatientDiagnosticReports("2", 10, 0, (err: any, reports: DiagnosticReportModel[]) => {
                    if (err && err.code === RpcErrorCodes.AccessForbidden) return done();
                });
            });
        });

        it('From json test', function(done: (err?: any) => void) {
            let diagnosticReport = (new DiagnosticReportModel).fromJson(medialogDiagnosticReportJson);

            done();
        });
    });
});