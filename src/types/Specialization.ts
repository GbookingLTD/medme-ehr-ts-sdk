import { JSONObject, JSONValue } from "../json";

export class Specialization {
  id: string;
  name: string;

  fromJson(json: any): Specialization {
    this.id = json.id;
    this.name = json.name;
    return this;
  }

  toJson(): JSONValue {
    let payload: JSONObject = {};
    payload.id = this.id;
    payload.name = this.name;
    return payload;
  }
}
