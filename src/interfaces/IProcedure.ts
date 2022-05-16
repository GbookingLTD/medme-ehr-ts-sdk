import { IPeriod, IService } from "interfaces/index";
import { ProcedureExecStatus, ProcedureType } from "types/index";

export interface IProcedure {
  id: string;
  created: Date;
  title: string;
  services: IService[];
  type: ProcedureType;
  required: boolean;
  status: ProcedureExecStatus;
  period: IPeriod;
  strictPeriod: IPeriod;
  preparations: string[];
  requiredPreparations: string[];
  appointmentResultId: string;
}
