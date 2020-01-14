import { AppointmentResultModel } from "../models/AppointmentResultModel";
import { Doctor } from "../types/Doctor";
import { Diagnosis } from "../types/Diagnosis";
import { Procedure } from "../types/Procedure";
import { PrescriptionInfo } from "../types/PrescriptionInfo";
import { Service } from "../types/Service";
import { ProcedureType } from "../types/ProcedureType";
import { ProcedureExecStatus } from "../types/ProcedureExecStatus";
import { Period } from "../types/Period";
import { DiagnosticReportModel } from "../models/DiagnosticReportModel";
import { Observation } from "../types/Observation";
import {Medication} from "../types/Medication";
import l10n from "./l10n/index"

function alignStrings(obj: object, keys: string[]) {
    // find max strings length
    let ml = 0;
    for (let i = 0; i < keys.length; ++i)
        if (ml < obj[keys[i]].length)
            ml = obj[keys[i]].length;
    
    // pad_right all strings
    keys.forEach((key) => obj[key] = obj[key].padEnd(ml, " "));
}

function formatObject(obj: object, keys: string[], notAlignedKeys: object, propFormats: object, localize: object, offset: string) {
    let ret = "";
    let localizedKeys = keys.reduce((ret, key) => {
        ret[key] = localize[key];
        return ret;
    }, {});
    alignStrings(localizedKeys, keys.filter((key) => !notAlignedKeys[key]));
    keys.forEach((key) => {
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

function paragrathes(a: string[], offset: string): string {
    if (a.length == 0)
        return "";
    // this is simple string
    if (a.length == 1 && a[0].length < 100 && a[0].indexOf("\n") < 0)
        return a[0];
    return a.join("\n\n");
}

function paragrathes_nl(a: string[], offset: string): string {
    if (a.length == 0)
        return "";
    return "\n" + offset + a.join("\n\n");
}

export type DateFormatFunc = (d: Date) => string;

const dateISOFormat: DateFormatFunc = function(d: Date): string {
    return typeof d === "string" ? d : d.toISOString();
};

const trim = (str) =>
    str.replace(/^\s+/, "").replace(/\s+$/, "");

export class SimpleTextFormatter {
    public static LOCALIZE = {
        "ru-ru": l10n.ruRU,
        "en-us": l10n.enUS
    };

    private _localize: object;
    private _dateFormat: DateFormatFunc;

    public constructor(localize: object, dateFormat: DateFormatFunc = dateISOFormat) {
        this._localize = localize;
        this._dateFormat = dateFormat;
    }

    public appointmentResult(ar: AppointmentResultModel, offset: string = ""): string {
        let keys = ["created", "start", "doctor", "duration", "anamnesis", 
            "medicalExaminationResult", "diagnosis", "recommendations", "scheduledProcedures", "prescriptions"];
        let propFormats = {
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
        let notAlignedKeys = {
            "scheduledProcedures": 1,
            "prescriptions": 1
        };
        return formatObject(ar, keys, notAlignedKeys, propFormats, this._localize["appointmentResult"], offset);
    }

    public medicalExaminationResult(ar: string[], offset: string): string {
        ar = ar.map(line => {
            let m = line.match(/([^:]*):(.*)/);
            if (m) {
                m[1] = trim(m[1]);
                return (m[1] ? m[1] + ": " : "") + trim(m[2]);
            }

            return line;
        });
        return "\n" + paragrathes(ar, offset) + "\n\n";
    }

    public anamnesis(ar: string[], offset: string): string {
        return "\n" + paragrathes(ar, offset) + "\n";
    }

    public duration(n: number): string {
        return n.toString() + " " + this._localize["MINUTE_UNIT"];
    }

    public doctor(d: Doctor, offset: string = ""): string {
        return d.name + " " + d.surname;
    }

    public diagnosis(d: Diagnosis[], offset: string): string {
        const itemToString = (item: Diagnosis) =>
            item.description + (item.cd10 ? " (cd10: " + item.cd10 + ")" : "");

        if (d.length === 0)
            return "";

        if (d.length == 1 && d[0].description.length < 100 && d[0].description.indexOf("\n") < 0) {
            let hasKeyValue = typeof d[0].description === "string" && d[0].description.match(/([^:]*):(.*)/);
            return (hasKeyValue ? "\n" : "") + itemToString(d[0]);
        }

        return "\n" + d.map(itemToString).join("\n\n");
    }

    public procedures(p: Procedure[], offset: string): string {
        let this_ = this;
        return "\n" + p.map((item, i) => offset + (i + 1).toString() + ".\n" + this_.procedure(item, offset)).join("\n");
    }

    public procedure(p: Procedure, offset: string): string {
        let keys = ["created", "title", "services", "type", "required", "status", "period", "strictPeriod",
            "preparations", "requiredPreparations"];
        let propFormats = {
            services: this.services.bind(this),
            type: this.procedureType.bind(this),
            required: this.yesNo.bind(this),
            status: this.procedureExecStatus.bind(this),
            period: this.period.bind(this),
            strictPeriod: this.period.bind(this),
            preparations: paragrathes_nl,
            requiredPreparations: paragrathes_nl,
        };
        let notAlignedKeys = {
            period: 1,
            strictPeriod: 1,
            preparations: 1,
            requiredPreparations: 1
        };
        return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["procedure"], offset);
    }

    public yesNo(b: boolean, offset: string): string {
        return b ? this._localize["YES"] : this._localize["NO"];
    }

    public prescriptions(p: PrescriptionInfo[], offset: string): string {
        return "\n" + p.map(item => this.prescription(item, offset)).join("\n");
    }

    public prescription(p: PrescriptionInfo, offset: string): string {
        let keys = ["created", "title", "recorderDoctor", "medications", "dosageText", "reasonText", "validityPeriod"
            , "numberOfRepeats"];
        let propFormats = {
            recorderDoctor: this.doctor.bind(this),
            validityPeriod: this.period.bind(this),
            medications: this.medications.bind(this),
            created: this._dateFormat.bind(this)
        };
        let notAlignedKeys = {
            validityPeriod: 1
        };
        return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["Prescription"], offset);
    }

    public medications(s: Medication[], offset: string): string {
        return "\n" + s.map(item => this.medication(item, offset)).join("\n");
    }

    public medication(s: Medication, offset: string): string {
        return this._localize["MedicationForm"][s.form] + ". " + s.amount
            + " шт. Срок годности:" + this._dateFormat(s.expirationDate);
    }

    public services(s: Service[], offset: string): string {
        return "\n" + s.map(item => this.service(item, offset)).join("\n");
    }

    public service(s: Service, offset: string): string {
        return "";
    }

    public procedureType(type: ProcedureType): string {
        return this._localize["procedureType"][type];
    }

    public procedureExecStatus(status: ProcedureExecStatus): string {
        return this._localize["ProcedureExecStatus"][status];
    }
    public period(period: Period, offset: string): string {
        return "\n" + offset + this._localize["Period"]["begin"] + " " + this._dateFormat(period.begin) + "\n" +
            offset + this._localize["Period"]["end"] + " " + this._dateFormat(period.end) + "\n";
    }

    public diagnosticReport(dr: DiagnosticReportModel, offset: string = ""): string {
        let _this = this;
        return offset + this.diagnosticReportTitle(dr)
            + "\n"
            + "\n" + offset + this._localize["CREATED"] + " " + this._dateFormat(dr.issuedDate)
            + "\n" + offset + this._localize["DiagnosticReport"]["Doctor"] + " " +
                dr.resultInterpreter.map(d => _this.doctor(d))
            + "\n" + offset + this._localize["DiagnosticReport"]["Result"]
            + "\n" + offset + this.observations(dr.result, offset + "  ")

            + (dr.effectivePeriod && dr.effectivePeriod.begin ? 
              "\n" + offset + this._localize["DiagnosticReport"]["EffectivePeriod"]
            +        this.period(dr.effectivePeriod, offset + "  ") : "")

            + (dr.resultInterpretation && dr.resultInterpretation.length ?
              "\n" + offset
            + "\n" + paragrathes_nl(dr.resultInterpretation, offset) : "")

            + (dr.imagineMedia && dr.imagineMedia.length ?
              "\n" + offset
            + "\n" + offset + this._localize["DiagnosticReport"]["Images"]
            + dr.imagineMedia.map(img => + "\n" + offset + img) : "")

            + (dr.attachments && dr.attachments.length ?
              "\n" + offset
            + "\n" + offset + this._localize["DiagnosticReport"]["Attachments"]
            + dr.attachments.map(a => + "\n" + offset + a) : "")
            ;
    }
    public diagnosticReportTitle(dr: DiagnosticReportModel) {
        return dr.services.map(s => s.name).join(", ");
    }
    public observations(o: Observation[], offset: string): string {
        let _this = this;
        return o.filter(o => typeof o.value.value === "string").map(o => _this.observation(o, offset) + "\n").join("\n");
    }
    public observation(o: Observation, offset: string): string {
        let prefix;
        if (o.observationKey)
            prefix = offset + o.observationKey + ": ";
        else
            prefix = offset;

        let text = "";
        if (typeof o.value.value === "string") {
            // multiline text
            if (o.value.value.indexOf("\n") >= 0)
                text = (prefix !== offset ? prefix + "\n" : "") + trim(o.value.value).split("\n")
                    .map(line => offset + trim(line))
                    .join("\n");
            else
                text = prefix + trim(o.value.value);
        }

        return text;
    }
}