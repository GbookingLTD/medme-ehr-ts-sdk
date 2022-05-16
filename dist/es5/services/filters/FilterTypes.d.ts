export declare enum FilterTypeEnum {
    Unknown = 0,
    PatientByMedCard = 1,
    PatientByName = 2,
    PatientByPhone = 3,
    PatientByBirthdate = 4,
    PatientByDoctorSpecialityId = 5,
    PatientByDoctorSpecialityIds = 6,
    AppointmentByPatientId = 10,
    AppointmentByCreated = 11,
    AppointmentByStarted = 12,
    AppointmentByBusiness = 13,
    DiagnosticReportByPatientId = 20,
    DiagnosticReportByCreated = 21,
    DiagnosticReportByBusiness = 22,
    PrescriptionByPatient = 30,
    PrescriptionByCreated = 31,
    PrescriptionByBusiness = 32
}
declare type FilterKeyMap = {
    [key: number]: string;
};
export declare const FilterKeys: FilterKeyMap;
export {};
//# sourceMappingURL=FilterTypes.d.ts.map