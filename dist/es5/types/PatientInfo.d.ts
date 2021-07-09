import { JSONValue } from "../json";
import { Gender } from "./Gender";
export declare class PatientInfo {
    id: string;
    surname: string;
    name: string;
    middleName: string;
    phones: string[];
    email: string;
    gender: Gender;
    date: Date;
    fromJson(json: any): PatientInfo;
    toJson(): JSONValue;
}
