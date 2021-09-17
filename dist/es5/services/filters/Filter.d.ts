import { FilterTypeEnum } from "./FilterTypes";
export interface IFilter {
    get kind(): FilterTypeEnum;
    get key(): string;
    get name(): string;
    isEmpty(): boolean;
}
export interface IFilterList {
    isEmpty(): boolean;
    getFilledFilters(): IFilter[];
}
export declare abstract class Filter implements IFilter {
    protected localize: {
        [key: string]: string;
    };
    constructor(localize: {
        [key: string]: string;
    });
    abstract get kind(): FilterTypeEnum;
    get key(): string;
    get name(): string;
    abstract isEmpty(): boolean;
}
