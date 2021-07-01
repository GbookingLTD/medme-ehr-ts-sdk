"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleTextFormatter = void 0;
var index_1 = require("./l10n/index");
function alignStrings(obj, keys) {
    // find max strings length
    var ml = 0;
    for (var i = 0; i < keys.length; ++i)
        if (ml < obj[keys[i]].length)
            ml = obj[keys[i]].length;
    // pad_right all strings
    keys.forEach(function (key) { return obj[key] = obj[key].padEnd(ml, " "); });
}
function formatObject(obj, keys, notAlignedKeys, propFormats, localize, offset) {
    var ret = "";
    var localizedKeys = keys.reduce(function (ret, key) {
        ret[key] = localize[key];
        return ret;
    }, {});
    alignStrings(localizedKeys, keys.filter(function (key) { return !notAlignedKeys[key]; }));
    keys.forEach(function (key) {
        if (!obj[key] || Array.isArray(obj[key]) && !obj[key].length)
            return;
        if (propFormats[key])
            ret += offset + localizedKeys[key] + " " + propFormats[key](obj[key], offset + "    ") + "\n";
        else
            ret += offset + localizedKeys[key] + " " + obj[key] + "\n";
    });
    ret += "\n";
    return ret;
}
function paragrathes(a, offset) {
    if (a.length == 0)
        return "";
    // this is simple string
    if (a.length == 1 && a[0].length < 100 && a[0].indexOf("\n") < 0)
        return a[0];
    return a.join("\n\n");
}
function paragrathes_nl(a, offset) {
    if (a.length == 0)
        return "";
    return "\n" + offset + a.join("\n\n");
}
var dateISOFormat = function (d) {
    return typeof d === "string" ? d : d.toISOString();
};
var trim = function (str) {
    return str.replace(/^\s+/, "").replace(/\s+$/, "");
};
var SimpleTextFormatter = /** @class */ (function () {
    function SimpleTextFormatter(localize, dateFormat) {
        if (dateFormat === void 0) { dateFormat = dateISOFormat; }
        this._localize = localize;
        this._dateFormat = dateFormat;
    }
    SimpleTextFormatter.prototype.appointmentResult = function (ar, offset) {
        if (offset === void 0) { offset = ""; }
        var keys = ["created", "start", "doctor", "duration", "anamnesis",
            "medicalExaminationResult", "diagnosis", "recommendations", "scheduledProcedures", "prescriptions"];
        var propFormats = {
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
        var notAlignedKeys = {
            "scheduledProcedures": 1,
            "prescriptions": 1
        };
        return formatObject(ar, keys, notAlignedKeys, propFormats, this._localize["appointmentResult"], offset);
    };
    SimpleTextFormatter.prototype.medicalExaminationResult = function (ar, offset) {
        ar = ar.map(function (line) {
            var m = line.match(/([^:]*):(.*)/);
            if (m) {
                m[1] = trim(m[1]);
                return (m[1] ? m[1] + ": " : "") + trim(m[2]);
            }
            return line;
        });
        return "\n" + paragrathes(ar, offset) + "\n\n";
    };
    SimpleTextFormatter.prototype.anamnesis = function (ar, offset) {
        return "\n" + paragrathes(ar, offset) + "\n";
    };
    SimpleTextFormatter.prototype.duration = function (n) {
        return n.toString() + " " + this._localize["MINUTE_UNIT"];
    };
    SimpleTextFormatter.prototype.doctor = function (d, offset) {
        if (offset === void 0) { offset = ""; }
        return d.name + " " + d.surname;
    };
    SimpleTextFormatter.prototype.diagnosis = function (d, offset) {
        var itemToString = function (item) {
            return item.description + (item.cd10 ? " (cd10: " + item.cd10 + ")" : "");
        };
        if (d.length === 0)
            return "";
        if (d.length == 1 && d[0].description.length < 100 && d[0].description.indexOf("\n") < 0) {
            var hasKeyValue = typeof d[0].description === "string" && d[0].description.match(/([^:]*):(.*)/);
            return (hasKeyValue ? "\n" : "") + itemToString(d[0]);
        }
        return "\n" + d.map(itemToString).join("\n\n");
    };
    SimpleTextFormatter.prototype.procedures = function (p, offset) {
        var this_ = this;
        return "\n" + p.map(function (item, i) { return offset + (i + 1).toString() + ".\n" + this_.procedure(item, offset); }).join("\n");
    };
    SimpleTextFormatter.prototype.procedure = function (p, offset) {
        var keys = ["created", "title", "services", "type", "required", "status", "period", "strictPeriod",
            "preparations", "requiredPreparations"];
        var propFormats = {
            services: this.services.bind(this),
            type: this.procedureType.bind(this),
            required: this.yesNo.bind(this),
            status: this.procedureExecStatus.bind(this),
            period: this.period.bind(this),
            strictPeriod: this.period.bind(this),
            preparations: paragrathes_nl,
            requiredPreparations: paragrathes_nl,
        };
        var notAlignedKeys = {
            period: 1,
            strictPeriod: 1,
            preparations: 1,
            requiredPreparations: 1
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
        var keys = ["created", "title", "recorderDoctor", "medications", "dosageText", "reasonText", "validityPeriod",
            "numberOfRepeats"];
        var propFormats = {
            recorderDoctor: this.doctor.bind(this),
            validityPeriod: this.period.bind(this),
            medications: this.medications.bind(this),
            created: this._dateFormat.bind(this)
        };
        var notAlignedKeys = {
            validityPeriod: 1
        };
        return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["Prescription"], offset);
    };
    SimpleTextFormatter.prototype.medications = function (s, offset) {
        var _this_1 = this;
        return "\n" + s.map(function (item) { return _this_1.medication(item, offset); }).join("\n");
    };
    SimpleTextFormatter.prototype.medication = function (s, offset) {
        return this._localize["MedicationForm"][s.form] + ". " + s.amount
            + " шт. Срок годности:" + this._dateFormat(s.expirationDate);
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
        return "\n" + offset + this._localize["Period"]["begin"] + " " + this._dateFormat(period.begin) + "\n" +
            offset + this._localize["Period"]["end"] + " " + this._dateFormat(period.end) + "\n";
    };
    SimpleTextFormatter.prototype.diagnosticReport = function (dr, offset) {
        if (offset === void 0) { offset = ""; }
        var _this = this;
        return offset + this.diagnosticReportTitle(dr)
            + "\n"
            + "\n" + offset + this._localize["CREATED"] + " " + this._dateFormat(dr.issuedDate)
            + "\n" + offset + this._localize["DiagnosticReport"]["Doctor"] + " " +
            dr.resultInterpreter.map(function (d) { return _this.doctor(d); })
            + "\n" + offset + this._localize["DiagnosticReport"]["Result"]
            + "\n" + offset + this.observations(dr.result, offset + "  ")
            + (dr.effectivePeriod && dr.effectivePeriod.begin ?
                "\n" + offset + this._localize["DiagnosticReport"]["EffectivePeriod"]
                    + this.period(dr.effectivePeriod, offset + "  ") : "")
            + (dr.resultInterpretation && dr.resultInterpretation.length ?
                "\n" + offset
                    + "\n" + paragrathes_nl(dr.resultInterpretation, offset) : "")
            + (dr.imagineMedia && dr.imagineMedia.length ?
                "\n" + offset
                    + "\n" + offset + this._localize["DiagnosticReport"]["Images"]
                    + dr.imagineMedia.map(function (img) { return +"\n" + offset + img; }) : "")
            + (dr.attachments && dr.attachments.length ?
                "\n" + offset
                    + "\n" + offset + this._localize["DiagnosticReport"]["Attachments"]
                    + dr.attachments.map(function (a) { return +"\n" + offset + a; }) : "");
    };
    SimpleTextFormatter.prototype.diagnosticReportTitle = function (dr) {
        return dr.services.map(function (s) { return s.name; }).join(", ");
    };
    SimpleTextFormatter.prototype.observations = function (o, offset) {
        var _this = this;
        return o.filter(function (o) { return typeof o.value.value === "string"; }).map(function (o) { return _this.observation(o, offset) + "\n"; }).join("\n");
    };
    SimpleTextFormatter.prototype.observation = function (o, offset) {
        var prefix;
        if (o.observationKey)
            prefix = offset + o.observationKey + ": ";
        else
            prefix = offset;
        var text = "";
        if (typeof o.value.value === "string") {
            // multiline text
            if (o.value.value.indexOf("\n") >= 0)
                text = (prefix !== offset ? prefix + "\n" : "") + trim(o.value.value).split("\n")
                    .map(function (line) { return offset + trim(line); })
                    .join("\n");
            else
                text = prefix + trim(o.value.value);
        }
        return text;
    };
    SimpleTextFormatter.LOCALIZE = {
        "ru-ru": index_1.default.ruRU,
        "en-us": index_1.default.enUS
    };
    return SimpleTextFormatter;
}());
exports.SimpleTextFormatter = SimpleTextFormatter;
