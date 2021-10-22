"use strict";

import * as assert from "assert";

import { RpcErrorCodes } from "../src/services/RpcErrorCodes";
import { sudoApiKey, patIdRange, appIdRange, authPatient } from "./fixtures";
import JsonRPC from "../src/services/jsonRPC/index";
import { login, readUserSignFile } from "./login";
import { EHR_SERVER_ENDPOINT } from "./env";

describe("Appointment", function () {
  describe("JsonRPCWithApiKey", function () {
    const service = new JsonRPC.AppointmentService(
      EHR_SERVER_ENDPOINT,
      null,
      sudoApiKey,
      JsonRPC.Transports.xhr
    );

    it("GetFirstById", async function () {
      const id = appIdRange.first.toString();
      const app = await service.getAppointmentByIdAsync(id);
      assert.strictEqual(app.id, id);
    });

    it("GetFirstPatientAppointments", async function () {
      const patid = patIdRange.first.toString();
      const apps = await service.getPatientAppointmentsAsync(patid, 10, 0);
      // console.info("apps", apps);
      assert(apps.length > 0);
      for (let app of apps) assert.strictEqual(app.patientId, patid);
    });
  });

  async function loggedInService() {
    const userPublicID = authPatient.publicUserId;
    const ehrUserSign = readUserSignFile(userPublicID);
    const cred = await login(userPublicID, ehrUserSign);
    return new JsonRPC.AppointmentService(
      EHR_SERVER_ENDPOINT,
      cred,
      null,
      JsonRPC.Transports.xhr
    );
  }

  describe("JsonRPCWithCred", function () {
    it("GetFirstById", async function () {
      const service = await loggedInService();
      const appid = authPatient.appointmentId;
      const app = await service.getAppointmentByIdAsync(appid);
      assert.strictEqual(app.id, appid);
    });

    it("GetFirstPatientAppointments", async function () {
      const service = await loggedInService();
      const patid = patIdRange.first.toString();
      const apps = await service.getPatientAppointmentsAsync(patid, 10, 0);
      // console.info("apps", apps);
      assert(apps.length > 0);
      for (let app of apps) assert.strictEqual(app.patientId, patid);
    });

    it("GetWrongPatientAppointments", async function () {
      const service = await loggedInService();
      const patId = patIdRange.first + patIdRange.count / 2;

      try {
        await service.getPatientAppointmentsAsync(patId.toString(), 10, 0);
        assert.fail("wrong passed");
      } catch (err) {
        assert(err && err.code === RpcErrorCodes.AccessForbidden);
      }
    });
  });
});
