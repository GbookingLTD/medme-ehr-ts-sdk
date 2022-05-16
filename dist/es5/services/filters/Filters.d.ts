import { FilterTypeEnum } from "./FilterTypes";
export interface ISerializableFilter {
    setup(val: any): void;
    plain(): any;
}
export interface IFilter {
    readonly kind: FilterTypeEnum;
    readonly key: string;
    readonly title: string;
    isEmpty(): boolean;
    readonly prettyValue: string;
}
export interface IFilterList {
    isEmpty(): boolean;
    getFilters(): IFilter[];
    getFilledFilters(): IFilter[];
}
export declare abstract class FilterList implements IFilterList {
    isEmpty(): boolean;
    abstract getFilters(): IFilter[];
    getFilledFilters(): IFilter[];
}
export declare abstract class Filter implements IFilter {
    protected localize: any;
    constructor(localize: any);
    abstract get prettyValue(): string;
    abstract get kind(): FilterTypeEnum;
    get key(): string;
    get title(): string;
    abstract isEmpty(): boolean;
}
//# sourceMappingURL=Filters.d.ts.map