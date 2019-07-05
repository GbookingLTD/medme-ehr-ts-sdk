
export class BusinessInfo {
    id: string;
    name: string;
    location: string;
    networkId: string;

    fromJson(json: any): BusinessInfo {
        this.id = json.id;
        this.name = json.name;
        this.location = json.location;
        this.networkId = json.networkId;
        return this;
    }
}