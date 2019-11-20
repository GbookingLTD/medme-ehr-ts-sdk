export class Period {
    begin: Date;
    end: Date;

    fromJson(json: any) : Period {
        this.begin = new Date(json.begin);
        this.end = new Date(json.end);
        return this;
    }

    toJson(): object {
        let payload: any = {}
        payload.begin = this.begin;
        payload.end = this.end;
        return payload;
    }
}