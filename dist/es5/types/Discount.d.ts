import { DiscountType } from "./DiscountType";
export declare class Discount {
    discountType: DiscountType;
    discountPercent: number;
    fromJson(json: any): Discount;
    toJson(): object;
}
