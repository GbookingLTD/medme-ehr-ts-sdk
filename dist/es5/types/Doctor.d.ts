import { JSONValue } from "../json";
import { Specialization } from "./Specialization";
export declare class Doctor {
    id: string;
    surname: string;
    name: string;
    specialization: Specialization;
    fromJson(json: any): Doctor;
    toJson(): JSONValue;
}
