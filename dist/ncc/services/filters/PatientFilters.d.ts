import { LocaleCode } from "../../formatters/LocaleCode";
import { Filter, FilterList, IFilter, ISerializableFilter } from "./Filters";
import { FilterTypeEnum } from "./FilterTypes";
export declare class PatientByNameFilter extends Filter implements ISerializableFilter {
    get prettyValue(): string;
    get kind(): FilterTypeEnum;
    name: string;
    isEmpty(): boolean;
    setup(val: any): void;
    plain(): any;
}
export declare class PatientByMedCardFilter extends Filter implements ISerializableFilter {
    get prettyValue(): string;
    get kind(): FilterTypeEnum;
    medCardId: string;
    isEmpty(): boolean;
    setup(val: any): void;
    plain(): any;
}
export declare class PatientByPhoneFilter extends Filter implements ISerializableFilter {
    get prettyValue(): string;
    get kind(): FilterTypeEnum;
    phone: string;
    isEmpty(): boolean;
    setup(val: any): void;
    plain(): any;
}
export declare class PatientFilters extends FilterList implements ISerializableFilter {
    static createWithLocale(locale: LocaleCode): PatientFilters;
    constructor(localize: {
        [key: string]: string;
    });
    getFilters(): IFilter[];
    byName: PatientByNameFilter;
    byMedCard: PatientByMedCardFilter;
    byPhone: PatientByPhoneFilter;
    setup(val: any): void;
    plain(): any;
}
