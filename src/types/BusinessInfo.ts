
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

    toJson(): object {
        let payload: any = {};
        payload.id = this.id;
        payload.name = this.name;
        payload.location = this.location;
        payload.networkId = this.networkId;
        return payload;
    }
}