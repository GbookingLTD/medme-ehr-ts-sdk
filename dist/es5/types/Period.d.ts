import { JSONValue } from "../json";
export declare class Period {
    begin: Date;
    end: Date;
    fromJson(json: any): Period;
    toJson(): JSONValue;
}
