import { FilterKeys, FilterTypeEnum } from "./FilterTypes";

export interface ISerializableFilter {
  setup(val: any): void;
  plain(): any;
}

export interface IFilter {
  readonly kind: FilterTypeEnum;
  readonly key: string;
  readonly title: string;
  isEmpty(): boolean;
  readonly prettyValue: string;
}

export interface IFilterList {
  isEmpty(): boolean;
  getFilters(): IFilter[];
  getFilledFilters(): IFilter[];
}

export abstract class FilterList implements IFilterList {
  isEmpty(): boolean {
    return this.getFilters().find((item) => !item.isEmpty()) == null;
  }
  abstract getFilters(): IFilter[];
  getFilledFilters(): IFilter[] {
    return this.getFilters().filter((item: IFilter) => !item.isEmpty());
  }
}

export abstract class Filter implements IFilter {
  protected localize: any;

  constructor(localize: any) {
    this.localize = localize;
  }
  abstract get prettyValue(): string;

  abstract get kind(): FilterTypeEnum;

  get key(): string {
    return FilterKeys[this.kind];
  }
  get title(): string {
    return this.localize[this.key];
  }

  abstract isEmpty(): boolean;
}
