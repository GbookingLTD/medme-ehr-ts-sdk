import { JSONValue } from "../json";
import { ClientPrice } from "./ClientPrice";
export declare class Service {
    id: string;
    name: string;
    price: ClientPrice;
    duration: number;
    constructor();
    fromJson(json: any): Service;
    toJson(): JSONValue;
}
