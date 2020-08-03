import { BusinessInfo } from './BusinessInfo';
import { Doctor } from './Doctor';
import { PatientInfo } from './PatientInfo';
import { ObservationType } from './ObservationType';
import { ObservationStatus } from './ObservationStatus';
import { Period } from './Period';
import { ObservationValue } from './ObservationValue';
import { ObservationRange } from './ObservationRange';
import { ObservationComponent } from './ObservationComponent';
export declare class Observation {
    id: string;
    createdDate: Date;
    patientInfo: PatientInfo;
    type: ObservationType;
    observationKey: string;
    status: ObservationStatus;
    effectivePeriod: Period;
    issuedDate: Date;
    performerDoctor: Doctor;
    performerBusiness: BusinessInfo;
    value: ObservationValue;
    note: string;
    interpretation: string[];
    ranges: ObservationRange[];
    components: ObservationComponent[];
    constructor();
    fromJson(json: any): Observation;
    toJson(): object;
}
