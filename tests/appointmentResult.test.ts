"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import {RpcErrorCodes} from "../src/services/RpcErrorCodes";
import { arIdRange, authPatient, patIdRange, sudoApiKey } from './fixtures';
import { EHR_SERVER_ENDPOINT } from './env';
import { login, readUserSignFile } from './login';

describe('AppointmentResult', function() {

    describe("JsonRPCWithApiKey", function() {
        const service = new JsonRPC.AppointmentResultService(EHR_SERVER_ENDPOINT, null, sudoApiKey, JsonRPC.Transports.xhr);

        it("GetFirstById", async function() {
            const arid = arIdRange.first.toString();
            const ar = await service.getAppointmentResultByIdAsync(arid);
            assert(ar != null);
            assert.strictEqual(ar.id, arid);
        });

        it("GetOneById Not Found", async function() {
            const arid = (arIdRange.last + 1).toString();
            try {
                await service.getAppointmentResultByIdAsync(arid);
                assert.fail();
            } catch (err) {
                assert.strictEqual(err.code, RpcErrorCodes.AppointmentResultNotFound);
                const msg = `Request #200 appointment_result.get_appointment_result_by_id: Appointment result ${arid} not found`;
                assert.strictEqual(err.message, msg);
            }
        });

        it('GetPatientAppointmentResults', async function() {
            const patid = patIdRange.first.toString();
            const appResults = await service.getPatientAppointmentResultsAsync(patid, 10, 0)
            for (const ar of appResults)
                assert.strictEqual(ar.patientId, patid);
        });

    });

    async function loggedInService() {
        const userPublicID = authPatient.publicUserId;
        const ehrUserSign = readUserSignFile(userPublicID);
        const cred = await login(userPublicID, ehrUserSign);
        return new JsonRPC.AppointmentResultService(EHR_SERVER_ENDPOINT, cred, null, JsonRPC.Transports.xhr);
    }

    describe("JsonRPCWithCred", function() {
        it("GetFirstById", async function() {
            const service = await loggedInService();
            const arid = authPatient.appointmentResultId;
            const ar = await service.getAppointmentResultByIdAsync(arid);
            assert.strictEqual(ar.id, arid);
        });

        it("GetOneById Not Found", async function() {
            const service = await loggedInService();
            const arid = "123456";
            try {
                const ar = await service.getAppointmentResultByIdAsync(arid);
                assert.fail('expected not found error');
            } catch (err) {
                assert.strictEqual(err.code, RpcErrorCodes.AppointmentResultNotFound);
                const msg = "Request #200 appointment_result.get_appointment_result_by_id: Appointment result 123456 not found";
                assert.strictEqual(err.message, msg);
            }
        });

        it('GetPatientAppointmentResults', async function() {
            const service = await loggedInService();
            const patid = authPatient.internalUserId.toString();
            const appResults = await service.getPatientAppointmentResultsAsync(patid, 10, 0);
            for (const ar of appResults)
                assert.strictEqual(ar.patientId, patid)
        });

        it('GetOtherPatientAppointmentResults', async function() {
            const service = await loggedInService();
            const patid = (patIdRange.last + 1).toString();
            try {
                await service.getPatientAppointmentResultsAsync(patid, 10, 0);
                assert.fail();
            } catch (err) {
                assert(err && err.code === RpcErrorCodes.AccessForbidden);
            }
        });
    });
});