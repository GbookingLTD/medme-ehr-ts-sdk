import { Gender } from "./Gender";

export class PatientInfo {
    id: string;
    surname: string;
    name: string;
    phone: string;
    email: string;
    gender: Gender;
    birthdate: Date;
}