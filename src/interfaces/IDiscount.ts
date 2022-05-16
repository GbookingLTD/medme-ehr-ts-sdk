import { DiscountType } from "types/DiscountType";

export interface IDiscount {
  discountType: DiscountType;
  discountPercent: number;
  discountValue: number;
}
