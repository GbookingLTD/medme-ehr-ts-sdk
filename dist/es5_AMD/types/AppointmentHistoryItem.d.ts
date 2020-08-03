import { AppointmentConfirmationStatus } from "./AppointmentConfirmationStatus";
import { DiscountType } from "./DiscountType";
export declare class AppointmentHistoryItem {
    changedDate: Date;
    changedByProfileId: string;
    start: Date;
    duration: number;
    status: AppointmentConfirmationStatus;
    clientAppear: boolean;
    priceValue: number;
    discountType: DiscountType;
    discountPercent: number;
    discountValue: number;
}
