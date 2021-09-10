import { JSONObject, JSONValue } from "../json";
import { DiscountType } from "./DiscountType";

export class Discount {
  discountType: DiscountType;
  discountPercent: number;
  discountValue: number;

  fromJson(json: any): Discount {
    this.discountType = json.discountType;
    this.discountPercent = json.discountPercent;
    return this;
  }

  toJson(): JSONValue {
    let payload: JSONObject = {};
    payload.discountType = this.discountType;
    payload.discountPercent = this.discountPercent;
    return payload;
  }
}
