import { JSONValue } from "../json";
import { MedicationForm } from "./MedicationForm";
export declare class Medication {
    form: MedicationForm;
    amount: number;
    expirationDate: Date;
    fromJson(json: any): void;
    toJson(): JSONValue;
}
