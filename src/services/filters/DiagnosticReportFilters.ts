import l10n from "../../formatters/l10n/index";
import { LocaleCode } from "../../formatters/LocaleCode";
import { DatePeriodFilter } from "./DatePeriodFilter";
import { Filter, FilterList, IFilter, ISerializableFilter } from "./Filters";
import { FilterTypeEnum } from "./FilterTypes";

function isNullUndefEmpty(val: string): boolean {
  return val == undefined || val == null || val == "";
}

function isNullUndef(val): boolean {
  return val == null || val == undefined;
}

function isNullUndefZero(val: Date): boolean {
  return val == null || val == undefined || val.getTime() == 0;
}

export class DiagnosticReportByBusinessIdFilter
  extends Filter
  implements ISerializableFilter
{
  get prettyValue(): string {
    return this.businessName;
  }
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.DiagnosticReportByBusiness;
  }
  isEmpty(): boolean {
    return isNullUndefEmpty(this.businessId);
  }
  setup(val: any): void {
    this.businessId = val?.businessId || "";
    this.businessName = val?.businessName || "";
  }
  plain() {
    return { businessId: this.businessId, businessName: this.businessName };
  }

  public businessId: string = "";
  public businessName: string = "";
}

export class DiagnosticReportByCreatedFilter extends DatePeriodFilter {
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.DiagnosticReportByCreated;
  }
}

export class DiagnosticReportByPatientIdFilter
  extends Filter
  implements ISerializableFilter
{
  public patientId: string = "";
  get prettyValue(): string {
    return this.patientId;
  }
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.DiagnosticReportByPatientId;
  }
  isEmpty(): boolean {
    return isNullUndefEmpty(this.patientId);
  }
  setup(val: any): void {
    this.patientId = val?.patientId || "";
  }
  plain() {
    return {
      patientId: this.patientId || "",
    };
  }
}

export class DiagnosticReportFilters
  extends FilterList
  implements ISerializableFilter
{
  static createWithLocale(locale: LocaleCode) {
    return new DiagnosticReportFilters(l10n.getByLocaleCode(locale)["filters"]);
  }

  constructor(localize: any) {
    super();
    this.byBusinessId = new DiagnosticReportByBusinessIdFilter(localize);
    this.byCreated = new DiagnosticReportByCreatedFilter(localize);
    this.byPatientId = new DiagnosticReportByPatientIdFilter(localize);
  }
  setup(val: any): void {
    if (isNullUndef(val)) return;
    this.byBusinessId.setup(val["byBusines"]);
    this.byCreated.setup(val["byCreated"]);
    this.byPatientId.setup(val["byPatient"]);
  }
  plain() {
    return {
      byBusiness: this.byBusinessId.plain(),
      byCreated: this.byCreated.plain(),
      byPatient: this.byPatientId.plain(),
    };
  }

  getFilters(): IFilter[] {
    return [this.byBusinessId, this.byCreated, this.byPatientId];
  }

  public byBusinessId: DiagnosticReportByBusinessIdFilter;
  public byCreated: DiagnosticReportByCreatedFilter;
  public byPatientId: DiagnosticReportByPatientIdFilter;
}
