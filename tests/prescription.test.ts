"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IPrescriptionService } from '../src/services/PrescriptionService';
import { PrescriptionModel } from '../src/models/PrescriptionModel';
import { Credentials } from '../src/services/Credentials';
import {RpcErrorCodes} from "../src/services/RpcErrorCodes";
import { authPatient, patIdRange, pmIdRange, sudoApiKey } from './fixtures';
import { EHR_SERVER_ENDPOINT } from './env';
import { login, readUserSignFile } from './login';

describe('Prescription', function() {

    describe('JsonRPCWithApiKey', function() {
        const service = new JsonRPC.PrescriptionService(EHR_SERVER_ENDPOINT, null, sudoApiKey, JsonRPC.Transports.xhr);
        
        it('GetFirstById', async function() {
            const pmid = pmIdRange.first.toString();
            const pm = await service.getPrescriptionByIdAsync(pmid);
            assert.strictEqual(pm.id, pmid);
        });
        it('GetPatientPrescriptions', async function() {
            const patid = patIdRange.first.toString();
            const messages = await service.getPatientPrescriptionsAsync(patid, 10, 0);
            for (const pm of messages)
                assert.strictEqual(pm.patientId, patid);

        });
    });

    async function loggedInService() {
        const userPublicID = authPatient.publicUserId;
        const ehrUserSign = readUserSignFile(userPublicID);
        const cred = await login(userPublicID, ehrUserSign);
        return new JsonRPC.PrescriptionService(EHR_SERVER_ENDPOINT, cred, null, JsonRPC.Transports.xhr);
    }

    describe('JsonRPCWithCred', function() {
        it('GetFirstById', async function() {
            const service = await loggedInService();
            const pmid = authPatient.prescriptionId;
            const pm = await service.getPrescriptionByIdAsync(pmid);
            assert.strictEqual(pm.id, pmid);
        });

        it('GetPatientPrescriptions', async function() {
            const service = await loggedInService();
            const patid = authPatient.internalUserId.toString();
            const messages = await service.getPatientPrescriptionsAsync(patid, 10, 0);
            for (const pm of messages)
                assert.strictEqual(pm.patientId, patid);
                
        });

        it('GetOtherPatientPrescriptions', async function() {
            const service = await loggedInService();
            const patid = (patIdRange.last + 1).toString();
            try {
                await service.getPatientPrescriptionsAsync(patid, 10, 0);
                assert.fail();
            } catch (err) {
                assert(err && err.code === RpcErrorCodes.AccessForbidden);
            }
        });
    });
});