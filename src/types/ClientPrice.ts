import { Currency } from "./Currency";
import { Discount } from "./Discount";

export class ClientPrice {
    currency: Currency;
    originValue: number;
    discountValue: number;
    value: number;
    discount: Discount;

    constructor() {
        this.discount = new Discount();
    }

    fromJson(json: any): ClientPrice {
        this.currency = json.currency;
        this.originValue = json.originValue;
        this.discountValue = json.discountValue;
        this.value = json.value;
        if(json.discount)
            this.discount.fromJson(json.discount);
        return this;
    }
}