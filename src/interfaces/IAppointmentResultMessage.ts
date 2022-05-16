
import { IBusinessInfo, IDiagnosis, IDoctor, IPrescriptionInfo, IProcedure } from "interfaces/index";
import { PatientReportInfo } from "types/PatientReportInfo";

export interface IAppointmentResultMessage {
  id: string;
  patientId: string;
  business: IBusinessInfo;
  created: Date;
  start: Date;
  doctor: IDoctor;
  duration: number;
  anamnesis: string[];
  medicalExaminationResult: string[];
  diagnosis: IDiagnosis[];
  recommendations: IProcedure[];
  scheduledProcedures: IProcedure[];
  prescriptions: IPrescriptionInfo[];
  diagnosticReportIds: string[];
  reportInfos?: PatientReportInfo[];
}
