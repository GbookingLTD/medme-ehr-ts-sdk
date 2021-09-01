import l10n from "./l10n/index";
import {
  DateFormatFunc,
  dateISOFormat,
  IFormatter,
  LocaleCode,
  paragrathes,
  paragrathes_nl,
  trim,
} from "./Formatter";
import { AppointmentResultMessage } from "../messages/AppointmentResultMessage";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
import {
  Diagnosis,
  Procedure,
  PrescriptionInfo,
  Medication,
  Doctor,
  Period,
} from "../types/index";
import { Observation } from "../types/Observation";

export enum FieldType {
  Text = "text",
  List = "list",
  FieldList = "fieldList",
  Date = "date",
  DateTime = "dateTime",
}

export type FieldValue = string | Field[] | Date | string[];

export class Field {
  key: string;
  title: string;
  type: FieldType;
  value: FieldValue;
}

export class FieldTypeMeta {
  fieldKey: string;
  type: FieldType;
}

function buildFieldArray(
  obj: object,
  propsFormats: object,
  t: object
): Field[] {
  const keys = Object.keys(obj);
  var ans: Field[] = [];
  for (var k of keys) {
    ans.push({
      key: k,
      title: t[k],
      type: FieldType.Text,
      value: propsFormats[k] ? propsFormats[k](obj[k]) : obj[k],
    });
  }

  return ans;
}

export class FieldsFormatter implements IFormatter<Field[]> {
  public static LOCALIZE = {
    "ru-ru": l10n.ruRU,
    "en-us": l10n.enUS,
  };

  public static create(
    locale: LocaleCode,
    dateFormat: DateFormatFunc = dateISOFormat
  ) {
    return new FieldsFormatter(FieldsFormatter.LOCALIZE[locale], dateFormat);
  }

  private _localize: object;
  private _dateFormat: DateFormatFunc;

  public constructor(
    localize: object,
    dateFormat: DateFormatFunc = dateISOFormat
  ) {
    this._localize = localize;
    this._dateFormat = dateFormat;
  }

  // --------------------------------
  // public interface methods

  public appointmentResult(ar: AppointmentResultMessage): Field[] {
    let propFormatters = {
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

    return buildFieldArray(
      ar,
      propFormatters,
      this._localize["appointmentResult"]
    );
  }

  public diagnosis(d: Diagnosis[]): Field[] {
    const itemToString = (item: Diagnosis) =>
      item.description + (item.cd10 ? " (cd10: " + item.cd10 + ")" : "");

    if (d.length === 0) return [];

    return d.map((v) => ({
      key: "",
      title: "",
      type: FieldType.Text,
      value: "cd10 " + v.cd10 + "\n" + v.description + "\n\n",
    }));
  }

  public procedure(p: Procedure): Field[] {
    throw new Error("Method not implemented.");
  }

  public procedures(p: Procedure[]): Field[] {
    if (p == null || p.length == 0) return [];

    let this_ = this;
    return p.reduce((ret, item, i) => ret.concat(this_.procedure(item)), []);
  }

  public prescriptions(p: PrescriptionInfo[]): string {
    return "\n" + p.map((item) => this.prescription(item)).join("\n");
  }

  public prescription(p: PrescriptionInfo): Field[] {
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
      created: this._dateFormat.bind(this),
      recorderDoctor: this.doctor.bind(this),
      validityPeriod: this.period.bind(this),
      medications: this.medications.bind(this),
    };

    return buildFieldArray(p, propFormats, this._localize["appointmentResult"]);
  }

  public medications(s: Medication[]): string {
    return "\n" + s.map((item) => this.medication(item)).join("\n");
  }

  public medication(s: Medication): Field[] {
    throw new Error("Method not implemented.");
  }

  public diagnosticReport(dr: DiagnosticReportMessage): Field[] {
    throw new Error("Method not implemented.");
  }

  public observation(o: Observation): Field[] {
    throw new Error("Method not implemented.");
  }

  // --------------------------------
  // private utility methods

  public anamnesis(a: string[]): string {
    return "\n" + paragrathes(a) + "\n";
  }

  public duration(n: number): string {
    return n.toString() + " " + this._localize["MINUTE_UNIT"];
  }

  private doctor(d: Doctor): string {
    return d.name + " " + d.surname;
  }

  private yesNo(b: boolean): string {
    return b ? this._localize["YES"] : this._localize["NO"];
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

  public period(period: Period, offset: string): string {
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
}
