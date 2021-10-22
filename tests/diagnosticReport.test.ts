"use strict";

import * as assert from "assert";
import JsonRPC from "../src/services/jsonRPC/index";
import { IDiagnosticReportService } from "../src/services/DiagnosticReportService";
import { DiagnosticReportModel } from "../src/models/DiagnosticReportModel";
import { Credentials } from "../src/services/Credentials";
import { RpcErrorCodes } from "../src/services/RpcErrorCodes";
import { authPatient, drIdRange, patIdRange, sudoApiKey } from "./fixtures";
import { EHR_SERVER_ENDPOINT } from "./env";
import { login, readUserSignFile } from "./login";
import { DiagnosticReportFilters } from "../src/services/filters/DiagnosticReportFilters";
import l10n from "../src/formatters/l10n";
import { LocaleCode } from "../src/formatters/LocaleCode";

describe("DiagnosticReport", function () {
  describe("JsonRPCWithApiKey", function () {
    const service = new JsonRPC.DiagnosticReportService(
      EHR_SERVER_ENDPOINT,
      null,
      sudoApiKey,
      JsonRPC.Transports.xhr
    );

    it("GetFirstById", async function () {
      const drid = drIdRange.first.toString();
      const dr = await service.getDiagnosticReportByIdAsync(drid);
      assert.strictEqual(dr.id, drid);
    });

    it("GetPatientDiagnosticReports", async function () {
      const patid = patIdRange.first.toString();
      const reports = await service.getPatientDiagnosticReportsAsync(
        patid,
        10,
        0
      );

      assert(reports.length > 0);
      // for (const r of reports) {
      //     assert.strictEqual(r.resultInterpreter[0].id, patid);
      // }
    });

    it("GetDiagnosticReports", async function () {
      const patid = patIdRange.first.toString();
      const reports = await service.getDiagnosticReportsAsync(10, 0);

      assert(reports.length > 0);
      // for (const r of reports) {
      //     assert.strictEqual(r.resultInterpreter[0].id, patid);
      // }
    });

    it("SearchDiagnosticReports", async function () {
      const patid = patIdRange.first.toString();
      const reports = await service.searchDiagnosticReportsAsync(
        ["deserunt"],
        [],
        new DiagnosticReportFilters(l10n.getByLocaleCode(LocaleCode.ruRU)),
        10,
        0
      );

      assert(reports.length > 0);
      // for (const r of reports) {
      //     assert.strictEqual(r.resultInterpreter[0].id, patid);
      // }
    });

    it("SearchDiagnosticReportsWithBusinessFilter", async function () {
      const filters = new DiagnosticReportFilters(
        l10n.getByLocaleCode(LocaleCode.ruRU)
      );
      filters.byBusinessId.businessId = "7";
      const reports = await service.searchDiagnosticReportsAsync(
        ["deserunt"],
        [],
        filters,
        10,
        0
      );

      assert(reports.length > 0);
      for (const r of reports) {
        assert.strictEqual(r.business.id, "7");
      }
    });
  });

  async function loggedInService() {
    const userPublicID = authPatient.publicUserId;
    const ehrUserSign = readUserSignFile(userPublicID);
    const cred = await login(userPublicID, ehrUserSign);
    return new JsonRPC.DiagnosticReportService(
      EHR_SERVER_ENDPOINT,
      cred,
      null,
      JsonRPC.Transports.xhr
    );
  }

  describe("JsonRPCWithCred", function () {
    it("GetFirstById", async function () {
      const service = await loggedInService();
      const drid = authPatient.diagnosticReportId;
      const dr = await service.getDiagnosticReportByIdAsync(drid);
      assert.strictEqual(dr.id, drid);
    });

    it("GetPatientDiagnosticReports", async function () {
      const service = await loggedInService();
      const patid = authPatient.internalUserId.toString();
      const reports = await service.getPatientDiagnosticReportsAsync(
        patid,
        10,
        0
      );
      assert(reports.length > 0);
      // for (const r of reports) {
      //     assert.strictEqual(r.resultInterpreter[0].id, patid);
      // }
    });

    it("GetOtherPatientDiagnosticReports", async function () {
      const service = await loggedInService();
      const patid = (patIdRange.last + 1).toString();
      try {
        await service.getPatientDiagnosticReportsAsync(patid, 10, 0);
        assert.fail();
      } catch (err) {
        assert(err && err.code === RpcErrorCodes.AccessForbidden);
      }
    });
  });
});
