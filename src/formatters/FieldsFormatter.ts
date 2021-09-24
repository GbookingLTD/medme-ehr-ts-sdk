import l10n from "./l10n/index";
import {
  DateFormatFunc,
  dateISOFormat,
  IFormatter,
  paragrathes as paragraphs,
  paragrathes_nl,
  trim,
} from "./Formatter";
import { LocaleCode } from "./LocaleCode";
import { AppointmentResultMessage } from "../messages/AppointmentResultMessage";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
import {
  Diagnosis,
  Procedure,
  PrescriptionInfo,
  Medication,
  Doctor,
  Period,
  Service,
  ClientPrice,
  Currency,
  BusinessInfo,
} from "../types/index";
import { Observation } from "../types/Observation";
import { PatientInfo } from "../types/PatientInfo";
import { ObservationType } from "../types/ObservationType";
import { Discount } from "../types/Discount";
import { DiscountType } from "../types/DiscountType";
import { PatientMessage } from "../messages/PatientMessage";
import { TextPeriod } from "../types/Period";
import { AppointmentMessage } from "../messages/AppointmentMessage";
import { isNullUndefZero } from "../services/filters/AppointmentFilters";

export enum FieldType {
  Text = "text",
  Number = "number",
  List = "list",
  Object = "object", // converted to fields object
  Date = "date",
  DateTime = "dateTime",
  DatePeriod = "datePeriod",
  Email = "email",
  Price = "price",
  Status = "status",
  Paragraphs = "paragraphs",
  ObjectList = "objectList", // list of objects
  MediaList = "mediaList",
  AttachmentList = "attachmentList",
  Hidden = "hidden",
}

export enum FieldStatusColor {
  Red = "red",
  Yellow = "yellow",
  Blue = "blue",
  Green = "green",
}

export type FieldValueStatus = {
  color: FieldStatusColor;
  text: string;
};

export type FieldValue =
  | string
  | string[]
  | Field[]
  | Date
  | object
  | number
  | FieldValueStatus;

export enum FieldItemMode {
  FirstLine = "firstLine",
  SecondLine = "secondLine",
  ThirdLine = "thirdLine",
  Hidden = "hidden",
  Picture = "picture",
}

export class Field {
  key: string;
  title: string;
  itemMode?: FieldItemMode;
  type: FieldType;
  hint: string;
  originValue: any;
  value: FieldValue;
}

/**
 * Meta data about field representation.
 */
export class FieldMeta {
  type: FieldType;
  composite?: boolean;
  format: (val: FieldValue) => FieldValue;
}

export type FieldMetaMap = { [key: string]: FieldMeta };

export class FieldItemModeMeta {
  firstLine: (item: any) => string;
  secondLine: (item: any) => string;
  thirdLine: (item: any) => string;
}

export function buildFieldArray(
  data: object,
  meta: FieldMetaMap,
  t: object,
  priorKeys: string[] = [],
  itemModeMeta: FieldItemModeMeta = null
): Field[] {
  const keys = priorKeys
    .concat(Object.keys(meta))
    .filter((k, i, self) => self.indexOf(k) === i); // uniq keys

  if (t == null) {
    t = {};
    for (const k of keys) t[k] = k;
  }

  const ans: Field[] = [];
  for (const key of keys) {
    if (meta[key].composite)
      ans.push({
        key: key,
        title: t[key],
        type: meta[key]?.type,
        hint: t[key + "Hint"],
        originValue: data[key],
        value: meta[key].format(data),
      });
    else
      ans.push({
        key: key,
        title: t[key],
        type: meta[key]?.type,
        hint: t[key + "Hint"],
        originValue: data[key],
        value: meta[key]?.format ? meta[key].format(data[key]) : data[key],
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

export class FieldsFormatter implements IFormatter<Field[]> {
  public static create(
    locale: LocaleCode,
    dateFormat: DateFormatFunc = dateISOFormat
  ) {
    return new FieldsFormatter(l10n.getByLocaleCode(locale), dateFormat);
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

  // ----------------------------------
  // Common field definitions

  public dateField(opts?: { dateOnly: boolean }): FieldMeta {
    const this_ = this;

    const format = (intl: Intl.DateTimeFormat, val: FieldValue): string => {
      if (typeof val == "string") val = new Date(Date.parse(val as string));
      const d = val as Date;
      if (d.getFullYear() === 0 || d.getFullYear() === 1)
        return "не определено";
      return intl.format(d);
    };

    return {
      type: opts?.dateOnly ? FieldType.Date : FieldType.DateTime,
      format: opts?.dateOnly
        ? (val: FieldValue) => format(new Intl.DateTimeFormat("ru"), val)
        : (val: FieldValue) =>
            format(
              new Intl.DateTimeFormat("ru", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }),
              val
            ),
    };
  }

  private textField(): FieldMeta {
    return {
      type: FieldType.Text,
      format: (val: FieldValue) => val,
    };
  }

  private numberField(): FieldMeta {
    return {
      type: FieldType.Number,
      format: (val: FieldValue) => val,
    };
  }

  // ----------------------------------
  // Specific field definitions

  private businessField(): FieldMeta {
    return {
      type: FieldType.Object,
      format: this.business.bind(this),
    };
  }

  private doctorField(): FieldMeta {
    return { type: FieldType.Text, format: this.doctor.bind(this) };
  }

  private doctorsField(): FieldMeta {
    return { type: FieldType.List, format: this.doctors.bind(this) };
  }

  private anamnesisField(): FieldMeta {
    return {
      type: FieldType.List,
      format: this.anamnesis.bind(this),
    } as FieldMeta;
  }

  private medicalExaminationResultField(): FieldMeta {
    return {
      type: FieldType.Paragraphs,
      format: this.medicalExaminationResult.bind(this),
    };
  }

  private diagnosisField(): FieldMeta {
    return {
      type: FieldType.Object,
      format: this.diagnosis.bind(this),
    };
  }

  private FormattedFieldList(
    format: (val: FieldValue) => FieldValue
  ): FieldMeta {
    return {
      type: FieldType.Object,
      format: format,
    };
  }

  private idField(): FieldMeta {
    return {
      type: FieldType.Text,
      format: (val) => val,
    };
  }

  private activeField(): FieldMeta {
    return {
      type: FieldType.Text,
      format: (val) =>
        val
          ? this._localize["ActiveStatus"]["active"]
          : this._localize["ActiveStatus"]["disactive"],
    };
  }

  private statusField(): FieldMeta {
    return {
      type: FieldType.Status,
      format: (val: FieldValue): FieldValue =>
        ({
          color: "green",
          text: "Active",
        } as FieldValueStatus),
    };
  }

  private patientField(): FieldMeta {
    return {
      type: FieldType.Object,
      format: this.patientInfo.bind(this),
    };
  }

  private phonesField(): FieldMeta {
    return {
      type: FieldType.List,
      format: (val: FieldValue) => val,
    };
  }

  private emailField(): FieldMeta {
    return {
      type: FieldType.Email,
      format: (val: FieldValue) => val,
    };
  }

  private genderField(): FieldMeta {
    const t = this._localize["Gender"];
    return {
      type: FieldType.Text,
      format: (val: FieldValue) => t[val],
    };
  }

  private paragrathesField(): FieldMeta {
    return {
      type: FieldType.Paragraphs,
      format: (val: FieldValue) => val,
    };
  }

  private diagnosisTypeField(): FieldMeta {
    return {
      type: FieldType.Text,
      format: (val: FieldValue) =>
        val == ObservationType.LaboratoryTest
          ? this._localize["DiagnosisType"]["laboratoryTest"]
          : val == ObservationType.Observation
          ? this._localize["DiagnosisType"]["observation"]
          : this._localize["DiagnosisType"]["unknown"] + " (#" + val + ")",
    };
  }

  private diagnosisCategoryField(): FieldMeta {
    return {
      type: FieldType.Text,
      format: (val: FieldValue) => val,
    };
  }

  private periodField(opts?: { dateOnly: boolean }): FieldMeta {
    return {
      type: FieldType.DatePeriod,
      format: (val: FieldValue): FieldValue => {
        const period = val as Period;
        const textPeriod = val as TextPeriod;
        return {
          from: this.dateField(opts).format(period.begin),
          fromIsZero:
            period.begin === null || typeof period.begin == "string"
              ? textPeriod.begin.substr(0, 1) == "0"
              : period.begin?.getTime() === 0,
          to: this.dateField(opts).format(period.end),
          toIsZero:
            period.end === null || typeof period.end == "string"
              ? textPeriod.end.substr(0, 1) == "0"
              : period.end?.getTime() === 0,
        };
      },
    };
  }

  private appointmentResultsField(): FieldMeta {
    return {
      type: FieldType.ObjectList,
      format: (val: FieldValue) =>
        (val as object[]).map(this.appointmentResult.bind(this)),
    };
  }

  private appointmentResultField(): FieldMeta {
    const this_ = this.textField;
    return {
      type: FieldType.Object,
      format: this.appointmentResult.bind(this_),
    };
  }

  private servicesField(): FieldMeta {
    const this_ = this;
    return {
      type: FieldType.List,
      format: (val: FieldValue): FieldValue =>
        (val as object[]).map((item) => (item as Service).name),
    };
  }

  private priceField(): FieldMeta {
    return {
      type: FieldType.Object,
      format: this.clientPrice.bind(this),
    };
  }

  private currencyField(): FieldMeta {
    const t = this._localize["Currency"];
    return {
      type: FieldType.Text,
      format: (val: FieldValue) => t[val as Currency],
    };
  }

  private priceFormat(val: number, cur: Currency): string {
    const cp = this._localize["currencyPosition"];
    const t = this._localize["Currency"];
    return cp == "left" ? t[cur] + "" + val : "" + val + t[cur];
  }

  private plural(n: number, one: string, many: string): string {
    return n == 1 ? "" + n + " " + one : "" + n + " " + many;
  }

  private durationFormat(val: number): string {
    const t = this._localize["Duration"];
    const fm = val as number;
    if (fm == 0) return "";
    const h = this.plural(fm / 60, t["hour"], t["hours"]);
    const m = this.plural(fm % 60, t["minute"], t["minutes"]);
    return h + " " + m;
  }

  private durationField(): FieldMeta {
    const this_ = this;
    return {
      type: FieldType.Text,
      format: (val: FieldValue) => this_.durationFormat(val as number),
    };
  }

  private mediasField(): FieldMeta {
    return {
      type: FieldType.MediaList,
      format: (val: FieldValue): FieldValue => {
        if (!val || (val as string[]).length == 0) {
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
  }

  private attachmentsField(): FieldMeta {
    return {
      type: FieldType.AttachmentList,
      format: (val: FieldValue) => {
        if (!val || (val as string[]).length == 0) {
          val = [
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyM3x8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNHx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNXx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
          ];
        }
        return val;
      },
    };
  }

  // --------------------------------
  // public interface methods

  public business(b: BusinessInfo): Field[] {
    if (b == null) return [];
    const meta = {
      id: this.idField(),
      name: this.textField(),
      location: this.textField(),
    } as FieldMetaMap;

    const itemModeMeta = {
      firstLine: (b: BusinessInfo): string => {
        return b.name;
      },
      secondLine: (b: BusinessInfo): string => {
        return b.location.split(",")[0];
      },
    } as FieldItemModeMeta;

    return buildFieldArray(
      b,
      meta,
      this._localize["business"],
      [],
      itemModeMeta
    );
  }

  public clientPrice(p: ClientPrice): Field[] {
    if (p == null) return [];
    const t = this._localize["Currency"];
    const this_ = this;
    const meta = {
      currency: this.currencyField(),
      originValue: this.numberField(),
      discountValue: this.numberField(),
      value: this.numberField(),
      discount: {
        type: FieldType.Text,
        format: (val: FieldValue) => {
          const d = val as Discount;
          return d.discountType == DiscountType.Percent
            ? d.discountPercent + "%"
            : this_.priceFormat(d.discountValue, Currency.Rur);
        },
      },
    };

    return buildFieldArray(p, meta, this._localize["ClientPrice"]);
  }

  private clientPriceText(p: ClientPrice): string {
    return this.priceFormat(p.value, p.currency);
  }

  public service(s: Service): Field[] {
    const meta = {
      id: this.idField(),
      name: this.textField(),
      price: this.priceField(),
      duration: this.durationField(),
    } as FieldMetaMap;

    const this_ = this;

    const itemModeMeta = {
      firstLine: (s: Service): string => s.name,
      secondLine: (s: Service): string => {
        const d = this_.duration(s.duration);
        return (
          (d ? d + " " : "") + (s.price ? this_.clientPriceText(s.price) : "")
        );
      },
    } as FieldItemModeMeta;

    return buildFieldArray(
      s,
      meta,
      this._localize["service"],
      [],
      itemModeMeta
    );
  }

  private fullPatientNameField(): FieldMeta {
    const this_ = this;
    return {
      type: FieldType.Text,
      composite: true,
      format: (val: PatientMessage): FieldValue => {
        return (
          val.name +
          (val.middleName ? " " + val.middleName : "") +
          " " +
          val.surname
        );
      },
    };
  }

  public patientMessage(p: PatientMessage): Field[] {
    const meta = {
      id: this.idField(),
      fullName: this.fullPatientNameField(),
      phones: this.phonesField(),
      email: this.emailField(),
      gender: this.genderField(),
      birthdate: this.dateField({ dateOnly: true }),
      address: this.textField(),
      medcardNumber: this.textField(),
    } as FieldMetaMap;

    const itemModeMeta = {
      firstLine: (p: PatientInfo): string => {
        return p.name + " " + p.surname;
      },
      secondLine: (p: PatientInfo): string => {
        return p.medcardNumber ? "#" + p.medcardNumber : "";
      },
      thirdLine: (p: PatientInfo): string => {
        return "";
        return p.phones.join(", ");
      },
    };

    return buildFieldArray(
      p,
      meta,
      this._localize["patient"],
      [],
      itemModeMeta
    );
  }

  public patientInfo(p: PatientMessage): Field[] {
    const meta = {
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
    } as FieldMetaMap;

    const itemModeMeta = {
      firstLine: (p: PatientInfo): string => {
        return p.name + " " + p.surname;
      },
      secondLine: (p: PatientInfo): string => {
        return p.medcardNumber ? "#" + p.medcardNumber : "";
      },
      thirdLine: (p: PatientInfo): string => {
        return "";
        return p.phones.join(", ");
      },
    };

    return buildFieldArray(
      p,
      meta,
      this._localize["patient"],
      [],
      itemModeMeta
    );
  }

  public appointment(a: AppointmentMessage): Field[] {
    let meta = {
      business: this.businessField(),
      created: this.dateField(),
      start: this.dateField(),
      doctor: this.doctorField(),
    } as FieldMetaMap;

    return buildFieldArray(a, meta, this._localize["appointment"]);
  }

  public appointmentResult(ar: AppointmentResultMessage): Field[] {
    let meta = {
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
    } as FieldMetaMap;

    return buildFieldArray(ar, meta, this._localize["appointmentResult"]);
  }

  public diagnosis(d: Diagnosis[]): Field[] {
    if (d == null || d.length === 0) return [];
    const t = this._localize;
    return d.map((v) => ({
      key: "",
      title: "",
      hint: "",
      type: FieldType.Text,
      originValue: v,
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
    if (p == null) return "";
    return "\n" + p.map((item) => this.prescription(item)).join("\n");
  }

  private medicationsField(): FieldMeta {
    const this_ = this;
    return {
      type: FieldType.ObjectList,
      format: (val: FieldValue): FieldValue => {
        const meds = val as Medication[];
        return meds.map((m) => this_.medication(m));
      },
    };
  }

  public prescription(p: PrescriptionInfo): Field[] {
    let meta = {
      created: this.dateField(),
      recorderDoctor: this.doctorField(),
      validityPeriod: this.periodField(),
      dosageText: {
        type: FieldType.Paragraphs,
        format: (val: FieldValue): FieldValue => {
          if (!val) return [];
          const str = val as string;
          return str.split("\r\n");
        },
      },
      medications: this.medicationsField(),
      reasonText: this.textField(),
      numberOfRepeats: this.numberField(),
    } as FieldMetaMap;

    return buildFieldArray(p, meta, this._localize["Prescription"]);
  }

  public medication(m: Medication): Field[] {
    const this_ = this;
    const meta = {} as FieldMetaMap;

    const itemModeMeta = {
      firstLine: (m: Medication): string => {
        return m.name + " " + m.itemSize;
      },
      secondLine: (m: Medication): string => {
        return m.code + " " + m.codeTable;
      },
    } as FieldItemModeMeta;

    return buildFieldArray(
      m,
      meta,
      this._localize["Medication"],
      [],
      itemModeMeta
    );
  }

  public observation(o: Observation): Field[] {
    const meta = {} as FieldMetaMap;

    const this_ = this;

    const itemModeMeta = {
      firstLine: (o: Observation): string => {
        return o.observationKey;
      },
      secondLine: (o: Observation): string => {
        return (
          // this_._dateFormat(o.issuedDate) +
          " "
          // + this_.doctor(o.performerDoctor)
        );
      },
      thirdLine: (o: Observation): string => {
        return paragraphs(o.interpretation);
      },
    } as FieldItemModeMeta;

    return buildFieldArray(
      o,
      meta,
      this._localize["Observation"],
      [],
      itemModeMeta
    );
  }

  private observationsField(): FieldMeta {
    const this_ = this;
    return {
      type: FieldType.ObjectList,
      format: (val: FieldValue): FieldValue => {
        const obs = val as Observation[];
        return obs.map((o) => this_.observation(o));
      },
    };
  }

  public diagnosticReport(dr: DiagnosticReportMessage): Field[] {
    const meta = {
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
    } as FieldMetaMap;

    return buildFieldArray(dr, meta, this._localize["DiagnosticReport"]);
  }

  // --------------------------------
  // private utility methods

  public anamnesis(a: string[]): string[] {
    return a;
  }

  public duration(n: number): string {
    return this.durationFormat(n);
  }

  private doctor(d: Doctor): string {
    if (d == null) return "";
    return d.name + " " + d.surname;
  }

  private doctors(doctors: Doctor[]): string[] {
    const this_ = this;
    return doctors.map((d) => this_.doctor(d));
  }

  private yesNo(b: boolean): string {
    return b ? this._localize["YES"] : this._localize["NO"];
  }

  public medicalExaminationResult(ar: string[]): string[] {
    if (ar == null) return [];
    ar = ar.map((line) => {
      let m = line.match(/([^:]*):(.*)/);
      if (m) {
        m[1] = trim(m[1]);
        return (m[1] ? m[1] + ": " : "") + trim(m[2]);
      }

      return line;
    });
    return ar;
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
