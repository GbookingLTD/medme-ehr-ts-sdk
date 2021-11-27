import { JSONValue } from "../json";
export declare class Specialization {
    id: string;
    name: string;
    fromJson(json: any): Specialization;
    toJson(): JSONValue;
}
