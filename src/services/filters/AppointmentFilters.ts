import l10n from "../../formatters/l10n/index";
import { LocaleCode } from "../../formatters/LocaleCode";
import { DatePeriodFilter } from "./DatePeriodFilter";
import {
  Filter,
  FilterList,
  IFilter,
  IFilterList,
  ISerializableFilter,
} from "./Filters";
import { FilterKeys, FilterTypeEnum } from "./FilterTypes";

function isNullUndefEmpty(val: string): boolean {
  return val == undefined || val == null || val == "";
}

function isNullUndef(val): boolean {
  return val == null || val == undefined;
}

export function isNullUndefZero(val: Date): boolean {
  return val == null || val == undefined || val.getTime() == 0;
}

export class AppointmentByBusinessIdFilter
  extends Filter
  implements ISerializableFilter
{
  get prettyValue(): string {
    return this.businessName;
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

  get kind(): FilterTypeEnum {
    return FilterTypeEnum.AppointmentByBusiness;
  }
  get key(): string {
    return FilterKeys[this.kind];
  }
  get title(): string {
    return this.localize[this.key];
  }

  isEmpty(): boolean {
    return isNullUndefEmpty(this.businessId);
  }
}

export class AppointmentByCreatedFilter extends DatePeriodFilter {
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.AppointmentByCreated;
  }
}
export class AppointmentByStartFilter extends DatePeriodFilter {
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.AppointmentByStarted;
  }
}

export class AppointmentByPatientIdFilter
  extends Filter
  implements ISerializableFilter
{
  get prettyValue(): string {
    return this.patientId;
  }
  setup(val: any): void {
    this.patientId = val?.patientId || "";
  }
  plain() {
    return { patientId: this.patientId };
  }
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.AppointmentByPatientId;
  }

  public patientId: string = "";

  isEmpty(): boolean {
    return isNullUndefEmpty(this.patientId);
  }
}

export class AppointmentFilters
  extends FilterList
  implements ISerializableFilter
{
  static createWithLocale(locale: LocaleCode) {
    return new AppointmentFilters(l10n.getByLocaleCode(locale)["filters"]);
  }

  constructor(localize: { [key: string]: string }) {
    super();
    this.byBusinessId = new AppointmentByBusinessIdFilter(localize);
    this.byCreated = new AppointmentByCreatedFilter(localize);
    this.byPatientId = new AppointmentByPatientIdFilter(localize);
    this.byStart = new AppointmentByStartFilter(localize);
  }
  setup(val: any): void {
    if (isNullUndef(val)) return;
    this.byBusinessId.setup(val["byBusines"]);
    this.byCreated.setup(val["byCreated"]);
    this.byStart.setup(val["byStart"]);
    this.byPatientId.setup(val["byPatient"]);
  }
  plain() {
    return {
      byBusiness: this.byBusinessId.plain(),
      byCreated: this.byCreated.plain(),
      byStart: this.byStart.plain(),
      byPatient: this.byPatientId.plain(),
    };
  }

  getFilters(): IFilter[] {
    return [this.byBusinessId, this.byCreated, this.byStart, this.byPatientId];
  }

  public byBusinessId: AppointmentByBusinessIdFilter;
  public byCreated: AppointmentByCreatedFilter;
  public byStart: AppointmentByStartFilter;
  public byPatientId: AppointmentByPatientIdFilter;
}
