import { DiscountType } from "./DiscountType";

export class Discount {
    discountType: DiscountType;
    discountPercent: number;

    fromJson(json: any): Discount {
        if (json)
        {
            this.discountType = json.discountType;
            this.discountPercent = json.discountPercent;
        }
        return this;
    }

}