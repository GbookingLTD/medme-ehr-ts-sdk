import { Gender } from "./Gender";

export class PatientInputProperties {
    id: string;
    surname: string;
    name: string;
    middleName: string;
    phone: string;
    email: string;
    gender: Gender;
    date: Date;

    fromJson(json: any): PatientInputProperties {
        this.id = json.id;
        this.surname = json.surname;
        this.name = json.name;
        this.middleName = json.middleName;
        this.phone = json.phone;
        this.email = json.email;
        this.gender = json.gender;
        this.date = json.date;
        return this;
    }
}