export class Diagnosis {
    description: string;
    cd10: string;

    /**
     * Cоздание объекта "диагноз" из json объекта.
     * @param json json object
     */
    constructor(json: any) {
        this.description = json.description;
        this.cd10 = json.cd10;
    }
}