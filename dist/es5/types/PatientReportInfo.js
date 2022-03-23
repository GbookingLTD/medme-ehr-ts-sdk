export var PatientReportInfoType;
(function (PatientReportInfoType) {
    PatientReportInfoType[PatientReportInfoType["Item"] = 0] = "Item";
    PatientReportInfoType[PatientReportInfoType["Table"] = 1] = "Table";
    PatientReportInfoType[PatientReportInfoType["Header"] = 2] = "Header";
    PatientReportInfoType[PatientReportInfoType["ItemList"] = 3] = "ItemList";
})(PatientReportInfoType || (PatientReportInfoType = {}));
var PatientReportInfo = /** @class */ (function () {
    function PatientReportInfo() {
        this.type = PatientReportInfoType.Item;
    }
    return PatientReportInfo;
}());
export { PatientReportInfo };
