import { FilterTypeEnum } from "./FilterTypes";
export interface ISerializableFilter {
    setup(val: any): void;
    plain(): any;
}
export interface IFilter {
    get kind(): FilterTypeEnum;
    get key(): string;
    get title(): string;
    isEmpty(): boolean;
    get prettyValue(): string;
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
    protected localize: {
        [key: string]: string;
    };
    constructor(localize: {
        [key: string]: string;
    });
    abstract get prettyValue(): string;
    abstract get kind(): FilterTypeEnum;
    get key(): string;
    get title(): string;
    abstract isEmpty(): boolean;
}
