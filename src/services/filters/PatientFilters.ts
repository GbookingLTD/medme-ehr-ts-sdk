import l10n from "../../formatters/l10n/index";
import { LocaleCode } from "../../formatters/LocaleCode";
import {
  Filter,
  FilterList,
  IFilter,
  IFilterList,
  ISerializableFilter,
} from "./Filters";
import { FilterTypeEnum } from "./FilterTypes";

function isNullUndefEmpty(val: string): boolean {
  return val == undefined || val == null || val == "";
}

function isNullUndef(val): boolean {
  return val == null || val == undefined;
}

export class PatientByNameFilter extends Filter implements ISerializableFilter {
  get prettyValue(): string {
    return this.name;
  }
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.PatientByName;
  }
  public name: string = "";

  isEmpty(): boolean {
    return isNullUndefEmpty(this.name);
  }
  setup(val: any): void {
    this.name = val?.name || "";
  }
  plain(): any {
    return { name: this.name };
  }
}

export class PatientByMedCardFilter
  extends Filter
  implements ISerializableFilter
{
  get prettyValue(): string {
    return this.medCardId;
  }
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.PatientByMedCard;
  }
  public medCardId: string = "";

  isEmpty(): boolean {
    return isNullUndefEmpty(this.medCardId);
  }
  setup(val: any): void {
    this.medCardId = val?.medCardId || "";
  }
  plain(): any {
    return { medCardId: this.medCardId };
  }
}

export class PatientByPhoneFilter
  extends Filter
  implements ISerializableFilter
{
  get prettyValue(): string {
    return this.phone;
  }
  get kind(): FilterTypeEnum {
    return FilterTypeEnum.PatientByPhone;
  }
  public phone: string = "";

  isEmpty(): boolean {
    return isNullUndefEmpty(this.phone);
  }

  setup(val: any): void {
    this.phone = val?.phone || "";
  }

  plain(): any {
    return { phone: this.phone };
  }
}

export class PatientFilters extends FilterList implements ISerializableFilter {
  static createWithLocale(locale: LocaleCode) {
    return new PatientFilters(l10n.getByLocaleCode(locale)["filters"]);
  }

  constructor(localize: { [key: string]: string }) {
    super();
    this.byMedCard = new PatientByMedCardFilter(localize);
    this.byName = new PatientByNameFilter(localize);
    this.byPhone = new PatientByPhoneFilter(localize);
  }

  getFilters(): IFilter[] {
    return [this.byName, this.byMedCard, this.byPhone];
  }

  public byName: PatientByNameFilter;
  public byMedCard: PatientByMedCardFilter;
  public byPhone: PatientByPhoneFilter;

  setup(val: any): void {
    if (isNullUndef(val)) return;
    this.byName.setup(val["byName"]);
    this.byMedCard.setup(val["byMedCard"]);
    this.byPhone.setup(val["byPhone"]);
  }

  plain(): any {
    return {
      byName: this.byName.plain(),
      byMedCard: this.byMedCard.plain(),
      byPhone: this.byPhone.plain(),
    };
  }
}
