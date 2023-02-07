"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./l10n/index");
var Formatter_1 = require("./Formatter");
function alignStrings(obj, keys) {
    // find max strings length
    var ml = 0;
    for (var i = 0; i < keys.length; ++i)
        if (ml < obj[keys[i]].length)
            ml = obj[keys[i]].length;
    // pad_right all strings
    keys.forEach(function (key) { return (obj[key] = obj[key].padEnd(ml, " ")); });
}
function formatObject(obj, keys, notAlignedKeys, propFormats, localize, offset) {
    var ret = "";
    var localizedKeys = keys.reduce(function (ret, key) {
        ret[key] = localize[key];
        return ret;
    }, {});
    alignStrings(localizedKeys, keys.filter(function (key) { return !notAlignedKeys[key]; }));
    keys.forEach(function (key) {
        if (!obj[key] || (Array.isArray(obj[key]) && !obj[key].length))
            return;
        if (propFormats[key])
            ret +=
                offset +
                    localizedKeys[key] +
                    " " +
                    propFormats[key](obj[key], offset + "    ") +
                    "\n";
        else
            ret += offset + localizedKeys[key] + " " + obj[key] + "\n";
    });
    ret += "\n";
    return ret;
}
var SimpleTextFormatter = /** @class */ (function () {
    function SimpleTextFormatter(localize, dateFormat) {
        if (dateFormat === void 0) { dateFormat = Formatter_1.dateISOFormat; }
        this._baseOffset = "";
        this._localize = localize;
        this._dateFormat = dateFormat;
    }
    SimpleTextFormatter.prototype.appointmentResult = function (ar, offset) {
        if (offset === void 0) { offset = ""; }
        var keys = [
            "created",
            "start",
            "doctor",
            "duration",
            "anamnesis",
            "medicalExaminationResult",
            "diagnosis",
            "recommendations",
            "scheduledProcedures",
            "prescriptions",
        ];
        var propFormats = {
            created: this._dateFormat.bind(this),
            start: this._dateFormat.bind(this),
            doctor: this.doctor.bind(this),
            anamnesis: this.anamnesis.bind(this),
            medicalExaminationResult: this.medicalExaminationResult.bind(this),
            diagnosis: this.diagnosisOffset.bind(this),
            recommendations: this.procedures.bind(this),
            scheduledProcedures: this.procedures.bind(this),
            prescriptions: this.prescriptions.bind(this),
        };
        var notAlignedKeys = {
            scheduledProcedures: 1,
            prescriptions: 1,
        };
        return formatObject(ar, keys, notAlignedKeys, propFormats, this._localize["appointmentResult"], offset);
    };
    SimpleTextFormatter.prototype.medicalExaminationResult = function (ar, offset) {
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
    SimpleTextFormatter.prototype.anamnesis = function (ar, offset) {
        return "\n" + Formatter_1.paragrathes(ar) + "\n";
    };
    SimpleTextFormatter.prototype.duration = function (n) {
        return n.toString() + " " + this._localize["MINUTE_UNIT"];
    };
    SimpleTextFormatter.prototype.doctor = function (d, offset) {
        if (offset === void 0) { offset = ""; }
        return d.name + " " + d.surname;
    };
    SimpleTextFormatter.prototype.diagnosis = function (d) {
        return this.diagnosisOffset(d, this._baseOffset);
    };
    SimpleTextFormatter.prototype.diagnosisOffset = function (d, offset) {
        var _this = this;
        var itemToText = function (item) { return _this.cd10(item.cd10) + "\n" + item.diagnosisText; };
        return d.map(itemToText).join("\n\n");
    };
    SimpleTextFormatter.prototype.cd10 = function (item) {
        return item.description + (item.code ? " (cd10: " + item.code + ")" : "");
    };
    SimpleTextFormatter.prototype.procedures = function (p, offset) {
        var this_ = this;
        return ("\n" +
            p
                .map(function (item, i) {
                return offset + (i + 1).toString() + ".\n" + this_.procedure(item, offset);
            })
                .join("\n"));
    };
    SimpleTextFormatter.prototype.procedure = function (p, offset) {
        if (offset === void 0) { offset = ""; }
        var keys = [
            "created",
            "title",
            "services",
            "type",
            "required",
            "status",
            "period",
            "strictPeriod",
            "preparations",
            "requiredPreparations",
        ];
        var propFormats = {
            services: this.services.bind(this),
            type: this.procedureType.bind(this),
            required: this.yesNo.bind(this),
            status: this.procedureExecStatus.bind(this),
            period: this.period.bind(this),
            strictPeriod: this.period.bind(this),
            preparations: Formatter_1.paragrathes_nl,
            requiredPreparations: Formatter_1.paragrathes_nl,
        };
        var notAlignedKeys = {
            period: 1,
            strictPeriod: 1,
            preparations: 1,
            requiredPreparations: 1,
        };
        return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["procedure"], offset);
    };
    SimpleTextFormatter.prototype.yesNo = function (b, offset) {
        return b ? this._localize["YES"] : this._localize["NO"];
    };
    SimpleTextFormatter.prototype.prescriptions = function (p, offset) {
        var _this_1 = this;
        return "\n" + p.map(function (item) { return _this_1.prescription(item, offset); }).join("\n");
    };
    SimpleTextFormatter.prototype.prescription = function (p, offset) {
        if (offset === void 0) { offset = ""; }
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
            recorderDoctor: this.doctor.bind(this),
            validityPeriod: this.period.bind(this),
            medications: this.medications.bind(this),
            created: this._dateFormat.bind(this),
        };
        var notAlignedKeys = {
            validityPeriod: 1,
        };
        return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["Prescription"], offset);
    };
    SimpleTextFormatter.prototype.medications = function (s, offset) {
        var _this_1 = this;
        return "\n" + s.map(function (item) { return _this_1.medication(item, offset); }).join("\n");
    };
    SimpleTextFormatter.prototype.medication = function (s, offset) {
        if (offset === void 0) { offset = ""; }
        return (this._localize["MedicationForm"][s.form] +
            ". " +
            s.amount +
            " шт. Срок годности:" +
            this._dateFormat(s.expirationDate));
    };
    SimpleTextFormatter.prototype.services = function (s, offset) {
        var _this_1 = this;
        return "\n" + s.map(function (item) { return _this_1.service(item, offset); }).join("\n");
    };
    SimpleTextFormatter.prototype.service = function (s, offset) {
        return "";
    };
    SimpleTextFormatter.prototype.procedureType = function (type) {
        return this._localize["procedureType"][type];
    };
    SimpleTextFormatter.prototype.procedureExecStatus = function (status) {
        return this._localize["ProcedureExecStatus"][status];
    };
    SimpleTextFormatter.prototype.period = function (period, offset) {
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
    SimpleTextFormatter.prototype.diagnosticReport = function (dr, offset) {
        if (offset === void 0) { offset = ""; }
        var _this = this;
        return (offset +
            this.diagnosticReportTitle(dr) +
            "\n" +
            "\n" +
            offset +
            this._localize["CREATED"] +
            " " +
            this._dateFormat(dr.issuedDate) +
            "\n" +
            offset +
            this._localize["DiagnosticReport"]["doctor"] +
            " " +
            dr.resultInterpreter.map(function (d) { return _this.doctor(d); }) +
            "\n" +
            offset +
            this._localize["DiagnosticReport"]["result"] +
            "\n" +
            offset +
            this.observations(dr.result, offset + "  ") +
            (dr.effectivePeriod && dr.effectivePeriod.begin
                ? "\n" +
                    offset +
                    this._localize["DiagnosticReport"]["effectivePeriod"] +
                    this.period(dr.effectivePeriod, offset + "  ")
                : "") +
            (dr.resultInterpretation && dr.resultInterpretation.length
                ? "\n" + offset + "\n" + Formatter_1.paragrathes_nl(dr.resultInterpretation, offset)
                : "") +
            (dr.imagineMedia && dr.imagineMedia.length
                ? "\n" +
                    offset +
                    "\n" +
                    offset +
                    this._localize["DiagnosticReport"]["images"] +
                    dr.imagineMedia.map(function (img) { return +"\n" + offset + img; })
                : "") +
            (dr.attachments && dr.attachments.length
                ? "\n" +
                    offset +
                    "\n" +
                    offset +
                    this._localize["DiagnosticReport"]["attachments"] +
                    dr.attachments.map(function (a) { return +"\n" + offset + a; })
                : ""));
    };
    SimpleTextFormatter.prototype.diagnosticReportTitle = function (dr) {
        return dr.services.map(function (s) { return s.name; }).join(", ");
    };
    SimpleTextFormatter.prototype.observations = function (o, offset) {
        var _this = this;
        return o
            .filter(function (o) { return typeof o.value.value === "string"; })
            .map(function (o) { return _this.observation(o, offset) + "\n"; })
            .join("\n");
    };
    SimpleTextFormatter.prototype.observation = function (o, offset) {
        if (offset === void 0) { offset = ""; }
        var prefix;
        if (o.observationKey)
            prefix = offset + o.observationKey + ": ";
        else
            prefix = offset;
        var text = "";
        if (typeof o.value.value === "string") {
            // multiline text
            if (o.value.value.indexOf("\n") >= 0)
                text =
                    (prefix !== offset ? prefix + "\n" : "") +
                        Formatter_1.trim(o.value.value)
                            .split("\n")
                            .map(function (line) { return offset + Formatter_1.trim(line); })
                            .join("\n");
            else
                text = prefix + Formatter_1.trim(o.value.value);
        }
        return text;
    };
    SimpleTextFormatter.LOCALIZE = {
        "ru-ru": index_1.default.ruRU,
        "en-us": index_1.default.enUS,
    };
    return SimpleTextFormatter;
}());
exports.SimpleTextFormatter = SimpleTextFormatter;
