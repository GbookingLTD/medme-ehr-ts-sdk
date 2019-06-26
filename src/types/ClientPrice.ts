import { Currency } from "./Currency";
import { Discount } from "./Discount";

export class ClientPrice {
    currency: Currency;
    originValue: number;
    discountValue: number;
    value: number;
    discount: Discount;
}