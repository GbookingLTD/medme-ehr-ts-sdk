export class Period {
    begin: Date;
    end: Date;

    fromJson(json: any) : Period {
        this.begin = json.begin;
        this.end = json.end;
        return this;
    }
}