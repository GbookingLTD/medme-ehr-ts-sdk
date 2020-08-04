var Diagnosis = /** @class */ (function () {
    /**
     * Cоздание объекта "диагноз" из json объекта.
     * @param json json object
     */
    function Diagnosis(json) {
        this.description = json.description;
        this.cd10 = json.cd10;
    }
    Diagnosis.prototype.toJson = function () {
        var payload = {};
        payload.description = this.description;
        payload.cd10 = this.cd10;
        return payload;
    };
    return Diagnosis;
}());
export { Diagnosis };
