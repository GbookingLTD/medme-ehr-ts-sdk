
export class Specialization {
    id: string;
    name: string;

    fromJson(json: any): Specialization {
        this.id = json.id;
        this.name = json.name;
        return this;
    }
}