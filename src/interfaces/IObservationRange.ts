import { ObservationType } from "types/ObservationType";
import { IPeriod } from "interfaces/index";

export interface IObservationRange {
  low: number;
  high: number;
  unit: string;
  type: ObservationType;
  age: IPeriod;
  text: string;
}
