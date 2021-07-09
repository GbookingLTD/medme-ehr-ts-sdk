import { ObservationUnit } from './ObservationUnit';
import { ObservationType } from './ObservationType';
import { Period } from './Period';
import { JSONValue } from "../json";
export declare class ObservationRange {
    low: number;
    high: number;
    unit: ObservationUnit;
    type: ObservationType;
    age: Period;
    text: string;
    constructor();
    fromJson(json: any): ObservationRange;
    toJson(): JSONValue;
}
