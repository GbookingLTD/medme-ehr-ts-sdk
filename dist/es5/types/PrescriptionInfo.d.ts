import { Doctor } from "./Doctor";
import { Medication } from "./Medication";
import { Period } from "./Period";
export declare class PrescriptionInfo {
    id: string;
    created: Date;
    recorderDoctor: Doctor;
    medications: Medication[];
    dosageText: string;
    reasonText: string;
    validityPeriod: Period;
    numberOfRepeats: number;
    title: string;
    fromJson(json: any): PrescriptionInfo;
    toJson(): object;
}
