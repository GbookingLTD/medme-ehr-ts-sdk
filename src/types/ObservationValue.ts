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
}