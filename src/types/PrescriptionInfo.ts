import { PatientInfo } from "./PatientInfo";
import { Doctor } from "./Doctor";
import { Medication } from "./Medication";
import { Period } from "./Period";

export class PrescriptionInfo {
    id: string;
    created: Date;
    doctor: Doctor;
    medications: Medication[];
    dosageText: string;
    reasonText: string;
    validityPeriod: Period;
    numberOfRepeats: number;
    
    fromJson(json: any): PrescriptionInfo {
        this.id = json.id;
        this.created = new Date(json.created);
        this.doctor = (new Doctor()).fromJson(json.doctor);
        this.medications = json.medications ? json.medications.map((m: any) => (new Medication()).fromJson(m)) : [];
        this.dosageText = json.dosageText;
        this.reasonText = json.reasonText;
        this.validityPeriod = json.validityPeriod ? (new Period()).fromJson(json.validityPeriod) : new Period();
        this.numberOfRepeats = json.numberOfRepeats;
        return this;
    }
}