import { Gender } from "types/Gender";

export interface IPatientInfo {
  id: string;
  surname: string;
  name: string;
  middleName: string;
  phones: string[];
  email: string;
  gender: Gender;
  date?: Date;
  medcardNumber: string;
}
