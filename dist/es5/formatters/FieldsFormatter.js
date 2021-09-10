import l10n from "./l10n/index";
import { dateISOFormat, paragrathes as paragraphs, trim, } from "./Formatter";
import { Currency, } from "../types/index";
import { ObservationType } from "../types/ObservationType";
import { DiscountType } from "../types/DiscountType";
export var FieldType;
(function (FieldType) {
    FieldType["Text"] = "text";
    FieldType["Number"] = "number";
    FieldType["List"] = "list";
    FieldType["Object"] = "object";
    FieldType["Date"] = "date";
    FieldType["DateTime"] = "dateTime";
    FieldType["DatePeriod"] = "datePeriod";
    FieldType["Email"] = "email";
    FieldType["Price"] = "price";
    FieldType["Status"] = "status";
    FieldType["Paragraphs"] = "paragraphs";
    FieldType["ObjectList"] = "objectList";
    FieldType["MediaList"] = "mediaList";
    FieldType["AttachmentList"] = "attachmentList";
    FieldType["Hidden"] = "hidden";
})(FieldType || (FieldType = {}));
export var FieldStatusColor;
(function (FieldStatusColor) {
    FieldStatusColor["Red"] = "red";
    FieldStatusColor["Yellow"] = "yellow";
    FieldStatusColor["Blue"] = "blue";
    FieldStatusColor["Green"] = "green";
})(FieldStatusColor || (FieldStatusColor = {}));
export var FieldItemMode;
(function (FieldItemMode) {
    FieldItemMode["FirstLine"] = "firstLine";
    FieldItemMode["SecondLine"] = "secondLine";
    FieldItemMode["ThirdLine"] = "thirdLine";
    FieldItemMode["Hidden"] = "hidden";
    FieldItemMode["Picture"] = "picture";
})(FieldItemMode || (FieldItemMode = {}));
var Field = /** @class */ (function () {
    function Field() {
    }
    return Field;
}());
export { Field };
/**
 * Meta data about field representation.
 */
var FieldMeta = /** @class */ (function () {
    function FieldMeta() {
    }
    return FieldMeta;
}());
export { FieldMeta };
var FieldItemModeMeta = /** @class */ (function () {
    function FieldItemModeMeta() {
    }
    return FieldItemModeMeta;
}());
export { FieldItemModeMeta };
export function buildFieldArray(data, meta, t, priorKeys, itemModeMeta) {
    var _a, _b;
    if (priorKeys === void 0) { priorKeys = []; }
    if (itemModeMeta === void 0) { itemModeMeta = null; }
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
            originValue: data[key],
            value: ((_b = meta[key]) === null || _b === void 0 ? void 0 : _b.format) ? meta[key].format(data[key]) : data[key],
        });
    }
    if (itemModeMeta != null) {
        ans.push({
            key: "__itemModeFirstLine__",
            itemMode: FieldItemMode.FirstLine,
            title: "itemModeFirstLine",
            type: FieldType.Hidden,
            hint: "",
            originValue: data,
            value: itemModeMeta.firstLine(data),
        });
        ans.push({
            key: "__itemModeSecondLine__",
            itemMode: FieldItemMode.SecondLine,
            title: "itemModeSecondLine",
            type: FieldType.Hidden,
            hint: "",
            originValue: data,
            value: itemModeMeta.secondLine(data),
        });
        if (itemModeMeta.thirdLine != null) {
            ans.push({
                key: "__itemModeThirdLine__",
                itemMode: FieldItemMode.ThirdLine,
                title: "itemModeThirdLine",
                type: FieldType.Hidden,
                hint: "",
                originValue: data,
                value: itemModeMeta.thirdLine(data),
            });
        }
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
            format: this.business.bind(this),
        };
    };
    FieldsFormatter.prototype.doctorField = function () {
        return { type: FieldType.Text, format: this.doctor.bind(this) };
    };
    FieldsFormatter.prototype.doctorsField = function () {
        return { type: FieldType.List, format: this.doctors.bind(this) };
    };
    FieldsFormatter.prototype.anamnesisField = function () {
        return {
            type: FieldType.List,
            format: this.anamnesis.bind(this),
        };
    };
    FieldsFormatter.prototype.medicalExaminationResultField = function () {
        return {
            type: FieldType.Paragraphs,
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
    FieldsFormatter.prototype.activeField = function () {
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
    FieldsFormatter.prototype.statusField = function () {
        return {
            type: FieldType.Status,
            format: function (val) {
                return ({
                    color: "green",
                    text: "Active",
                });
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
                return val == ObservationType.LaboratoryTest
                    ? _this._localize["DiagnosisType"]["laboratoryTest"]
                    : val == ObservationType.Observation
                        ? _this._localize["DiagnosisType"]["observation"]
                        : _this._localize["DiagnosisType"]["unknown"] + " (#" + val + ")";
            },
        };
    };
    FieldsFormatter.prototype.diagnosisCategoryField = function () {
        return {
            type: FieldType.Text,
            format: function (val) { return val; },
        };
    };
    FieldsFormatter.prototype.periodField = function (_a) {
        var _this = this;
        var boolean = _a.dateOnly;
        return {
            type: FieldType.DatePeriod,
            format: function (val) {
                var period = val;
                if (typeof period.begin === "string")
                    period.begin = new Date(Date.parse(period.begin));
                if (typeof period.end === "string")
                    period.end = new Date(Date.parse(period.end));
                return {
                    from: _this._dateFormat(period.begin),
                    fromIsZero: period.begin === null || period.begin.getTime() === 0,
                    to: _this._dateFormat(period.end),
                    toIsZero: period.end === null || period.end.getTime() === 0,
                };
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
        var this_ = this;
        return {
            type: FieldType.List,
            format: function (val) {
                return val.map(function (item) { return item.name; });
            },
        };
    };
    FieldsFormatter.prototype.priceField = function () {
        return {
            type: FieldType.Object,
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
        return cp == "left" ? t[cur] + "" + val : "" + val + t[cur];
    };
    FieldsFormatter.prototype.plural = function (n, one, many) {
        return n == 1 ? "" + n + " " + one : "" + n + " " + many;
    };
    FieldsFormatter.prototype.durationFormat = function (val) {
        var t = this._localize["Duration"];
        var fm = val;
        if (fm == 0)
            return "";
        var h = this.plural(fm / 60, t["hour"], t["hours"]);
        var m = this.plural(fm % 60, t["minute"], t["minutes"]);
        return h + " " + m;
    };
    FieldsFormatter.prototype.durationField = function () {
        var this_ = this;
        return {
            type: FieldType.Text,
            format: function (val) { return this_.durationFormat(val); },
        };
    };
    FieldsFormatter.prototype.mediasField = function () {
        return {
            type: FieldType.MediaList,
            format: function (val) {
                if (!val || val.length == 0) {
                    val = [
                        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyM3x8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNHx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNXx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        "https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNnx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        "https://images.unsplash.com/photo-1570158268183-d296b2892211?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyN3x8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        "https://images.unsplash.com/photo-1515023115689-589c33041d3c?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyOHx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyOXx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwzMHx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                    ];
                }
                return val;
            },
        };
    };
    FieldsFormatter.prototype.attachmentsField = function () {
        return {
            type: FieldType.AttachmentList,
            format: function (val) {
                if (!val || val.length == 0) {
                    val = [
                        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyM3x8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNHx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNXx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                    ];
                }
                return val;
            },
        };
    };
    // --------------------------------
    // public interface methods
    FieldsFormatter.prototype.business = function (b) {
        if (b == null)
            return [];
        var meta = {
            id: this.idField(),
            name: this.textField(),
            location: this.textField(),
        };
        var itemModeMeta = {
            firstLine: function (b) {
                return b.name;
            },
            secondLine: function (b) {
                return b.location.split(",")[0];
            },
        };
        return buildFieldArray(b, meta, this._localize["business"], [], itemModeMeta);
    };
    FieldsFormatter.prototype.clientPrice = function (p) {
        if (p == null)
            return [];
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
                    return d.discountType == DiscountType.Percent
                        ? d.discountPercent + "%"
                        : this_.priceFormat(d.discountValue, Currency.Rur);
                },
            },
        };
        return buildFieldArray(p, meta, this._localize["ClientPrice"]);
    };
    FieldsFormatter.prototype.clientPriceText = function (p) {
        return this.priceFormat(p.value, p.currency);
    };
    FieldsFormatter.prototype.service = function (s) {
        var meta = {
            id: this.idField(),
            name: this.textField(),
            price: this.priceField(),
            duration: this.durationField(),
        };
        var this_ = this;
        var itemModeMeta = {
            firstLine: function (s) { return s.name; },
            secondLine: function (s) {
                var d = this_.duration(s.duration);
                return ((d ? d + " " : "") + (s.price ? this_.clientPriceText(s.price) : ""));
            },
        };
        return buildFieldArray(s, meta, this._localize["service"], [], itemModeMeta);
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
        var itemModeMeta = {
            firstLine: function (p) {
                return p.name + " " + p.surname;
            },
            secondLine: function (p) {
                return p.medcardNumber ? "#" + p.medcardNumber : "";
            },
            thirdLine: function (p) {
                return p.phones.join(", ");
            },
        };
        return buildFieldArray(p, meta, this._localize["patientInfo"], [], itemModeMeta);
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
            originValue: v,
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
    FieldsFormatter.prototype.observation = function (o) {
        var meta = {};
        var this_ = this;
        var itemModeMeta = {
            firstLine: function (o) {
                return o.observationKey;
            },
            secondLine: function (o) {
                return (
                // this_._dateFormat(o.issuedDate) +
                " "
                // + this_.doctor(o.performerDoctor)
                );
            },
            thirdLine: function (o) {
                return paragraphs(o.interpretation);
            },
        };
        return buildFieldArray(o, meta, this._localize["Observation"], [], itemModeMeta);
    };
    FieldsFormatter.prototype.observationsField = function () {
        var this_ = this;
        return {
            type: FieldType.ObjectList,
            format: function (val) {
                var obs = val;
                return obs.map(function (o) { return this_.observation(o); });
            },
        };
    };
    FieldsFormatter.prototype.diagnosticReport = function (dr) {
        var meta = {
            id: this.idField(),
            active: this.activeField(),
            business: this.businessField(),
            patient: this.patientField(),
            status: this.statusField(),
            type: this.diagnosisTypeField(),
            category: this.diagnosisCategoryField(),
            effectivePeriod: this.periodField({ dateOnly: true }),
            issuedDate: this.dateField({ dateOnly: true }),
            result: this.observationsField(),
            services: this.servicesField(),
            resultInterpreter: this.doctorsField(),
            resultInterpretation: this.paragrathesField(),
            imagineMedia: this.mediasField(),
            attachments: this.attachmentsField(),
        };
        return buildFieldArray(dr, meta, this._localize["DiagnosticReport"]);
    };
    // --------------------------------
    // private utility methods
    FieldsFormatter.prototype.anamnesis = function (a) {
        return a;
    };
    FieldsFormatter.prototype.duration = function (n) {
        return this.durationFormat(n);
    };
    FieldsFormatter.prototype.doctor = function (d) {
        if (d == null)
            return "";
        return d.name + " " + d.surname;
    };
    FieldsFormatter.prototype.doctors = function (doctors) {
        var this_ = this;
        return doctors.map(function (d) { return this_.doctor(d); });
    };
    FieldsFormatter.prototype.yesNo = function (b) {
        return b ? this._localize["YES"] : this._localize["NO"];
    };
    FieldsFormatter.prototype.medicalExaminationResult = function (ar) {
        if (ar == null)
            return "";
        ar = ar.map(function (line) {
            var m = line.match(/([^:]*):(.*)/);
            if (m) {
                m[1] = trim(m[1]);
                return (m[1] ? m[1] + ": " : "") + trim(m[2]);
            }
            return line;
        });
        return "\n" + paragraphs(ar) + "\n\n";
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
