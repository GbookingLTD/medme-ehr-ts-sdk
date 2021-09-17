var _a;
export var FilterTypeEnum;
(function (FilterTypeEnum) {
    FilterTypeEnum[FilterTypeEnum["Unknown"] = 0] = "Unknown";
    FilterTypeEnum[FilterTypeEnum["PatientByMedCard"] = 1] = "PatientByMedCard";
    FilterTypeEnum[FilterTypeEnum["PatientByName"] = 2] = "PatientByName";
    FilterTypeEnum[FilterTypeEnum["PatientByPhone"] = 3] = "PatientByPhone";
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
})(FilterTypeEnum || (FilterTypeEnum = {}));
export var FilterKeys = (_a = {},
    _a[FilterTypeEnum.Unknown] = "unknown",
    _a[FilterTypeEnum.PatientByMedCard] = "patientByMedCard",
    _a[FilterTypeEnum.PatientByName] = "patientByName",
    _a[FilterTypeEnum.PatientByPhone] = "patientByPhone",
    _a[FilterTypeEnum.AppointmentByPatientId = 10,
        AppointmentByCreated = 11,
        AppointmentByStarted = 12,
        AppointmentByBusiness = 13,
        DiagnosticReportByPatientId = 20,
        DiagnosticReportByCreated = 21,
        DiagnosticReportByBusiness = 22,
        PrescriptionByPatient = 30,
        PrescriptionByCreated = 31,
        PrescriptionByBusiness = 32,
    ] = ,
    _a);
