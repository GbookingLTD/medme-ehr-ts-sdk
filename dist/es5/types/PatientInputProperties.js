var PatientInputProperties = /** @class */ (function () {
    function PatientInputProperties() {
    }
    PatientInputProperties.prototype.fromJson = function (json) {
        this.id = json.id;
        this.surname = json.surname;
        this.name = json.name;
        this.middleName = json.middleName;
        this.phone = json.phone;
        this.email = json.email;
        this.gender = json.gender;
        this.date = json.date;
        return this;
    };
    return PatientInputProperties;
}());
export { PatientInputProperties };
//# sourceMappingURL=PatientInputProperties.js.map