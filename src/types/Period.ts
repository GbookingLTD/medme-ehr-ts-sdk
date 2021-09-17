import { JSONObject, JSONValue } from "../json";

export class TextPeriod {
  begin: string;
  end: string;
}

export class Period {
  begin: Date;
  end: Date;

  fromJson(json: any): Period {
    this.begin = new Date(json.begin);
    this.end = new Date(json.end);
    return this;
  }

  toJson(): JSONValue {
    let payload: JSONObject = {};
    payload.begin = this.begin.toJSON();
    payload.end = this.end.toJSON();
    return payload;
  }
}
