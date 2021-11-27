import { JSONValue } from "../json";
export interface IJsonModel {
    fromJson(json: any): void;
    toJson(): JSONValue;
}
