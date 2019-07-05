import { ObservationUnit } from './ObservationUnit';
import { ObservationType } from './ObservationType';
import { Period } from './Period';

export class ObservationRange {
    low: number;
    high: number;
    unit: ObservationUnit;
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
        if (json.age)
            this.age.fromJson(json.age);
        this.text = json.text;
        return this;
    }
}