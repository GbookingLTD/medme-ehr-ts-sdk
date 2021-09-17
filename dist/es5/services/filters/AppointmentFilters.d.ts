import { LocaleCode } from "../../formatters/LocaleCode";
import { DatePeriodFilter } from "./DatePeriodFilter";
import { Filter, FilterList, IFilter, ISerializableFilter } from "./Filters";
import { FilterTypeEnum } from "./FilterTypes";
export declare function isNullUndefZero(val: Date): boolean;
export declare class AppointmentByBusinessIdFilter extends Filter implements ISerializableFilter {
    get prettyValue(): string;
    setup(val: any): void;
    plain(): {
        businessId: string;
    };
    businessId: string;
    get kind(): FilterTypeEnum;
    get key(): string;
    get title(): string;
    isEmpty(): boolean;
}
export declare class AppointmentByCreatedFilter extends DatePeriodFilter {
    get kind(): FilterTypeEnum;
}
export declare class AppointmentByStartFilter extends DatePeriodFilter {
    get kind(): FilterTypeEnum;
}
export declare class AppointmentByPatientIdFilter extends Filter implements ISerializableFilter {
    get prettyValue(): string;
    setup(val: any): void;
    plain(): {
        patientId: string;
    };
    get kind(): FilterTypeEnum;
    patientId: string;
    isEmpty(): boolean;
}
export declare class AppointmentFilters extends FilterList implements ISerializableFilter {
    static createWithLocale(locale: LocaleCode): AppointmentFilters;
    constructor(localize: {
        [key: string]: string;
    });
    setup(val: any): void;
    plain(): {
        byBusiness: {
            businessId: string;
        };
        byCreated: {
            from: string;
            to: string;
        };
        byStart: {
            from: string;
            to: string;
        };
        byPatient: {
            patientId: string;
        };
    };
    getFilters(): IFilter[];
    byBusinessId: AppointmentByBusinessIdFilter;
    byCreated: AppointmentByCreatedFilter;
    byStart: AppointmentByStartFilter;
    byPatientId: AppointmentByPatientIdFilter;
}
