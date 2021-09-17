import { Filter, ISerializableFilter } from "./Filters";
export declare abstract class DatePeriodFilter extends Filter implements ISerializableFilter {
    get prettyValue(): string;
    setup(val: any): void;
    plain(): {
        from: string;
        to: string;
    };
    from: Date;
    to: Date;
    isEmpty(): boolean;
}
