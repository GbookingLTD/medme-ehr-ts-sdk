import { Gender } from "./Gender";

export class PatientInfo {
    id: string;
    surname: string;
    name: string;
    phone: string;
    email: string;
    gender: Gender;
    birthdate: Date;

    fromJson(json: any): PatientInfo {
        this.id = json.id;
        this.surname = json.surname;
        this.name = json.name;
        this.phone = json.phone;
        this.email = json.email;
        this.gender = json.gender;
        this.birthdate = json.birthdate;
        return this;
    }
}