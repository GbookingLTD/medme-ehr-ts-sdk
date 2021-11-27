"use strict";

import * as assert from "assert";

import { RpcErrorCodes } from "../src/services/RpcErrorCodes";
import { sudoApiKey, patIdRange, appIdRange, authPatient } from "./fixtures";
import JsonRPC from "../src/services/jsonRPC/index";
import { login, readUserSignFile } from "./login";
import { EHR_SERVER_ENDPOINT } from "./env";
import {
  SearchEntityKeywords,
  SearchPatientEhrFilters,
  SearchPatientEhrKeywords,
} from "../src/services/PatientService";
import { PatientFilters } from "../src/services/filters/PatientFilters";
import { AppointmentFilters } from "../src/services/filters/AppointmentFilters";
import { DiagnosticReportFilters } from "../src/services/filters/DiagnosticReportFilters";
import { PrescriptionFilters } from "../src/services/filters/PrescriptionFilters";

describe("Patient", function () {
  describe("JsonRPCWithApiKey", function () {
    const service = new JsonRPC.PatientService(
      EHR_SERVER_ENDPOINT,
      null,
      sudoApiKey,
      JsonRPC.Transports.xhr
    );
    it("searchEhr", async function () {
      this.timeout(0);
      const keywords: SearchPatientEhrKeywords = {
        patientKeywords: SearchEntityKeywords.createWithValues([], []),
        appointmentResultKeywords: SearchEntityKeywords.createWithValues(
          ["est"],
          []
        ),
        diagnosticReportKeywords: SearchEntityKeywords.createWithValues([], []),
        prescriptionKeywords: SearchEntityKeywords.createWithValues([], []),
      };

      const filters: SearchPatientEhrFilters = {
        patientFilters: new PatientFilters({}),
        appointmentResultFilters: new AppointmentFilters({}),
        diagnosticReportFilters: new DiagnosticReportFilters({}),
        prescriptionFilters: new PrescriptionFilters({}),
      };

      // during year
      filters.appointmentResultFilters.byStart.from = new Date(
        Date.now() - 3650 * 86400 * 1000
      );
      filters.appointmentResultFilters.byStart.to = new Date();

      const result = await service.searchPatientEhrAsync(
        keywords,
        filters,
        0,
        10
      );

      console.log("found results", result);
    });
  });
});
