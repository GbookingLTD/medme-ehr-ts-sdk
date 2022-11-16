const moment = require("moment");

import { Cd10, Diagnosis } from "../types/Diagnosis";
import { Procedure } from "../types/Procedure";
import { PrescriptionInfo } from "../types/PrescriptionInfo";
import { ProcedureType } from "../types/ProcedureType";
import { ProcedureExecStatus } from "../types/ProcedureExecStatus";
import { Medication } from "../types/Medication";
import l10n from "./l10n/index";
import {
  DateFormatFunc,
  dateISOFormat,
  paragrathes,
  paragrathes_nl,
  trim,
  IFormatter,
} from "./Formatter";
import { IAppointmentResultMessage, IDiagnosticReportMessage, IDoctor, IObservation, IPeriod, IService } from "interfaces/index";
import { AttachmentInfo, PatientReportInfo } from "types/index";

function alignStrings(obj: object, keys: string[]) {
  // find max strings length
  let ml = 0;
  for (let i = 0; i < keys.length; ++i)
    if (ml < obj[keys[i]].length) ml = obj[keys[i]].length;

  // pad_right all strings
  keys.forEach((key) => (obj[key] = obj[key].padEnd(ml, " ")));
}

function formatObject(
  obj: object,
  keys: string[],
  notAlignedKeys: object,
  propFormats: object,
  localize: object,
  offset: string
) {
  let ret = "";
  let localizedKeys = keys.reduce((ret, key) => {
    ret[key] = localize[key];
    return ret;
  }, {});
  alignStrings(
    localizedKeys,
    keys.filter((key) => !notAlignedKeys[key])
  );
  keys.forEach((key) => {
    if (!obj[key] || (Array.isArray(obj[key]) && !obj[key].length || !obj[key].some(k=>!!k))) return;
    if (propFormats[key])
      ret +=
        offset +
        localizedKeys[key] +
        " " +
        propFormats[key](obj[key], offset + "    ") +
        "\n";
    else ret += offset + localizedKeys[key] + " " + obj[key] + "\n";
  });
  ret += "\n";
  return ret;
}

export class SimpleTextFormatterV2 implements IFormatter<string> {
  public static LOCALIZE = {
    "ru-ru": l10n.ruRU,
    "en-us": l10n.enUS,
  };

  private _localize: object;
  private _dateFormat: DateFormatFunc;
  private _baseOffset = "";

  public constructor(
    localize: object,
    dateFormat: DateFormatFunc = dateISOFormat
  ) {
    this._localize = localize;
    this._dateFormat = dateFormat;
  }

  public appointmentResult(
    ar: IAppointmentResultMessage,
    offset: string = ""
  ): string {
    let keys = [
      "duration",
      "anamnesis",
      "medicalExaminationResult",
      "diagnosis",
      "recommendations",
      "scheduledProcedures",
      "prescriptions",
      "attachments",
    ];
    let propFormats = {
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
    let notAlignedKeys = {
      scheduledProcedures: 1,
      prescriptions: 1,
    };
    return formatObject(
      ar,
      keys,
      notAlignedKeys,
      propFormats,
      this._localize["appointmentResult"],
      offset
    );
  }

  public medicalExaminationResult(ar: string[], offset: string): string {
    ar = ar.map((line) => {
      let m = line.match(/([^:]*):(.*)/);
      if (m) {
        m[1] = trim(m[1]);
        return (m[1] ? m[1] + ": " : "") + trim(m[2]);
      }

      return line;
    });
    return "\n" + paragrathes(ar) + "\n\n";
  }
  public anamnesis (ar: string[], offset: string): string {
    return ar.length && ar.some(el=>!!el)  ? "\n" + paragrathes(ar) + "\n" : "";
  }

  public duration(n: number): string {
    return n ? n.toString() + " " + this._localize["MINUTE_UNIT"] : ''
  }

  public doctor(d: IDoctor, offset: string = ""): string {
    return d.name + " " + d.surname;
  }

  public diagnosis(d: Diagnosis[]): string {
    return this.diagnosisOffset(d, this._baseOffset);
  }


  public diagnosisOffset(d: Diagnosis[], offset: string): string {
    const _this = this;
    const itemToText = (item: Diagnosis) => _this.cd10(item.cd10) + "\n" + item.diagnosisText;
    return d.map(itemToText).join("\n\n");
  }

  public cd10(item: Cd10): string {
    return item.description + (item.code ? " (cd10: " + item.code + ")" : "");
  }

  public procedures(p: Procedure[], offset: string): string {
    let this_ = this;
    return (
      "\n" +
      p
        .map(
          (item, i) =>
            offset + (i + 1).toString() + ".\n" + this_.procedure(item, offset)
        )
        .join("\n")
    );
  }

  public procedure(p: Procedure, offset: string = ""): string {
    let keys = [
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
      requiredPreparations: 1,
    };
    return formatObject(
      p,
      keys,
      notAlignedKeys,
      propFormats,
      this._localize["procedure"],
      offset
    );
  }

  public yesNo(b: boolean, offset: string): string {
    return b ? this._localize["YES"] : this._localize["NO"];
  }

  public prescriptions(p: PrescriptionInfo[], offset: string): string {
    return "\n" + p.map((item) => this.prescription(item, offset)).join("\n");
  }

  public prescription(p: PrescriptionInfo, offset: string = ""): string {
    let keys = [
      "created",
      "title",
      "recorderDoctor",
      "medications",
      "dosageText",
      "reasonText",
      "validityPeriod",
      "numberOfRepeats",
    ];
    let propFormats = {
      recorderDoctor: this.doctor.bind(this),
      validityPeriod: this.period.bind(this),
      medications: this.medications.bind(this),
      created: this._dateFormat.bind(this),
    };
    let notAlignedKeys = {
      validityPeriod: 1,
    };
    return formatObject(
      p,
      keys,
      notAlignedKeys,
      propFormats,
      this._localize["Prescription"],
      offset
    );
  }

  public reportInfos(p:PatientReportInfo[], offset: string): string {
    return "\n" + p.map((item) => this.reportInfo(item, offset)).join("\n");
  }

  public reportInfo(r:PatientReportInfo, offset: string = ""): string {
    //return "\n" + p.map((item) => this.reportInfo(item, offset)).join("\n");
    if(Array.isArray(r.value)) {
      return `\n ${offset} <b>${r.name}</b>\n${r.value.map(v=>this.reportInfoValue(v,offset))}`
    }
    return r.value ? `\n ${offset} <b>${r.name}</b>\n${r.value}` : ''
  }

  public attachmentInfos (a: AttachmentInfo[], offset: string): string {
    return "\n" + a.map((item) => this.attachmentInfo(item, offset)).join("\n");
  }

  public attachmentInfo(a:AttachmentInfo, offset: string = ""): string {
    return `\n ${offset} <a href="${a.url}" target="_blank">${a.file}</a>\n`
  }
  public reportInfoValue(r:any, offset: string):string {
    if(r.paramValue && Array.isArray(r.paramValue)){
      return `\n ${offset} <b>${r.paramName}</b>\n${r.value.map(v=>this.reportInfoValue(v,offset))}`
    }
    return r.paramName ? `\n ${offset} ${r.paramName}: ${this.reportInfoValueHandler(r.paramValue)}` : ''
  }

  public reportInfoValueHandler (value: string): string {
    if(['true','false'].includes(value)){
      return value === 'true' ? 'Да' : 'Нет'
    }
    if(typeof value === 'boolean') {
      return value ? 'Да' : 'Нет'
    }
    if (value.length > 6 && value.length < 12 && moment(value).isValid()) {
      return moment(value).format('DD.MM.YYYY HH:mm')
    }
    return value
  }

  public medications(s: Medication[], offset: string): string {
    return "\n" + s.map((item) => this.medication(item, offset)).join("\n");
  }

  public medication(s: Medication, offset: string = ""): string {
    return (
      this._localize["MedicationForm"][s.form] +
      ". " +
      s.amount +
      " шт. Срок годности:" +
      this._dateFormat(s.expirationDate)
    );
  }

  public services(s: IService[], offset: string): string {
    return "\n" + s.map((item) => this.service(item, offset)).join("\n");
  }

  public service(s: IService, offset: string): string {
    return "";
  }

  public procedureType(type: ProcedureType): string {
    return this._localize["procedureType"][type];
  }

  public procedureExecStatus(status: ProcedureExecStatus): string {
    return this._localize["ProcedureExecStatus"][status];
  }
  public period(period: IPeriod, offset: string): string {
    return (
      "\n" +
      offset +
      this._localize["Period"]["begin"] +
      " " +
      this._dateFormat(period.begin) +
      "\n" +
      offset +
      this._localize["Period"]["end"] +
      " " +
      this._dateFormat(period.end) +
      "\n"
    );
  }

  public diagnosticReport(
    dr: IDiagnosticReportMessage,
    offset: string = ""
  ): string {
    let _this = this;
    return (
      offset +
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
      (dr.imagineMedia && dr.imagineMedia.length && dr.imagineMedia.some(k=>!!k)
        ? "\n" +
          offset +
          "\n" +
          offset +
          this._localize["DiagnosticReport"]["images"] +
          dr.imagineMedia.map((img) => +"\n" + offset + img)
        : "") +
      (dr.attachments && dr.attachments.length && dr.attachments.some(k=>!!k)
        ? "\n" +
          offset +
          "\n" +
          offset +
          this._localize["DiagnosticReport"]["attachments"] +
          dr.attachments.map((a) => this.attachmentInfo(a, offset))
        : "")
    );
  }
  public diagnosticReportTitle(dr: IDiagnosticReportMessage) {
    return dr.services.map((s) => s.name).join(", ");
  }
  public observations(o: IObservation[], offset: string): string {
    let _this = this;
    return o
      .filter((o) => typeof o.value.value === "string")
      .map((o) => _this.observation(o, offset) + "\n")
      .join("\n");
  }
  public observation(o: IObservation, offset: string = ""): string {
    let prefix;
    if (o.observationKey) prefix = offset + o.observationKey + ": ";
    else prefix = offset;

    let text = "";
    if (typeof o.value.value === "string") {
      // multiline text
      if (o.value.value.indexOf("\n") >= 0)
        text =
          (prefix !== offset ? prefix + "\n" : "") +
          trim(o.value.value)
            .split("\n")
            .map((line) => offset + trim(line))
            .join("\n");
      else text = prefix + trim(o.value.value);
    }

    return text;
  }
}
