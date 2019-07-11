import { BusinessInfo } from './BusinessInfo';
import { Doctor } from './Doctor';
import { PatientInfo } from './PatientInfo';
import { ObservationType } from './ObservationType';
import { ObservationStatus } from './ObservationStatus';
import { Period } from './Period';
import { ObservationValue } from './ObservationValue';
import { ObservationRange } from './ObservationRange';
import { ObservationComponent } from './ObservationComponent';

export class Observation {
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

    constructor() {
        this.patientInfo = new PatientInfo();
        this.effectivePeriod = new Period();
        this.performerDoctor = new Doctor();
        this.performerBusiness = new BusinessInfo();
        this.value = new ObservationValue();
        this.interpretation = [];
        this.ranges = [];
        this.components = [];
    }

    fromJson(json: any): Observation {
        this.id = json.id;
        this.createdDate = new Date(json.createdDate);
        this.patientInfo.fromJson(json.patientInfo);
        this.type = json.type;
        this.observationKey = json.observationKey;
        this.status = json.status;
        this.effectivePeriod.fromJson(json.effectivePeriod);
        this.issuedDate = new Date(json.issuedDate);
        this.performerDoctor.fromJson(json.performerDoctor);
        this.performerBusiness.fromJson(json.performerBusiness);
        this.value.fromJson(json.value);
        this.note = json.note;
        
        this.interpretation = [];
        if (json.interpretation)
            for (let i: number = 0; i < json.interpretation.length; ++i)
                this.interpretation.push(json.interpretation[i]);

        this.ranges = [];
        if (json.ranges)
            for (let i: number = 0; i < json.ranges.length; ++i)
                this.ranges.push((new ObservationRange).fromJson(json.ranges[i]));
        
        this.components = [];
        if (json.components)
            for (let i: number = 0; i < json.components.length; ++i)
                this.components.push((new ObservationComponent).fromJson(json.components[i]));

        return this;
    }
}