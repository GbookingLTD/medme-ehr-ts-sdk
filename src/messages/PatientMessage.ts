import { Gender } from "../types/Gender";
import { MaritalStatus } from "../types/MaritalStatus";
import { FamilyMember } from "../types/FamilyMember";
import { Insurance } from "../types/Insurance";

export class PatientMessage {
  id: string;
  active: boolean;
  surname: string;
  middleName: string;
  name: string;
  phones: string;
  email: string;
  gender: Gender;
  birthdate: Date;
  deceased: boolean;
  maritalStatus: MaritalStatus;
  photo: string;
  familyMembers: FamilyMember[];
  address: string;
  medcardNumber: string;
  insurances: Insurance[];
}
