import { JSONObject, JSONValue } from "../json";
import { MedicationForm } from "./MedicationForm";

export class Medication {
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

  fromJson(json: any) {
    this.name = json.name;
    this.code = json.code;
    this.codeTable = json.codeTable;
    this.reference = json.reference;
    this.itemSize = json.itemSize;
    this.dosageText = json.dosageText;
    this.form = json.from;
    this.amount = json.amount;
    this.expirationDate = json.expirationDate;
  }

  toJson(): JSONValue {
    let payload: JSONObject = {};
    payload.name = this.name;
    payload.code = this.code;
    payload.codeTable = this.codeTable;
    payload.reference = this.reference;
    payload.itemSize = this.itemSize;
    payload.dosageText = this.dosageText;
    payload.form = this.form;
    payload.amount = this.amount;
    payload.expirationDate = this.expirationDate.toJSON();
    return payload;
  }
}
