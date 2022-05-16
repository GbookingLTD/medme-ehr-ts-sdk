import { IObservationRange, IObservationValue } from "interfaces/index";
import { ObservationType } from "types/ObservationType";
export interface IObservationComponent {
    type: ObservationType;
    value: IObservationValue;
    interpretation: string;
    ranges: IObservationRange[];
}
//# sourceMappingURL=IObservationComponent.d.ts.map