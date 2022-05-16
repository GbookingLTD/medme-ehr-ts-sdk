export enum PatientReportInfoType {
  Item = 0,
  Table,
  Header,
  ItemList,
}

export class PatientReportInfo {
  id: string;
  patientId: string;
  key: string;
  name: string;
  value: object;
  type: PatientReportInfoType = PatientReportInfoType.Item;
}
