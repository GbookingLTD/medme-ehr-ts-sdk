"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IDiagnosticReportService } from '../src/services/DiagnosticReportService';
import { DiagnosticReportModel } from '../src/models/DiagnosticReportModel';
import { Credentials } from '../src/services/Credentials';
import { getCreateServiceFn } from './login';

describe('DiagnosticReport', function() {
    function getOneById(service: IDiagnosticReportService, id: string, done: (err: Error, p: DiagnosticReportModel) => void) {
        service.getDiagnosticReportModelById(id, (appointment: DiagnosticReportModel) => {
            // console.log("prescription.id:", appointment.id);
            assert.strictEqual(appointment.id, id);
            done(null, appointment);
        });
    }

    function getPatientDiagnosticReports(service: IDiagnosticReportService, patientId: string, limit: number, offset: number,
            done: (err: Error, appointments: DiagnosticReportModel[]) => void) {
        service.getPatientDiagnosticReports(patientId, limit, offset, (reports: DiagnosticReportModel[]) => {
            reports.forEach(function(r) {
                assert.strictEqual(r.id, "1");
            });
            done(null, reports);
        });
   
    }

    describe.only('JsonRPC', function() {
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
    });

});