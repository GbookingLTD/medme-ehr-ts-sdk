import { Doctor } from "../types/Doctor";
import { Period } from "../types/Period";
import { ObservationType } from "../types/ObservationType";
import { Observation } from "../types/Observation";
import { Service } from "../types/Service";
import { PatientInfo } from "../types/PatientInfo";
import { BusinessInfo } from "../types/BusinessInfo";
import { AttachmentInfo } from "types/AttachmentInfo";

export class DiagnosticReportMessage {
  id: string;
  status: string;
  business: BusinessInfo;
  patientId: string;
  patient: PatientInfo;
  type: ObservationType;
  effectivePeriod: Period;
  issuedDate: Date;
  result: Observation[];
  resultInterpreter: Doctor[];
  resultInterpretation: string[];
  imagineMedia: string[];
  attachments: AttachmentInfo[];
  services: Service[];
  category: string;
}
