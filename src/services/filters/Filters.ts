import { FilterKeys, FilterTypeEnum } from "./FilterTypes";

export interface ISerializableFilter {
  setup(val: any): void;
  plain(): any;
}

export interface IFilter {
  get kind(): FilterTypeEnum;
  get key(): string;
  get title(): string;
  isEmpty(): boolean;
  get prettyValue(): string;
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
  protected localize: { [key: string]: string };

  constructor(localize: { [key: string]: string }) {
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
