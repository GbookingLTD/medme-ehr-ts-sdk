export declare class BusinessInfo {
    id: string;
    name: string;
    location: string;
    networkId: string;
    fromJson(json: any): BusinessInfo;
    toJson(): object;
}
