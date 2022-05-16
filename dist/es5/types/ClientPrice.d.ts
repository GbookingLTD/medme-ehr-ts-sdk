import { JSONValue } from "../json";
import { Currency } from "./Currency";
import { Discount } from "./Discount";
export declare class ClientPrice {
    currency: Currency;
    originValue: number;
    discountValue: number;
    value: number;
    discount: Discount;
    constructor();
    fromJson(json: any): ClientPrice;
    toJson(): JSONValue;
}
//# sourceMappingURL=ClientPrice.d.ts.map