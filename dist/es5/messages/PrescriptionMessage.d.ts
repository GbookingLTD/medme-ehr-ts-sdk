import { Doctor, PatientInfo, Medication, Period, BusinessInfo } from '../types/index';
export declare class PrescriptionMessage {
    id: string;
    created: Date;
    business: BusinessInfo;
    patientId: string;
    patientInfo: PatientInfo;
    recorderDoctor: Doctor;
    medications: Medication[];
    dosageText: string;
    reasonText: string;
    validityPeriod: Period;
    numberOfRepeats: number;
    title: string;
}
