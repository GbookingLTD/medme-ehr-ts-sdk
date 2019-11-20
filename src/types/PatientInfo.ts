import { Gender } from "./Gender";

export class PatientInfo {
    id: string;
    surname: string;
    name: string;
    middleName: string;
    phones: string[];
    email: string;
    gender: Gender;
    date: Date;

    fromJson(json: any): PatientInfo {
        this.id = json.id;
        this.surname = json.surname;
        this.name = json.name;
        this.middleName = json.middleName;
        this.phones = json.phones;
        this.email = json.email;
        this.gender = json.gender;
        this.date = json.date;
        return this;
    }

    toJson(): object {
        let payload: any = {};
        payload.id = this.id;
        payload.surname = this.surname;
        payload.name = this.name;
        payload.middleName = this.middleName;
        payload.phones = this.phones;
        payload.email = this.email;
        payload.gender = this.gender;
        payload.date = this.date;
        return payload;
    }
}