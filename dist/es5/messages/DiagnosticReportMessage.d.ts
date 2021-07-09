import { Doctor } from '../types/Doctor';
import { Period } from '../types/Period';
import { DiagnosticReportStatus } from '../types/DiagnosticReportStatus';
import { ObservationType } from '../types/ObservationType';
import { Observation } from '../types/Observation';
import { Service } from '../types/Service';
import { PatientInfo } from '../types/PatientInfo';
import { BusinessInfo } from '../types/BusinessInfo';
export declare class DiagnosticReportMessage {
    id: string;
    status: DiagnosticReportStatus;
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
    attachments: string[];
    services: Service[];
    category: string;
}
