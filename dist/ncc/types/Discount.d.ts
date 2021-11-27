import { JSONValue } from "../json";
import { DiscountType } from "./DiscountType";
export declare class Discount {
    discountType: DiscountType;
    discountPercent: number;
    discountValue: number;
    fromJson(json: any): Discount;
    toJson(): JSONValue;
}
