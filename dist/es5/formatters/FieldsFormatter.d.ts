import { DateFormatFunc, IFormatter } from "./Formatter";
import { LocaleCode } from "./LocaleCode";
import { AppointmentResultMessage } from "../messages/AppointmentResultMessage";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
import { Diagnosis, Procedure, PrescriptionInfo, Medication, Period, Service, ClientPrice, BusinessInfo } from "../types/index";
import { Observation } from "../types/Observation";
import { PatientMessage } from "../messages/PatientMessage";
import { AppointmentMessage } from "../messages/AppointmentMessage";
import { PatientReportInfo } from "../types/PatientReportInfo";
export declare enum FieldType {
    Text = "text",
    Number = "number",
    List = "list",
    Object = "object",
    Date = "date",
    DateTime = "dateTime",
    DatePeriod = "datePeriod",
    Email = "email",
    Price = "price",
    Status = "status",
    Paragraphs = "paragraphs",
    ObjectList = "objectList",
    MediaList = "mediaList",
    AttachmentList = "attachmentList",
    AttachmentInfoList = "attachmentInfoList",
    Hidden = "hidden"
}
export declare enum FieldStatusColor {
    Red = "red",
    Yellow = "yellow",
    Blue = "blue",
    Green = "green"
}
export declare type FieldValueStatus = {
    color: FieldStatusColor;
    text: string;
};
export declare type FieldValue = string | string[] | Field[] | Date | object | number | FieldValueStatus;
export declare enum FieldItemMode {
    FirstLine = "firstLine",
    SecondLine = "secondLine",
    ThirdLine = "thirdLine",
    Hidden = "hidden",
    Picture = "picture"
}
export declare class Field {
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
export declare class FieldMeta {
    type: FieldType;
    composite?: boolean;
    format: (val: FieldValue) => FieldValue;
}
export declare type FieldMetaMap = {
    [key: string]: FieldMeta;
};
export declare class FieldItemModeMeta {
    firstLine: (item: any) => string;
    secondLine: (item: any) => string;
    thirdLine: (item: any) => string;
}
export declare function buildFieldArray(data: object, meta: FieldMetaMap, t: object, priorKeys?: string[], itemModeMeta?: FieldItemModeMeta): Field[];
export declare class FieldsFormatter implements IFormatter<Field[]> {
    static create(locale: LocaleCode, dateFormat?: DateFormatFunc): FieldsFormatter;
    private _localize;
    private _dateFormat;
    constructor(localize: object, dateFormat?: DateFormatFunc);
    dateField(opts?: {
        dateOnly: boolean;
    }): FieldMeta;
    private textField;
    private numberField;
    private businessField;
    private doctorField;
    private doctorsField;
    private anamnesisField;
    private medicalExaminationResultField;
    private diagnosisField;
    private FormattedFieldList;
    private idField;
    private activeField;
    private statusField;
    private patientField;
    private phonesField;
    private emailField;
    private genderField;
    private paragrathesField;
    private diagnosisTypeField;
    private diagnosisCategoryField;
    private periodField;
    private appointmentResultsField;
    private appointmentResultField;
    private servicesField;
    private priceField;
    private currencyField;
    private priceFormat;
    private plural;
    private durationFormat;
    private durationField;
    private mediasField;
    private AttachmentInfosField;
    private attachmentsField;
    business(b: BusinessInfo): Field[];
    clientPrice(p: ClientPrice): Field[];
    private clientPriceText;
    service(s: Service): Field[];
    private fullPatientNameField;
    patientMessage(p: PatientMessage): Field[];
    patientReportInfos(p: PatientMessage): Field[];
    reportInfos(p: PatientReportInfo[]): Field[];
    reportInfo(r: PatientReportInfo): {
        type: FieldType;
        format: (val: FieldValue) => object;
    };
    patientInfo(p: PatientMessage): Field[];
    appointment(a: AppointmentMessage): Field[];
    appointmentResult(ar: AppointmentResultMessage): Field[];
    diagnosis(d: Diagnosis[]): Field[];
    procedure(p: Procedure): Field[];
    procedures(p: Procedure[]): Field[];
    prescriptions(p: PrescriptionInfo[]): string;
    private medicationsField;
    prescription(p: PrescriptionInfo): Field[];
    medication(m: Medication): Field[];
    observation(o: Observation): Field[];
    private observationsField;
    diagnosticReport(dr: DiagnosticReportMessage): Field[];
    anamnesis(a: string[]): string[];
    duration(n: number): string;
    private doctor;
    private doctors;
    private yesNo;
    medicalExaminationResult(ar: string[]): string[];
    period(period: Period, offset: string): string;
}
