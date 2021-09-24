"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PatientFilters_1 = require("./PatientFilters");
var AppointmentFilters_1 = require("./AppointmentFilters");
var DiagnosticReportFilters_1 = require("./DiagnosticReportFilters");
var PrescriptionFilters_1 = require("./PrescriptionFilters");
exports.default = {
    PatientByNameFilter: PatientFilters_1.PatientByNameFilter,
    PatientByMedCardFilter: PatientFilters_1.PatientByMedCardFilter,
    PatientByPhoneFilter: PatientFilters_1.PatientByPhoneFilter,
    PatientFilters: PatientFilters_1.PatientFilters,
    AppointmentByBusinessIdFilter: AppointmentFilters_1.AppointmentByBusinessIdFilter,
    AppointmentByCreatedFilter: AppointmentFilters_1.AppointmentByCreatedFilter,
    AppointmentByStartFilter: AppointmentFilters_1.AppointmentByStartFilter,
    AppointmentByPatientIdFilter: AppointmentFilters_1.AppointmentByPatientIdFilter,
    AppointmentFilters: AppointmentFilters_1.AppointmentFilters,
    DiagnosticReportByBusinessIdFilter: DiagnosticReportFilters_1.DiagnosticReportByBusinessIdFilter,
    DiagnosticReportByCreatedFilter: DiagnosticReportFilters_1.DiagnosticReportByCreatedFilter,
    DiagnosticReportByPatientIdFilter: DiagnosticReportFilters_1.DiagnosticReportByPatientIdFilter,
    DiagnosticReportFilters: DiagnosticReportFilters_1.DiagnosticReportFilters,
    PrescriptionByBusinessIdFilter: PrescriptionFilters_1.PrescriptionByBusinessIdFilter,
    PrescriptionByCreatedFilter: PrescriptionFilters_1.PrescriptionByCreatedFilter,
    PrescriptionByPatientIdFilter: PrescriptionFilters_1.PrescriptionByPatientIdFilter,
    PrescriptionFilters: PrescriptionFilters_1.PrescriptionFilters,
};
