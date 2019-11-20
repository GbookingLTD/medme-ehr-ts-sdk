import { DiscountType } from "./DiscountType";

export class Discount {
    discountType: DiscountType;
    discountPercent: number;

    fromJson(json: any): Discount {
        this.discountType = json.discountType;
        this.discountPercent = json.discountPercent;
        return this;
    }

    toJson(): object {
        let payload: any = {};
        payload.discountType = this.discountType;
        payload.discountPercent = this.discountPercent;
        return payload;
    }
}