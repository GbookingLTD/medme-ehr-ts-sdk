"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsFormatter = exports.buildFieldArray = exports.FieldMeta = exports.Field = exports.FieldItemMode = exports.FieldType = void 0;
var index_1 = require("./l10n/index");
var Formatter_1 = require("./Formatter");
var index_2 = require("../types/index");
var ObservationType_1 = require("../types/ObservationType");
var DiscountType_1 = require("../types/DiscountType");
var FieldType;
(function (FieldType) {
    FieldType["Text"] = "text";
    FieldType["Number"] = "number";
    FieldType["List"] = "list";
    FieldType["Object"] = "object";
    FieldType["Date"] = "date";
    FieldType["DateTime"] = "dateTime";
    FieldType["Email"] = "email";
    FieldType["Price"] = "price";
    FieldType["Paragraphs"] = "paragraphs";
    FieldType["ObjectList"] = "objectList";
    FieldType["MediaList"] = "mediaList";
    FieldType["AttachmentList"] = "attachmentList";
})(FieldType = exports.FieldType || (exports.FieldType = {}));
var FieldItemMode;
(function (FieldItemMode) {
    FieldItemMode["FirstLine"] = "firstLine";
    FieldItemMode["SecondLine"] = "secondLine";
    FieldItemMode["Hidden"] = "hidden";
    FieldItemMode["Picture"] = "picture";
})(FieldItemMode = exports.FieldItemMode || (exports.FieldItemMode = {}));
var Field = /** @class */ (function () {
    function Field() {
    }
    return Field;
}());
exports.Field = Field;
/**
 * Meta data about field representation.
 */
var FieldMeta = /** @class */ (function () {
    function FieldMeta() {
    }
    return FieldMeta;
}());
exports.FieldMeta = FieldMeta;
function buildFieldArray(data, meta, t, priorKeys) {
    var _a, _b;
    if (priorKeys === void 0) { priorKeys = []; }
    var keys = priorKeys
        .concat(Object.keys(meta))
        .filter(function (k, i, self) { return self.indexOf(k) === i; });
    if (t == null) {
        t = {};
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var k = keys_1[_i];
            t[k] = k;
        }
    }
    var ans = [];
    for (var _c = 0, keys_2 = keys; _c < keys_2.length; _c++) {
        var key = keys_2[_c];
        ans.push({
            key: key,
            title: t[key],
            type: (_a = meta[key]) === null || _a === void 0 ? void 0 : _a.type,
            hint: t[key + "Hint"],
            value: ((_b = meta[key]) === null || _b === void 0 ? void 0 : _b.format) ? meta[key].format(data[key]) : data[key],
        });
    }
    return ans;
}
exports.buildFieldArray = buildFieldArray;
var FieldsFormatter = /** @class */ (function () {
    function FieldsFormatter(localize, dateFormat) {
        if (dateFormat === void 0) { dateFormat = Formatter_1.dateISOFormat; }
        this._localize = localize;
        this._dateFormat = dateFormat;
    }
    FieldsFormatter.create = function (locale, dateFormat) {
        if (dateFormat === void 0) { dateFormat = Formatter_1.dateISOFormat; }
        return new FieldsFormatter(FieldsFormatter.LOCALIZE[locale], dateFormat);
    };
    // ----------------------------------
    // Common field definitions
    FieldsFormatter.prototype.dateField = function (opts) {
        var this_ = this;
        return {
            type: (opts === null || opts === void 0 ? void 0 : opts.dateOnly) ? FieldType.Date : FieldType.DateTime,
            format: function (val) { return this_._dateFormat(val); },
        };
    };
    FieldsFormatter.prototype.textField = function () {
        return {
            type: FieldType.Text,
            format: function (val) { return val; },
        };
    };
    FieldsFormatter.prototype.numberField = function () {
        return {
            type: FieldType.Number,
            format: function (val) { return val; },
        };
    };
    // ----------------------------------
    // Specific field definitions
    FieldsFormatter.prototype.businessField = function () {
        return {
            type: FieldType.Object,
            format: function (val) { return val; },
        };
    };
    FieldsFormatter.prototype.doctorField = function () {
        return { type: FieldType.Object, format: this.doctor.bind(this) };
    };
    FieldsFormatter.prototype.anamnesisField = function () {
        return {
            type: FieldType.List,
            format: this.anamnesis.bind(this),
        };
    };
    FieldsFormatter.prototype.medicalExaminationResultField = function () {
        return {
            type: FieldType.Object,
            format: this.medicalExaminationResult.bind(this),
        };
    };
    FieldsFormatter.prototype.diagnosisField = function () {
        return {
            type: FieldType.Object,
            format: this.diagnosis.bind(this),
        };
    };
    FieldsFormatter.prototype.FormattedFieldList = function (format) {
        return {
            type: FieldType.Object,
            format: format,
        };
    };
    FieldsFormatter.prototype.idField = function () {
        return {
            type: FieldType.Text,
            format: function (val) { return val; },
        };
    };
    FieldsFormatter.prototype.activeStatusField = function () {
        var _this = this;
        return {
            type: FieldType.Text,
            format: function (val) {
                return val
                    ? _this._localize["ActiveStatus"]["active"]
                    : _this._localize["ActiveStatus"]["disactive"];
            },
        };
    };
    FieldsFormatter.prototype.patientField = function () {
        return {
            type: FieldType.Object,
            format: this.patientInfo.bind(this),
        };
    };
    FieldsFormatter.prototype.phonesField = function () {
        return {
            type: FieldType.List,
            format: function (val) { return val; },
        };
    };
    FieldsFormatter.prototype.emailField = function () {
        return {
            type: FieldType.Email,
            format: function (val) { return val; },
        };
    };
    FieldsFormatter.prototype.genderField = function () {
        return {
            type: FieldType.Text,
            format: function (val) { return (val == 0 ? "M" : "W"); },
        };
    };
    FieldsFormatter.prototype.paragrathesField = function () {
        return {
            type: FieldType.Paragraphs,
            format: function (val) { return val; },
        };
    };
    FieldsFormatter.prototype.diagnosisTypeField = function () {
        var _this = this;
        return {
            type: FieldType.Text,
            format: function (val) {
                return val == ObservationType_1.ObservationType.LaboratoryTest
                    ? _this._localize["DiagnosisType"]["laboratoryTest"]
                    : val == ObservationType_1.ObservationType.Observation
                        ? _this._localize["DiagnosisType"]["observation"]
                        : _this._localize["DiagnosisType"]["unknown"];
            },
        };
    };
    FieldsFormatter.prototype.diagnosisCategoryField = function () {
        return {
            type: FieldType.Text,
            format: function (val) { return val; },
        };
    };
    FieldsFormatter.prototype.periodField = function (opt) {
        var _this = this;
        return {
            type: FieldType.Text,
            format: function (val) {
                var period = val;
                return (_this._dateFormat(period.begin) + " - " + _this._dateFormat(period.end));
            },
        };
    };
    FieldsFormatter.prototype.appointmentResultsField = function () {
        var _this = this;
        return {
            type: FieldType.ObjectList,
            format: function (val) {
                return val.map(_this.appointmentResult.bind(_this));
            },
        };
    };
    FieldsFormatter.prototype.appointmentResultField = function () {
        var this_ = this.textField;
        return {
            type: FieldType.Object,
            format: this.appointmentResult.bind(this_),
        };
    };
    FieldsFormatter.prototype.servicesField = function () {
        var _this = this;
        var this_ = this;
        return {
            type: FieldType.ObjectList,
            format: function (val) {
                return val.map(function (item) { return _this.service.bind(this_); });
            },
        };
    };
    FieldsFormatter.prototype.priceField = function () {
        return {
            type: FieldType.ObjectList,
            format: this.clientPrice.bind(this),
        };
    };
    FieldsFormatter.prototype.currencyField = function () {
        var t = this._localize["Currency"];
        return {
            type: FieldType.Text,
            format: function (val) { return t[val]; },
        };
    };
    FieldsFormatter.prototype.priceFormat = function (val, cur) {
        var cp = this._localize["currencyPosition"];
        var t = this._localize["Currency"];
        return cp.left ? t[cur] + "" + val : "" + val + t[cur];
    };
    FieldsFormatter.prototype.plural = function (n, one, many) {
        return n == 1 ? "" + n + one : "" + n + many;
    };
    FieldsFormatter.prototype.durationField = function () {
        var t = this._localize["Duration"];
        var this_ = this;
        return {
            type: FieldType.Text,
            format: function (val) {
                var fm = val;
                var h = this_.plural(fm / 60, t["hour"], t["hours"]);
                var m = this_.plural(fm % 60, t["minute"], t["minutes"]);
                return h + " " + m;
            },
        };
    };
    FieldsFormatter.prototype.mediasField = function () {
        return {
            type: FieldType.MediaList,
            format: function (val) { return val; },
        };
    };
    FieldsFormatter.prototype.attachmentsField = function () {
        return {
            type: FieldType.AttachmentList,
            format: function (val) { return val; },
        };
    };
    // --------------------------------
    // public interface methods
    FieldsFormatter.prototype.clientPrice = function (p) {
        var t = this._localize["Currency"];
        var this_ = this;
        var meta = {
            currency: this.currencyField(),
            originValue: this.numberField(),
            discountValue: this.numberField(),
            value: this.numberField(),
            discount: {
                type: FieldType.Text,
                format: function (val) {
                    var d = val;
                    return d.discountType == DiscountType_1.DiscountType.Percent
                        ? d.discountPercent + "%"
                        : this_.priceFormat(d.discountValue, index_2.Currency.Rur);
                },
            },
        };
        return buildFieldArray(p, meta, this._localize["ClientPrice"]);
    };
    FieldsFormatter.prototype.service = function (s) {
        var meta = {
            id: this.idField(),
            name: this.textField(),
            price: this.priceField(),
            duration: this.durationField(),
        };
        return buildFieldArray(s, meta, this._localize["service"]);
    };
    FieldsFormatter.prototype.patientInfo = function (p) {
        var meta = {
            id: this.idField(),
            surname: this.textField(),
            middleName: this.textField(),
            name: this.textField(),
            phones: this.phonesField(),
            email: this.emailField(),
            gender: this.genderField(),
            birthdate: this.dateField({ dateOnly: true }),
            medcardNumber: this.textField(),
            descriptionText: this.paragrathesField(),
        };
        return buildFieldArray(p, meta, this._localize["patientInfo"]);
    };
    FieldsFormatter.prototype.appointmentResult = function (ar) {
        var meta = {
            business: this.businessField(),
            created: this.dateField(),
            start: this.dateField(),
            doctor: this.doctorField(),
            anamnesis: this.anamnesisField(),
            medicalExaminationResult: this.medicalExaminationResultField(),
            diagnosis: this.diagnosisField(),
            recommendations: this.FormattedFieldList(this.procedures.bind(this)),
            scheduledProcedures: this.FormattedFieldList(this.procedures.bind(this)),
            prescriptions: this.FormattedFieldList(this.prescriptions.bind(this)),
        };
        return buildFieldArray(ar, meta, this._localize["appointmentResult"]);
    };
    FieldsFormatter.prototype.diagnosis = function (d) {
        if (d == null || d.length === 0)
            return [];
        var t = this._localize;
        return d.map(function (v) { return ({
            key: "",
            title: "",
            hint: "",
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
        if (p == null)
            return "";
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
        var meta = {
            id: this.idField(),
            active: this.activeStatusField(),
            business: this.businessField(),
            patient: this.patientField(),
            status: this.numberField(),
            type: this.diagnosisTypeField(),
            category: this.diagnosisCategoryField(),
            effectivePeriod: this.periodField({ dateOnly: true }),
            issuedDate: this.dateField({ dateOnly: true }),
            result: this.appointmentResultsField(),
            services: this.servicesField(),
            resultInterpreter: this.doctorField(),
            resultInterpretation: this.paragrathesField(),
            imagineMedia: this.mediasField(),
            attachments: this.attachmentsField(),
        };
        return buildFieldArray(dr, meta, this._localize["DiagnosticReport"]);
    };
    FieldsFormatter.prototype.observation = function (o) {
        throw new Error("Method not implemented.");
    };
    // --------------------------------
    // private utility methods
    FieldsFormatter.prototype.anamnesis = function (a) {
        return a;
    };
    FieldsFormatter.prototype.duration = function (n) {
        return n.toString() + " " + this._localize["MINUTE_UNIT"];
    };
    FieldsFormatter.prototype.doctor = function (d) {
        if (d == null)
            return "";
        return d.name + " " + d.surname;
    };
    FieldsFormatter.prototype.yesNo = function (b) {
        return b ? this._localize["YES"] : this._localize["NO"];
    };
    FieldsFormatter.prototype.medicalExaminationResult = function (ar, offset) {
        if (ar == null)
            return "";
        ar = ar.map(function (line) {
            var m = line.match(/([^:]*):(.*)/);
            if (m) {
                m[1] = Formatter_1.trim(m[1]);
                return (m[1] ? m[1] + ": " : "") + Formatter_1.trim(m[2]);
            }
            return line;
        });
        return "\n" + Formatter_1.paragrathes(ar) + "\n\n";
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
        "ru-ru": index_1.default.ruRU,
        "en-us": index_1.default.enUS,
    };
    return FieldsFormatter;
}());
exports.FieldsFormatter = FieldsFormatter;
