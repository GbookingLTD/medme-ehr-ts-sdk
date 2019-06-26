
import { ClientPrice } from "./ClientPrice";

export class AppointmentInputProperties {
    businessId: string;
    start: Date;
    duration: number;
    doctorId: string;
    services: string[];
    patientId: string;
    sourceId: string;
    clientPrice: ClientPrice;
}