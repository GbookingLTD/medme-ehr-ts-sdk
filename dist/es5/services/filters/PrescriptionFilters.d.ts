import { LocaleCode } from "../../formatters/LocaleCode";
import { DatePeriodFilter } from "./DatePeriodFilter";
import { Filter, FilterList, IFilter, ISerializableFilter } from "./Filters";
import { FilterTypeEnum } from "./FilterTypes";
export declare class PrescriptionByBusinessIdFilter extends Filter implements ISerializableFilter {
    get prettyValue(): string;
    get kind(): FilterTypeEnum;
    isEmpty(): boolean;
    setup(val: any): void;
    plain(): {
        businessId: string;
        businessName: string;
    };
    businessId: string;
    businessName: string;
}
export declare class PrescriptionByCreatedFilter extends DatePeriodFilter {
    get kind(): FilterTypeEnum;
}
export declare class PrescriptionByPatientIdFilter extends Filter implements ISerializableFilter {
    patientId: string;
    get prettyValue(): string;
    get kind(): FilterTypeEnum;
    isEmpty(): boolean;
    setup(val: any): void;
    plain(): {
        patientId: string;
    };
}
export declare class PrescriptionFilters extends FilterList implements ISerializableFilter {
    static createWithLocale(locale: LocaleCode): PrescriptionFilters;
    constructor(localize: {
        [key: string]: string;
    });
    setup(val: any): void;
    plain(): {
        byBusiness: {
            businessId: string;
            businessName: string;
        };
        byCreated: {
            from: string;
            to: string;
        };
        byPatient: {
            patientId: string;
        };
    };
    getFilters(): IFilter[];
    byBusinessId: PrescriptionByBusinessIdFilter;
    byCreated: PrescriptionByCreatedFilter;
    byPatientId: PrescriptionByPatientIdFilter;
}
//# sourceMappingURL=PrescriptionFilters.d.ts.map