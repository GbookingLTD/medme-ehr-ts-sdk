import { IBusinessInfo, IDoctor, IObservationComponent, IObservationRange, IObservationValue, IPatientInfo, IPeriod } from "interfaces/index";
import { ObservationType } from "types/ObservationType";
export interface IObservation {
    id: string;
    createdDate: Date;
    patientInfo: IPatientInfo;
    type: ObservationType;
    observationKey: string;
    status?: string;
    effectivePeriod: IPeriod;
    issuedDate: Date;
    performerDoctor: IDoctor;
    performerBusiness: IBusinessInfo;
    value: IObservationValue;
    note: string;
    interpretation: string[];
    ranges: IObservationRange[];
    components: IObservationComponent[];
}
//# sourceMappingURL=IObservation.d.ts.map