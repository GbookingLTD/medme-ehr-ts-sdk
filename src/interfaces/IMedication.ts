import { MedicationForm } from "types/MedicationForm";

export interface IMedication {
  name: string;
  code: string;
  codeTable: string;
  reference: string;
  itemSize: string;
  dosageText: string;
  form: MedicationForm;
  amount: number;
  expirationDate: Date;
}
