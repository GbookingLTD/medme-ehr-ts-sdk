import { JSONValue } from "../json";
import { MedicationForm } from "./MedicationForm";
export declare class Medication {
    name: string;
    code: string;
    codeTable: string;
    reference: string;
    itemSize: string;
    dosageText: string;
    form: MedicationForm;
    amount: number;
    expirationDate: Date;
    durationText: string;
    dosageInstruction: object[];
    fromJson(json: any): void;
    toJson(): JSONValue;
}
