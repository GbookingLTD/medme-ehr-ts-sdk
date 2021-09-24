"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = require("./xhr");
var AppointmentService_1 = require("./AppointmentService");
var AppointmentResultService_1 = require("./AppointmentResultService");
var PrescriptionService_1 = require("./PrescriptionService");
var DiagnosticReportService_1 = require("./DiagnosticReportService");
var AuthService_1 = require("./AuthService");
var PatientService_1 = require("./PatientService");
var BusinessInfoService_1 = require("./BusinessInfoService");
var jsonRpcRequest_1 = require("./jsonRpcRequest");
exports.default = {
    Transports: {
        xhr: xhr_1.xhr,
    },
    JsonRpcHeader: jsonRpcRequest_1.JsonRpcHeader,
    AppointmentService: AppointmentService_1.AppointmentService,
    AppointmentResultService: AppointmentResultService_1.AppointmentResultService,
    PrescriptionService: PrescriptionService_1.PrescriptionService,
    DiagnosticReportService: DiagnosticReportService_1.DiagnosticReportService,
    AuthService: AuthService_1.AuthService,
    PatientService: PatientService_1.PatientService,
    BusinessInfoService: BusinessInfoService_1.BusinessInfoService,
};
