import { JSONObject, JSONValue } from "../json";
import { ClientPrice } from "./ClientPrice";

export class Service {
    id: string;
    name: string;
    price: ClientPrice;
    duration: number;

    constructor() {
        this.price = new ClientPrice();
    }

    fromJson(json: any): Service {
        this.id = json.id;
        this.name = json.name;
        if (json.price)
            this.price.fromJson(json.price);
        this.duration = json.duration;
        return this;
    }

    toJson(): JSONValue {
        let payload: JSONObject = {};
        payload.id = this.id;
        payload.name = this.name;
        payload.price = this.price ? this.price.toJson() : null;
        payload.duration = this.duration;
        return payload;
    }
}
