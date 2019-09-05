import { Gender } from "./Gender";

export class PatientInfo {
    id: string;
    surname: string;
    name: string;
    phones: string[];
    email: string;
    gender: Gender;
    date: Date;

    fromJson(json: any): PatientInfo {
        this.id = json.id;
        this.surname = json.surname;
        this.name = json.name;
        this.phones = json.phones;
        this.email = json.email;
        this.gender = json.gender;
        this.date = json.date;
        return this;
    }
}