
export class Specialization {
    id: string;
    name: string;

    fromJson(json: any): Specialization {
        this.id = json.id;
        this.name = json.name;
        return this;
    }

    toJson(): object{
        let payload: any = {};
        payload.id = this.id;
        payload.name = this.name;
        return payload;
    }
}