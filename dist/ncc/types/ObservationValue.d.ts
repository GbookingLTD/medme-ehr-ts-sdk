import { JSONValue } from "../json";
import { ObservationUnit } from "./ObservationUnit";
export declare class ObservationValue {
    serializedValue: string;
    unit: ObservationUnit;
    code: string;
    value: string;
    fromJson(json: any): ObservationValue;
    toJson(): JSONValue;
}
