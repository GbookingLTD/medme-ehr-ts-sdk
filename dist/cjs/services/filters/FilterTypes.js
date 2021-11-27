"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterKeys = exports.FilterTypeEnum = void 0;
var FilterTypeEnum;
(function (FilterTypeEnum) {
    FilterTypeEnum[FilterTypeEnum["Unknown"] = 0] = "Unknown";
    FilterTypeEnum[FilterTypeEnum["PatientByMedCard"] = 1] = "PatientByMedCard";
    FilterTypeEnum[FilterTypeEnum["PatientByName"] = 2] = "PatientByName";
    FilterTypeEnum[FilterTypeEnum["PatientByPhone"] = 3] = "PatientByPhone";
    FilterTypeEnum[FilterTypeEnum["PatientByBirthdate"] = 4] = "PatientByBirthdate";
    FilterTypeEnum[FilterTypeEnum["PatientByDoctorSpecialityId"] = 5] = "PatientByDoctorSpecialityId";
    FilterTypeEnum[FilterTypeEnum["PatientByDoctorSpecialityIds"] = 6] = "PatientByDoctorSpecialityIds";
    FilterTypeEnum[FilterTypeEnum["AppointmentByPatientId"] = 10] = "AppointmentByPatientId";
    FilterTypeEnum[FilterTypeEnum["AppointmentByCreated"] = 11] = "AppointmentByCreated";
    FilterTypeEnum[FilterTypeEnum["AppointmentByStarted"] = 12] = "AppointmentByStarted";
    FilterTypeEnum[FilterTypeEnum["AppointmentByBusiness"] = 13] = "AppointmentByBusiness";
    FilterTypeEnum[FilterTypeEnum["DiagnosticReportByPatientId"] = 20] = "DiagnosticReportByPatientId";
    FilterTypeEnum[FilterTypeEnum["DiagnosticReportByCreated"] = 21] = "DiagnosticReportByCreated";
    FilterTypeEnum[FilterTypeEnum["DiagnosticReportByBusiness"] = 22] = "DiagnosticReportByBusiness";
    FilterTypeEnum[FilterTypeEnum["PrescriptionByPatient"] = 30] = "PrescriptionByPatient";
    FilterTypeEnum[FilterTypeEnum["PrescriptionByCreated"] = 31] = "PrescriptionByCreated";
    FilterTypeEnum[FilterTypeEnum["PrescriptionByBusiness"] = 32] = "PrescriptionByBusiness";
})(FilterTypeEnum = exports.FilterTypeEnum || (exports.FilterTypeEnum = {}));
exports.FilterKeys = (_a = {},
    _a[FilterTypeEnum.Unknown] = "Unknown",
    _a[FilterTypeEnum.PatientByMedCard] = "PatientByMedCard",
    _a[FilterTypeEnum.PatientByName] = "PatientByName",
    _a[FilterTypeEnum.PatientByPhone] = "PatientByPhone",
    _a[FilterTypeEnum.AppointmentByPatientId] = "AppointmentByPatientId",
    _a[FilterTypeEnum.AppointmentByCreated] = "AppointmentByCreated",
    _a[FilterTypeEnum.AppointmentByStarted] = "AppointmentByStarted",
    _a[FilterTypeEnum.AppointmentByBusiness] = "AppointmentByBusiness",
    _a[FilterTypeEnum.DiagnosticReportByPatientId] = "DiagnosticReportByPatient",
    _a[FilterTypeEnum.DiagnosticReportByCreated] = "DiagnosticReportByCreated",
    _a[FilterTypeEnum.DiagnosticReportByBusiness] = "DiagnosticReportByBusiness",
    _a[FilterTypeEnum.PrescriptionByPatient] = "PrescriptionByPatient",
    _a[FilterTypeEnum.PrescriptionByCreated] = "PrescriptionByCreated",
    _a[FilterTypeEnum.PrescriptionByBusiness] = "PrescriptionByBusiness",
    _a);
