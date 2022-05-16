import { IDoctor, IMedication, IPeriod } from "interfaces/index";

export interface IPrescriptionInfo {
  id: string;
  created: Date;
  recorderDoctor: IDoctor;
  medications: IMedication[];
  dosageText: string;
  reasonText: string;
  validityPeriod: IPeriod;
  numberOfRepeats: number;
  title: string;
}
