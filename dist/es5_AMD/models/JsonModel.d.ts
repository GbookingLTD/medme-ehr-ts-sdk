export interface IJsonModel {
    fromJson(json: any): void;
    toJson(): object;
}
