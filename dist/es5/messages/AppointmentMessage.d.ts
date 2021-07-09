import { BusinessInfo, Doctor, Service, AppointmentConfirmationStatus, ClientPrice, AppointmentSource, PatientInfo } from "../types/index";
export declare class AppointmentMessage {
    id: string;
    patientId: string;
    patient: PatientInfo;
    business: BusinessInfo;
    created: Date;
    start: Date;
    doctor: Doctor;
    services: Service[];
    duration: number;
    confirmationStatus: AppointmentConfirmationStatus;
    clientAppear: boolean;
    resultId: string;
    clientPrice: ClientPrice;
    source: AppointmentSource;
}
