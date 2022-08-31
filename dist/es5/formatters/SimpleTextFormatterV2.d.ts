import { Cd10, Diagnosis } from "../types/Diagnosis";
import { Procedure } from "../types/Procedure";
import { PrescriptionInfo } from "../types/PrescriptionInfo";
import { ProcedureType } from "../types/ProcedureType";
import { ProcedureExecStatus } from "../types/ProcedureExecStatus";
import { Medication } from "../types/Medication";
import { DateFormatFunc, IFormatter } from "./Formatter";
import { IAppointmentResultMessage, IDiagnosticReportMessage, IDoctor, IObservation, IPeriod, IService } from "interfaces/index";
import { AttachmentInfo, PatientReportInfo } from "types/index";
export declare class SimpleTextFormatterV2 implements IFormatter<string> {
    static LOCALIZE: {
        "ru-ru": {
            MINUTE_UNIT: string;
            YES: string;
            NO: string;
            CREATED: string;
            Gender: {
                0: string;
                1: string;
                2: string;
                3: string;
            };
            appointmentResult: {
                business: string;
                created: string;
                start: string;
                doctor: string;
                duration: string;
                anamnesis: string;
                medicalExaminationResult: string;
                diagnosis: string;
                recommendations: string;
                scheduledProcedures: string;
                scheduledProceduresHint: string;
                prescriptions: string;
                prescriptionsHint: string;
                attachments: string;
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
                diagnoses: string;
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
            patient: {
                id: string;
                fullName: string;
                phones: string;
                email: string;
                gender: string;
                birthdate: string;
                medcardNumber: string;
                address: string;
            };
            appointment: {
                business: string;
                created: string;
                start: string;
                doctor: string;
                duration: string;
            };
            filters: {
                Unknown: string;
                PatientByMedCard: string;
                PatientByName: string;
                PatientByPhone: string;
                AppointmentByPatientId: string;
                AppointmentByCreated: string;
                AppointmentByStarted: string;
                AppointmentByBusiness: string;
                DiagnosticReportByPatient: string;
                DiagnosticReportByCreated: string;
                DiagnosticReportByBusiness: string;
                PrescriptionByPatient: string;
                PrescriptionByCreated: string;
                PrescriptionByBusiness: string;
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
    private _localize;
    private _dateFormat;
    private _baseOffset;
    constructor(localize: object, dateFormat?: DateFormatFunc);
    appointmentResult(ar: IAppointmentResultMessage, offset?: string): string;
    medicalExaminationResult(ar: string[], offset: string): string;
    anamnesis(ar: string[], offset: string): string;
    duration(n: number): string;
    doctor(d: IDoctor, offset?: string): string;
    diagnosis(d: Diagnosis[]): string;
    diagnosisOffset(d: Diagnosis[], offset: string): string;
    cd10(item: Cd10): string;
    procedures(p: Procedure[], offset: string): string;
    procedure(p: Procedure, offset?: string): string;
    yesNo(b: boolean, offset: string): string;
    prescriptions(p: PrescriptionInfo[], offset: string): string;
    prescription(p: PrescriptionInfo, offset?: string): string;
    reportInfos(p: PatientReportInfo[], offset: string): string;
    reportInfo(r: PatientReportInfo, offset?: string): string;
    attachmentInfos(a: AttachmentInfo[], offset: string): string;
    attachmentInfo(a: AttachmentInfo, offset?: string): string;
    reportInfoValue(r: any, offset: string): string;
    reportInfoValueHandler(value: string): string;
    medications(s: Medication[], offset: string): string;
    medication(s: Medication, offset?: string): string;
    services(s: IService[], offset: string): string;
    service(s: IService, offset: string): string;
    procedureType(type: ProcedureType): string;
    procedureExecStatus(status: ProcedureExecStatus): string;
    period(period: IPeriod, offset: string): string;
    diagnosticReport(dr: IDiagnosticReportMessage, offset?: string): string;
    diagnosticReportTitle(dr: IDiagnosticReportMessage): string;
    observations(o: IObservation[], offset: string): string;
    observation(o: IObservation, offset?: string): string;
}
//# sourceMappingURL=SimpleTextFormatterV2.d.ts.map