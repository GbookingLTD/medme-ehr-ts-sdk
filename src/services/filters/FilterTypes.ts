export enum FilterTypeEnum {
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
  PrescriptionByBusiness = 32,
}

type FilterKeyMap = { [key: number]: string };

export const FilterKeys: FilterKeyMap = {
  [FilterTypeEnum.Unknown]: "Unknown",
  [FilterTypeEnum.PatientByMedCard]: "PatientByMedCard",
  [FilterTypeEnum.PatientByName]: "PatientByName",
  [FilterTypeEnum.PatientByPhone]: "PatientByPhone",

  [FilterTypeEnum.AppointmentByPatientId]: "AppointmentByPatientId",
  [FilterTypeEnum.AppointmentByCreated]: "AppointmentByCreated",
  [FilterTypeEnum.AppointmentByStarted]: "AppointmentByStarted",
  [FilterTypeEnum.AppointmentByBusiness]: "AppointmentByBusiness",

  [FilterTypeEnum.DiagnosticReportByPatientId]: "DiagnosticReportByPatient",
  [FilterTypeEnum.DiagnosticReportByCreated]: "DiagnosticReportByCreated",
  [FilterTypeEnum.DiagnosticReportByBusiness]: "DiagnosticReportByBusiness",

  [FilterTypeEnum.PrescriptionByPatient]: "PrescriptionByPatient",
  [FilterTypeEnum.PrescriptionByCreated]: "PrescriptionByCreated",
  [FilterTypeEnum.PrescriptionByBusiness]: "PrescriptionByBusiness",
};
