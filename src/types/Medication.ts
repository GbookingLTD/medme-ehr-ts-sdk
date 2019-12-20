import { MedicationForm } from "./MedicationForm";

export class Medication {
    form: MedicationForm;
    amount: number;
    expirationDate: Date;

    fromJson(json: any) {
        this.form = json.from;
        this.amount = json.amount;
        this.expirationDate = json.expirationDate;
    }

    toJson(): object {
        let payload: any;
        payload.form = this.form;
        payload.amount = this.amount;
        payload.expirationDate = this.expirationDate;
        return payload;
    }
}