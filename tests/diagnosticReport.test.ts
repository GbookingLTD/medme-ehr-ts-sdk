"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IDiagnosticReportService } from '../src/services/DiagnosticReportService';
import { DiagnosticReportModel } from '../src/models/DiagnosticReportModel';
import { Credentials } from '../src/services/Credentials';
import {RpcErrorCodes} from "../src/services/RpcErrorCodes";
import { authPatient, drIdRange, patIdRange, sudoApiKey } from './fixtures';
import { EHR_SERVER_ENDPOINT } from './env';
import { login, readUserSignFile } from './login';

describe('DiagnosticReport', function() {

    describe('JsonRPCWithApiKey', function() {
        const service = new JsonRPC.DiagnosticReportService(EHR_SERVER_ENDPOINT, null, sudoApiKey, JsonRPC.Transports.xhr);

        it('GetFirstById', async function() {
            const drid = drIdRange.first.toString();
            const dr = await service.getDiagnosticReportByIdAsync(drid);
            assert.strictEqual(dr.id, drid);
        });

        it('GetPatientDiagnosticReports', async function() {
            const patid = patIdRange.first.toString();
            const reports = await service.getPatientDiagnosticReportsAsync(patid, 10, 0);

            assert(reports.length > 0);
            // for (const r of reports) {
            //     assert.strictEqual(r.resultInterpreter[0].id, patid);
            // }
        });
    });

    async function loggedInService() {
        const userPublicID = authPatient.publicUserId;
        const ehrUserSign = readUserSignFile(userPublicID);
        const cred = await login(userPublicID, ehrUserSign);
        return new JsonRPC.DiagnosticReportService(EHR_SERVER_ENDPOINT, cred, null, JsonRPC.Transports.xhr);
    }

    describe('JsonRPCWithCred', function() {
        it('GetFirstById', async function() {
            const service = await loggedInService();
            const drid = authPatient.diagnosticReportId;
            const dr = await service.getDiagnosticReportByIdAsync(drid);
            assert.strictEqual(dr.id, drid);
        });

        it('GetPatientDiagnosticReports', async function() {
            const service = await loggedInService();
            const patid = authPatient.internalUserId.toString();
            const reports = await service.getPatientDiagnosticReportsAsync(patid, 10, 0);
            assert(reports.length > 0);
            // for (const r of reports) {
            //     assert.strictEqual(r.resultInterpreter[0].id, patid);
            // }
        });

        it('GetOtherPatientDiagnosticReports', async function() {
            const service = await loggedInService();
            const patid = (patIdRange.last + 1).toString();
            try {
                await service.getPatientDiagnosticReportsAsync(patid, 10, 0);
                assert.fail();
            } catch( err) {
                assert(err && err.code === RpcErrorCodes.AccessForbidden);
            }
        });
    });
});