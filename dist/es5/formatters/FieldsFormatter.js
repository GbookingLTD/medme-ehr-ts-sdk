import l10n from "./l10n/index";
import { dateISOFormat, paragrathes, trim, } from "./Formatter";
export var FieldType;
(function (FieldType) {
    FieldType["Text"] = "text";
    FieldType["List"] = "list";
    FieldType["FieldList"] = "fieldList";
    FieldType["Date"] = "date";
    FieldType["DateTime"] = "dateTime";
})(FieldType || (FieldType = {}));
var Field = /** @class */ (function () {
    function Field() {
    }
    return Field;
}());
export { Field };
function buildFieldArray(obj, propsFormats, t) {
    var keys = Object.keys(obj);
    var ans = [];
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var k = keys_1[_i];
        ans.push({
            key: k,
            title: t[k],
            type: FieldType.Text,
            value: propsFormats[k] ? propsFormats[k](obj[k]) : obj[k],
        });
    }
    return ans;
}
var FieldsFormatter = /** @class */ (function () {
    function FieldsFormatter(localize, dateFormat) {
        if (dateFormat === void 0) { dateFormat = dateISOFormat; }
        this._localize = localize;
        this._dateFormat = dateFormat;
    }
    FieldsFormatter.create = function (locale, dateFormat) {
        if (dateFormat === void 0) { dateFormat = dateISOFormat; }
        return new FieldsFormatter(FieldsFormatter.LOCALIZE[locale], dateFormat);
    };
    // --------------------------------
    // public interface methods
    FieldsFormatter.prototype.appointmentResult = function (ar) {
        var propFormatters = {
            created: this._dateFormat.bind(this),
            start: this._dateFormat.bind(this),
            doctor: this.doctor.bind(this),
            anamnesis: this.anamnesis.bind(this),
            medicalExaminationResult: this.medicalExaminationResult.bind(this),
            diagnosis: this.diagnosis.bind(this),
            recommendations: this.procedures.bind(this),
            scheduledProcedures: this.procedures.bind(this),
            prescriptions: this.prescriptions.bind(this),
        };
        return buildFieldArray(ar, propFormatters, this._localize["appointmentResult"]);
    };
    FieldsFormatter.prototype.diagnosis = function (d) {
        var itemToString = function (item) {
            return item.description + (item.cd10 ? " (cd10: " + item.cd10 + ")" : "");
        };
        if (d.length === 0)
            return [];
        return d.map(function (v) { return ({
            key: "",
            title: "",
            type: FieldType.Text,
            value: "cd10 " + v.cd10 + "\n" + v.description + "\n\n",
        }); });
    };
    FieldsFormatter.prototype.procedure = function (p) {
        throw new Error("Method not implemented.");
    };
    FieldsFormatter.prototype.procedures = function (p) {
        if (p == null || p.length == 0)
            return [];
        var this_ = this;
        return p.reduce(function (ret, item, i) { return ret.concat(this_.procedure(item)); }, []);
    };
    FieldsFormatter.prototype.prescriptions = function (p) {
        var _this = this;
        return "\n" + p.map(function (item) { return _this.prescription(item); }).join("\n");
    };
    FieldsFormatter.prototype.prescription = function (p) {
        var keys = [
            "created",
            "title",
            "recorderDoctor",
            "medications",
            "dosageText",
            "reasonText",
            "validityPeriod",
            "numberOfRepeats",
        ];
        var propFormats = {
            created: this._dateFormat.bind(this),
            recorderDoctor: this.doctor.bind(this),
            validityPeriod: this.period.bind(this),
            medications: this.medications.bind(this),
        };
        return buildFieldArray(p, propFormats, this._localize["appointmentResult"]);
    };
    FieldsFormatter.prototype.medications = function (s) {
        var _this = this;
        return "\n" + s.map(function (item) { return _this.medication(item); }).join("\n");
    };
    FieldsFormatter.prototype.medication = function (s) {
        throw new Error("Method not implemented.");
    };
    FieldsFormatter.prototype.diagnosticReport = function (dr) {
        throw new Error("Method not implemented.");
    };
    FieldsFormatter.prototype.observation = function (o) {
        throw new Error("Method not implemented.");
    };
    // --------------------------------
    // private utility methods
    FieldsFormatter.prototype.anamnesis = function (a) {
        return "\n" + paragrathes(a) + "\n";
    };
    FieldsFormatter.prototype.duration = function (n) {
        return n.toString() + " " + this._localize["MINUTE_UNIT"];
    };
    FieldsFormatter.prototype.doctor = function (d) {
        return d.name + " " + d.surname;
    };
    FieldsFormatter.prototype.yesNo = function (b) {
        return b ? this._localize["YES"] : this._localize["NO"];
    };
    FieldsFormatter.prototype.medicalExaminationResult = function (ar, offset) {
        ar = ar.map(function (line) {
            var m = line.match(/([^:]*):(.*)/);
            if (m) {
                m[1] = trim(m[1]);
                return (m[1] ? m[1] + ": " : "") + trim(m[2]);
            }
            return line;
        });
        return "\n" + paragrathes(ar) + "\n\n";
    };
    FieldsFormatter.prototype.period = function (period, offset) {
        return ("\n" +
            offset +
            this._localize["Period"]["begin"] +
            " " +
            this._dateFormat(period.begin) +
            "\n" +
            offset +
            this._localize["Period"]["end"] +
            " " +
            this._dateFormat(period.end) +
            "\n");
    };
    FieldsFormatter.LOCALIZE = {
        "ru-ru": l10n.ruRU,
        "en-us": l10n.enUS,
    };
    return FieldsFormatter;
}());
export { FieldsFormatter };
