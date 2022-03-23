export declare enum PatientReportInfoType {
    Item = 0,
    Table = 1,
    Header = 2,
    ItemList = 3
}
export declare class PatientReportInfo {
    id: string;
    patientId: string;
    key: string;
    value: object;
    type: PatientReportInfoType;
}
