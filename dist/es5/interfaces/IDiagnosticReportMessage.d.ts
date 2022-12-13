import { IBusinessInfo, IDoctor, IObservation, IPatientInfo, IPeriod, IService } from "interfaces/index";
import { AttachmentInfo } from "types/AttachmentInfo";
import { ObservationType } from "types/ObservationType";
export interface IDiagnosticReportMessage {
    id: string;
    status: string;
    business: IBusinessInfo;
    patientId: string;
    patient: IPatientInfo;
    type: ObservationType;
    effectivePeriod?: IPeriod;
    issuedDate: Date;
    result: IObservation[];
    resultInterpreter: IDoctor[];
    resultInterpretation: string[];
    imagineMedia: string[];
    attachments: AttachmentInfo[];
    services: IService[];
    category: string;
}
//# sourceMappingURL=IDiagnosticReportMessage.d.ts.map