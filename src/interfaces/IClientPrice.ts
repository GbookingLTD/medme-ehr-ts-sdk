import { IDiscount } from "interfaces/index";
import { Currency } from "types/Currency";

export interface IClientPrice {
  currency: Currency;
  originValue: number;
  discountValue: number;
  value: number;
  discount: IDiscount;
}
