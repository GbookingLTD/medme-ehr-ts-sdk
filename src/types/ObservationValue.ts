import { JSONObject, JSONValue } from "../json";
import { ObservationUnit } from './ObservationUnit';

export class ObservationValue
{
    serializedValue: string;
    unit: ObservationUnit;
    code: string;
    value: string;

    fromJson(json: any): ObservationValue {
        this.serializedValue = json.serializedValue;
        this.unit = json.unit;
        this.code = json.code;
        this.value = json.value;
        return this;
    }

    toJson(): JSONValue {
        let payload: JSONObject = {};
        payload.serializedValue = this.serializedValue;
        payload.unit = this.unit;
        payload.code = this.code;
        payload.value = this.value;
        return payload;
    }
}