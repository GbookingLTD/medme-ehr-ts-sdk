export declare type JSONValue = string | number | boolean | JSONObject | JSONArray;
export interface JSONObject {
    [x: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {
}
//# sourceMappingURL=json.d.ts.map