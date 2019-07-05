import { ObservationType } from './ObservationType';
import { ObservationValue } from './ObservationValue';
import { ObservationRange } from './ObservationRange';

export class ObservationComponent {
    type: ObservationType;
    value: ObservationValue;
    interpretation: string;
    ranges: ObservationRange[];

    fromJson(json: any): ObservationComponent {
        this.type = json.type;
        this.value = json.value;
        this.interpretation = json.interpretation;
        this.ranges = json.ranges ? new ObservationRange[json.ranges.length] : [];
        if (json.ranges)
            for (let i: number = 0; i < json.ranges.length; ++i)
                this.ranges[i] = (new ObservationRange).fromJson(json.ranges[i]);
        
        return this;
    }
}