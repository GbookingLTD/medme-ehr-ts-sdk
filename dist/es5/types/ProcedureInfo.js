var ProcedureInfo = /** @class */ (function () {
    /**
     * Создание объекта "информация о процедуре" по объекту json.
     *
     * @param json json object
     */
    function ProcedureInfo(json) {
        this.id = json.id;
        this.title = json.title;
        this.status = json.status;
        this.type = json.type;
        this.required = json.required;
    }
    return ProcedureInfo;
}());
export { ProcedureInfo };
//# sourceMappingURL=ProcedureInfo.js.map