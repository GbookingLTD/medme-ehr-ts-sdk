import { JSONValue } from "../json";
export declare class TextPeriod {
    begin: string;
    end: string;
}
export declare class Period {
    begin: Date;
    end: Date;
    fromJson(json: any): Period;
    toJson(): JSONValue;
}
//# sourceMappingURL=Period.d.ts.map