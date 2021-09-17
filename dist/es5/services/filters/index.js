import { PatientByNameFilter, PatientByMedCardFilter, PatientByPhoneFilter, PatientFilters, } from "./PatientFilters";
import { AppointmentByBusinessIdFilter, AppointmentByCreatedFilter, AppointmentByStartFilter, AppointmentByPatientIdFilter, AppointmentFilters, } from "./AppointmentFilters";
import { DiagnosticReportByBusinessIdFilter, DiagnosticReportByCreatedFilter, DiagnosticReportByPatientIdFilter, DiagnosticReportFilters, } from "./DiagnosticReportFilters";
import { PrescriptionByBusinessIdFilter, PrescriptionByCreatedFilter, PrescriptionByPatientIdFilter, PrescriptionFilters, } from "./PrescriptionFilters";
export default {
    PatientByNameFilter: PatientByNameFilter,
    PatientByMedCardFilter: PatientByMedCardFilter,
    PatientByPhoneFilter: PatientByPhoneFilter,
    PatientFilters: PatientFilters,
    AppointmentByBusinessIdFilter: AppointmentByBusinessIdFilter,
    AppointmentByCreatedFilter: AppointmentByCreatedFilter,
    AppointmentByStartFilter: AppointmentByStartFilter,
    AppointmentByPatientIdFilter: AppointmentByPatientIdFilter,
    AppointmentFilters: AppointmentFilters,
    DiagnosticReportByBusinessIdFilter: DiagnosticReportByBusinessIdFilter,
    DiagnosticReportByCreatedFilter: DiagnosticReportByCreatedFilter,
    DiagnosticReportByPatientIdFilter: DiagnosticReportByPatientIdFilter,
    DiagnosticReportFilters: DiagnosticReportFilters,
    PrescriptionByBusinessIdFilter: PrescriptionByBusinessIdFilter,
    PrescriptionByCreatedFilter: PrescriptionByCreatedFilter,
    PrescriptionByPatientIdFilter: PrescriptionByPatientIdFilter,
    PrescriptionFilters: PrescriptionFilters,
};
