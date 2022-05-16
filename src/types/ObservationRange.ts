import { ObservationType } from "./ObservationType";
import { Period } from "./Period";
import { JSONObject, JSONValue } from "../json";

export class ObservationRange {
  low: number;
  high: number;
  unit: string;
  type: ObservationType;
  age: Period;
  text: string;

  constructor() {
    this.age = new Period();
  }

  fromJson(json: any): ObservationRange {
    this.low = json.low;
    this.high = json.high;
    this.unit = json.unit;
    this.type = json.type;
    if (json.age) this.age.fromJson(json.age);
    this.text = json.text;
    return this;
  }

  toJson(): JSONValue {
    let payload: JSONObject = {};
    payload.low = this.low;
    payload.high = this.high;
    payload.unit = this.unit;
    payload.type = this.type;
    payload.age = this.age ? this.age.toJson() : null;
    payload.text = this.text;
    return payload;
  }
}
