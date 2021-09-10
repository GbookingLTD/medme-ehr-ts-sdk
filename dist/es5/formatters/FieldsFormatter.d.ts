import { DateFormatFunc, IFormatter, LocaleCode } from "./Formatter";
import { AppointmentResultMessage } from "../messages/AppointmentResultMessage";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
import { Diagnosis, Procedure, PrescriptionInfo, Medication, Period, Service, ClientPrice, BusinessInfo } from "../types/index";
import { Observation } from "../types/Observation";
import { PatientInfo } from "../types/PatientInfo";
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
    static LOCALIZE: {
        "ru-ru": {
            MINUTE_UNIT: string;
            YES: string;
            NO: string;
            CREATED: string;
            appointmentResult: {
                created: string;
                start: string;
                doctor: string;
                duration: string;
                anamnesis: string;
                medicalExaminationResult: string;
                diagnosis: string;
                recommendations: string;
                scheduledProcedures: string;
                prescriptions: string;
            };
            procedure: {
                created: string;
                title: string;
                services: string;
                type: string;
                required: string;
                status: string;
                period: string;
                strictPeriod: string;
                preparations: string;
                requiredPreparations: string;
            };
            procedureType: string[];
            ProcedureExecStatus: string[];
            Period: {
                begin: string;
                end: string;
            };
            DiagnosticReport: {
                doctor: string;
                effectivePeriod: string;
                result: string;
                imagineMedia: string;
                attachments: string;
                id: string;
                created: string;
                active: string;
                business: string;
                patient: string;
                status: string;
                type: string;
                category: string;
                resultInterpretation: string;
                resultInterpreter: string;
                services: string;
                issuedDate: string;
            };
            Prescription: {
                title: string;
                created: string;
                recorderDoctor: string;
                medications: string;
                dosageText: string;
                reasonText: string;
                validityPeriod: string;
                numberOfRepeats: string;
            };
            MedicationForm: {
                0: string;
                1: string;
                2: string;
            };
            ActiveStatus: {
                disactive: string;
                active: string;
            };
            DiagnosisType: {
                laboratoryTest: string;
                observation: string;
                unknown: string;
            };
            Currency: string[];
            currencyPosition: string;
            diagnosisTitle: string;
            Duration: {
                hour: string;
                hours: string;
                minute: string;
                minutes: string;
            };
            Observation: {
                id: string;
                createdDate: string;
                patientInfo: string;
                type: string;
                observationKey: string;
                status: string;
                effectivePeriod: string;
                issuedDate: string;
                performerDoctor: string;
                performerBusiness: string;
                value: string;
                note: string;
                interpretation: string;
                ranges: string;
                components: string;
            };
        };
        "en-us": {
            MINUTE_UNIT: string;
            YES: string;
            NO: string;
            CREATED: string;
            appointmentResult: {
                created: string;
                start: string;
                doctor: string;
                duration: string;
                anamnesis: string;
                medicalExaminationResult: string;
                diagnosis: string;
                recommendations: string;
                scheduledProcedures: string;
                prescriptions: string;
            };
            procedure: {
                created: string;
                title: string;
                services: string;
                type: string;
                required: string;
                status: string;
                period: string;
                strictPeriod: string;
                preparations: string;
                requiredPreparations: string;
            };
            procedureType: string[];
            ProcedureExecStatus: string[];
            Period: {
                begin: string;
                end: string;
            };
            DiagnosticReport: {
                Doctor: string;
                EffectivePeriod: string;
                Result: string;
                Images: string;
                Attachments: string;
            };
            Prescription: {
                title: string;
                created: string;
                recorderDoctor: string;
                medications: string;
                dosageText: string;
                reasonText: string;
                validityPeriod: string;
                numberOfRepeats: string;
            };
            MedicationForm: {
                0: string;
                1: string;
                2: string;
            };
        };
    };
    static create(locale: LocaleCode, dateFormat?: DateFormatFunc): FieldsFormatter;
    private _localize;
    private _dateFormat;
    constructor(localize: object, dateFormat?: DateFormatFunc);
    private dateField;
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
    private attachmentsField;
    business(b: BusinessInfo): Field[];
    clientPrice(p: ClientPrice): Field[];
    private clientPriceText;
    service(s: Service): Field[];
    patientInfo(p: PatientInfo): Field[];
    appointmentResult(ar: AppointmentResultMessage): Field[];
    diagnosis(d: Diagnosis[]): Field[];
    procedure(p: Procedure): Field[];
    procedures(p: Procedure[]): Field[];
    prescriptions(p: PrescriptionInfo[]): string;
    prescription(p: PrescriptionInfo): Field[];
    medications(s: Medication[]): string;
    medication(s: Medication): Field[];
    observation(o: Observation): Field[];
    private observationsField;
    diagnosticReport(dr: DiagnosticReportMessage): Field[];
    anamnesis(a: string[]): string[];
    duration(n: number): string;
    private doctor;
    private doctors;
    private yesNo;
    medicalExaminationResult(ar: string[]): string;
    period(period: Period, offset: string): string;
}
