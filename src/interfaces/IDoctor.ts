import { ISpecialization } from "interfaces/index";

export interface IDoctor {
  id: string;
  surname: string;
  name: string;
  specialization: ISpecialization;

}
