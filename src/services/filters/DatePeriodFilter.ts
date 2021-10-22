import { Filter, ISerializableFilter } from "./Filters";

function isNullUndefZero(val?: any): boolean {
  return val === null || typeof val === "undefined" || val.getTime() === 0;
}

export abstract class DatePeriodFilter
  extends Filter
  implements ISerializableFilter
{
  get prettyValue(): string {
    return (
      new Intl.DateTimeFormat("ru").format(this.from) +
      " — " +
      new Intl.DateTimeFormat("ru").format(this.to)
    );
  }

  setup(val: any): void {
    this.from = val?.from ? new Date(Date.parse(val.from)) : null;
    this.to = val?.to ? new Date(Date.parse(val.to)) : null;
  }
  plain() {
    return {
      from: this.from ? this.from.toISOString() : "",
      to: this.to ? this.to.toISOString() : "",
    };
  }
  public from: Date;
  public to: Date;

  isEmpty(): boolean {
    return isNullUndefZero(this.from) && isNullUndefZero(this.to);
  }
}
