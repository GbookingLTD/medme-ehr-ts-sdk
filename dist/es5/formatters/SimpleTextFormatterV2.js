var moment = require("moment");
import l10n from "./l10n/index";
import { dateISOFormat, paragrathes, paragrathes_nl, trim, } from "./Formatter";
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
        if (!obj[key] || (Array.isArray(obj[key]) && !obj[key].length || !obj[key].some(function (k) { return !!k; })))
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
var SimpleTextFormatterV2 = /** @class */ (function () {
    function SimpleTextFormatterV2(localize, dateFormat) {
        if (dateFormat === void 0) { dateFormat = dateISOFormat; }
        this._baseOffset = "";
        this._localize = localize;
        this._dateFormat = dateFormat;
    }
    SimpleTextFormatterV2.prototype.appointmentResult = function (ar, offset) {
        if (offset === void 0) { offset = ""; }
        var keys = [
            "duration",
            "anamnesis",
            "medicalExaminationResult",
            "diagnosis",
            "recommendations",
            "scheduledProcedures",
            "prescriptions",
            "attachments",
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
            reportInfos: this.reportInfos.bind(this),
            attachments: this.attachmentInfos.bind(this),
        };
        var notAlignedKeys = {
            scheduledProcedures: 1,
            prescriptions: 1,
        };
        return formatObject(ar, keys, notAlignedKeys, propFormats, this._localize["appointmentResult"], offset);
    };
    SimpleTextFormatterV2.prototype.medicalExaminationResult = function (ar, offset) {
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
    SimpleTextFormatterV2.prototype.anamnesis = function (ar, offset) {
        return ar.length && ar.some(function (el) { return !!el; }) ? "\n" + paragrathes(ar) + "\n" : "";
    };
    SimpleTextFormatterV2.prototype.duration = function (n) {
        return n ? n.toString() + " " + this._localize["MINUTE_UNIT"] : '';
    };
    SimpleTextFormatterV2.prototype.doctor = function (d, offset) {
        if (offset === void 0) { offset = ""; }
        return d.name + " " + d.surname;
    };
    SimpleTextFormatterV2.prototype.diagnosis = function (d) {
        return this.diagnosisOffset(d, this._baseOffset);
    };
    SimpleTextFormatterV2.prototype.diagnosisOffset = function (d, offset) {
        var _this = this;
        var itemToText = function (item) { return _this.cd10(item.cd10) + "\n" + item.diagnosisText; };
        return d.map(itemToText).join("\n\n");
    };
    SimpleTextFormatterV2.prototype.cd10 = function (item) {
        return item.description + (item.code ? " (cd10: " + item.code + ")" : "");
    };
    SimpleTextFormatterV2.prototype.procedures = function (p, offset) {
        var this_ = this;
        return ("\n" +
            p
                .map(function (item, i) {
                return offset + (i + 1).toString() + ".\n" + this_.procedure(item, offset);
            })
                .join("\n"));
    };
    SimpleTextFormatterV2.prototype.procedure = function (p, offset) {
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
            preparations: paragrathes_nl,
            requiredPreparations: paragrathes_nl,
        };
        var notAlignedKeys = {
            period: 1,
            strictPeriod: 1,
            preparations: 1,
            requiredPreparations: 1,
        };
        return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["procedure"], offset);
    };
    SimpleTextFormatterV2.prototype.yesNo = function (b, offset) {
        return b ? this._localize["YES"] : this._localize["NO"];
    };
    SimpleTextFormatterV2.prototype.prescriptions = function (p, offset) {
        var _this_1 = this;
        return "\n" + p.map(function (item) { return _this_1.prescription(item, offset); }).join("\n");
    };
    SimpleTextFormatterV2.prototype.prescription = function (p, offset) {
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
    SimpleTextFormatterV2.prototype.reportInfos = function (p, offset) {
        var _this_1 = this;
        return "\n" + p.map(function (item) { return _this_1.reportInfo(item, offset); }).join("\n");
    };
    SimpleTextFormatterV2.prototype.reportInfo = function (r, offset) {
        var _this_1 = this;
        if (offset === void 0) { offset = ""; }
        //return "\n" + p.map((item) => this.reportInfo(item, offset)).join("\n");
        if (Array.isArray(r.value)) {
            return "\n " + offset + " <b>" + r.name + "</b>\n" + r.value.map(function (v) { return _this_1.reportInfoValue(v, offset); });
        }
    };
    SimpleTextFormatterV2.prototype.attachmentInfos = function (a, offset) {
        var _this_1 = this;
        return "\n" + a.map(function (item) { return _this_1.attachmentInfo(item, offset); }).join("\n");
    };
    SimpleTextFormatterV2.prototype.attachmentInfo = function (a, offset) {
        if (offset === void 0) { offset = ""; }
        return "\n " + offset + " <a href=\"" + a.url + "\" target=\"_blank\">" + a.file + "</a>\n";
    };
    SimpleTextFormatterV2.prototype.reportInfoValue = function (r, offset) {
        var _this_1 = this;
        if (r.paramValue && Array.isArray(r.paramValue)) {
            return "\n " + offset + " <b>" + r.paramName + "</b>\n" + r.value.map(function (v) { return _this_1.reportInfoValue(v, offset); });
        }
        return r.paramName ? "\n " + offset + " " + r.paramName + ": " + this.reportInfoValueHandler(r.paramValue) : '';
    };
    SimpleTextFormatterV2.prototype.reportInfoValueHandler = function (value) {
        if (['true', 'false'].includes(value)) {
            return value === 'true' ? 'Да' : 'Нет';
        }
        if (typeof value === 'boolean') {
            return value ? 'Да' : 'Нет';
        }
        if (value.length > 6 && value.length < 12 && moment(value).isValid()) {
            return moment(value).format('DD.MM.YYYY HH:mm');
        }
        return value;
    };
    SimpleTextFormatterV2.prototype.medications = function (s, offset) {
        var _this_1 = this;
        return "\n" + s.map(function (item) { return _this_1.medication(item, offset); }).join("\n");
    };
    SimpleTextFormatterV2.prototype.medication = function (s, offset) {
        if (offset === void 0) { offset = ""; }
        return (this._localize["MedicationForm"][s.form] +
            ". " +
            s.amount +
            " шт. Срок годности:" +
            this._dateFormat(s.expirationDate));
    };
    SimpleTextFormatterV2.prototype.services = function (s, offset) {
        var _this_1 = this;
        return "\n" + s.map(function (item) { return _this_1.service(item, offset); }).join("\n");
    };
    SimpleTextFormatterV2.prototype.service = function (s, offset) {
        return "";
    };
    SimpleTextFormatterV2.prototype.procedureType = function (type) {
        return this._localize["procedureType"][type];
    };
    SimpleTextFormatterV2.prototype.procedureExecStatus = function (status) {
        return this._localize["ProcedureExecStatus"][status];
    };
    SimpleTextFormatterV2.prototype.period = function (period, offset) {
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
    SimpleTextFormatterV2.prototype.diagnosticReport = function (dr, offset) {
        var _this_1 = this;
        if (offset === void 0) { offset = ""; }
        var _this = this;
        return (offset +
            this.diagnosticReportTitle(dr) +
            "\n" +
            offset +
            "\n" +
            offset +
            this._localize["DiagnosticReport"]["result"] +
            "\n" +
            offset +
            this.observations(dr.result, offset + "  ") +
            (dr.effectivePeriod && dr.effectivePeriod.begin && moment(dr.effectivePeriod.begin).isAfter(moment("1900-00-00 00:00:00"))
                ? "\n" +
                    offset +
                    this._localize["DiagnosticReport"]["effectivePeriod"] +
                    this.period(dr.effectivePeriod, offset + "  ")
                : "") +
            (dr.resultInterpretation && dr.resultInterpretation.length
                ? "\n" + offset + "\n" + paragrathes_nl(dr.resultInterpretation, offset)
                : "") +
            (dr.imagineMedia && dr.imagineMedia.length && dr.imagineMedia.some(function (k) { return !!k; })
                ? "\n" +
                    offset +
                    "\n" +
                    offset +
                    this._localize["DiagnosticReport"]["images"] +
                    dr.imagineMedia.map(function (img) { return +"\n" + offset + img; })
                : "") +
            (dr.attachments && dr.attachments.length && dr.attachments.some(function (k) { return !!k; })
                ? "\n" +
                    offset +
                    "\n" +
                    offset +
                    this._localize["DiagnosticReport"]["attachments"] +
                    dr.attachments.map(function (a) { return _this_1.attachmentInfo(a, offset); })
                : ""));
    };
    SimpleTextFormatterV2.prototype.diagnosticReportTitle = function (dr) {
        return dr.services.map(function (s) { return s.name; }).join(", ");
    };
    SimpleTextFormatterV2.prototype.observations = function (o, offset) {
        var _this = this;
        return o
            .filter(function (o) { return typeof o.value.value === "string"; })
            .map(function (o) { return _this.observation(o, offset) + "\n"; })
            .join("\n");
    };
    SimpleTextFormatterV2.prototype.observation = function (o, offset) {
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
                        trim(o.value.value)
                            .split("\n")
                            .map(function (line) { return offset + trim(line); })
                            .join("\n");
            else
                text = prefix + trim(o.value.value);
        }
        return text;
    };
    SimpleTextFormatterV2.LOCALIZE = {
        "ru-ru": l10n.ruRU,
        "en-us": l10n.enUS,
    };
    return SimpleTextFormatterV2;
}());
export { SimpleTextFormatterV2 };
//# sourceMappingURL=SimpleTextFormatterV2.js.map