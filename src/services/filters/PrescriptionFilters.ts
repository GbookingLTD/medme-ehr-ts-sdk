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

export class PrescriptionByBusinessIdFilter
  extends Filter
  implements ISerializableFilter
{
  get prettyValue(): string {
    return this.businessName;
  }
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.PrescriptionByBusiness;
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

export class PrescriptionByCreatedFilter extends DatePeriodFilter {
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.PrescriptionByCreated;
  }
}

export class PrescriptionByPatientIdFilter
  extends Filter
  implements ISerializableFilter
{
  public patientId: string = "";
  get prettyValue(): string {
    return this.patientId;
  }
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.PrescriptionByPatient;
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

export class PrescriptionFilters
  extends FilterList
  implements ISerializableFilter
{
  static createWithLocale(locale: LocaleCode) {
    return new PrescriptionFilters(l10n.getByLocaleCode(locale)["filters"]);
  }

  constructor(localize: { [key: string]: string }) {
    super();
    this.byBusinessId = new PrescriptionByBusinessIdFilter(localize);
    this.byCreated = new PrescriptionByCreatedFilter(localize);
    this.byPatientId = new PrescriptionByPatientIdFilter(localize);
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

  public byBusinessId: PrescriptionByBusinessIdFilter;
  public byCreated: PrescriptionByCreatedFilter;
  public byPatientId: PrescriptionByPatientIdFilter;
}
