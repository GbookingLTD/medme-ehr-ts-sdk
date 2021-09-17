import { LocaleCode } from "../../formatters/LocaleCode";
import { DatePeriodFilter } from "./DatePeriodFilter";
import { Filter, FilterList, IFilter, ISerializableFilter } from "./Filters";
import { FilterTypeEnum } from "./FilterTypes";
export declare class DiagnosticReportByBusinessIdFilter extends Filter implements ISerializableFilter {
    get prettyValue(): string;
    get kind(): FilterTypeEnum;
    isEmpty(): boolean;
    setup(val: any): void;
    plain(): {
        businessId: string;
    };
    businessId: string;
}
export declare class DiagnosticReportByCreatedFilter extends DatePeriodFilter {
    get kind(): FilterTypeEnum;
}
export declare class DiagnosticReportByPatientIdFilter extends Filter implements ISerializableFilter {
    patientId: string;
    get prettyValue(): string;
    get kind(): FilterTypeEnum;
    isEmpty(): boolean;
    setup(val: any): void;
    plain(): {
        patientId: string;
    };
}
export declare class DiagnosticReportFilters extends FilterList implements ISerializableFilter {
    static createWithLocale(locale: LocaleCode): DiagnosticReportFilters;
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
        byPatient: {
            patientId: string;
        };
    };
    getFilters(): IFilter[];
    byBusinessId: DiagnosticReportByBusinessIdFilter;
    byCreated: DiagnosticReportByCreatedFilter;
    byPatientId: DiagnosticReportByPatientIdFilter;
}
