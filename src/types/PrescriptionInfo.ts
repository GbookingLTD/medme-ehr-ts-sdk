import { PatientInfo } from "./PatientInfo";
import { Doctor } from "./Doctor";
import { Medication } from "./Medication";
import { Period } from "./Period";

export class PrescriptionInfo {
    id: string;
    created: Date;
    recorderDoctor: Doctor;
    medications: Medication[];
    dosageText: string;
    reasonText: string;
    validityPeriod: Period;
    numberOfRepeats: number;
    title: string;

    fromJson(json: any): PrescriptionInfo {
        this.id = json.id;
        this.created = new Date(json.created);

        if (json.recorderDoctor)
            this.recorderDoctor = (new Doctor()).fromJson(json.recorderDoctor);

        this.medications = json.medications ? json.medications.map((m: any) => (new Medication()).fromJson(m)) : [];
        this.dosageText = json.dosageText;
        this.reasonText = json.reasonText;
        this.validityPeriod = json.validityPeriod ? (new Period()).fromJson(json.validityPeriod) : new Period();
        this.numberOfRepeats = json.numberOfRepeats;
        this.title = json.title;
        return this;
    }

    toJson(): object {
        let payload: any = {};
        payload.id = this.id;
        payload.created = this.created;
        payload.recorderDoctor = this.recorderDoctor.toJson();
        payload.medications = this.medications ? this.medications.map(m => m.toJson()) : [];
        payload.dosageText = this.dosageText;
        payload.reasonText = this.reasonText;
        payload.validityPeriod = this.validityPeriod.toJson();
        payload.numberOfRepeats = this.numberOfRepeats;
        payload.title = this.title;
        return payload;
    }
}