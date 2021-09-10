import { ObservationType } from "./ObservationType";
import { ObservationValue } from "./ObservationValue";
import { ObservationRange } from "./ObservationRange";
import { JSONValue } from "../json";
export declare class ObservationComponent {
    type: ObservationType;
    value: ObservationValue;
    interpretation: string;
    ranges: ObservationRange[];
    fromJson(json: any): ObservationComponent;
    toJson(): JSONValue;
}
