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
}