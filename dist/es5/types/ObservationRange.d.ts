import { ObservationType } from "./ObservationType";
import { Period } from "./Period";
import { JSONValue } from "../json";
export declare class ObservationRange {
    low: number;
    high: number;
    unit: string;
    type: ObservationType;
    age: Period;
    text: string;
    constructor();
    fromJson(json: any): ObservationRange;
    toJson(): JSONValue;
}
//# sourceMappingURL=ObservationRange.d.ts.map