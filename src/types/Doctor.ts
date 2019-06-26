import { Specialization } from "./Specialization";

export class Doctor {
    id: string;
    surname: string;
    name: string;
    specialization: Specialization;

    fromJson(json: any): Doctor {
        this.id = json.id;
        this.surname = json.surname;
        this.name = json.name;
        this.specialization = json.specialization ? (new Specialization()).fromJson(json.specialization) : new Specialization();
        return this;
    }
}