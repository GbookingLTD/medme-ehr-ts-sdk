import { JSONValue } from "../json";
export declare class Diagnosis {
    description: string;
    cd10: string;
    /**
     * Cоздание объекта "диагноз" из json объекта.
     * @param json json object
     */
    constructor(json: any);
    toJson(): JSONValue;
}
