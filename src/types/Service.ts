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
        this.price.fromJson(json.price);
        this.duration = json.duration;
        return this;
    }
}
