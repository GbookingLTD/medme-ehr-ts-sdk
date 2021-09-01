import { ProcedureExecStatus } from "./ProcedureExecStatus";
import { ProcedureType } from "./ProcedureType";

export class ProcedureInfo {
  id: string;
  title: string;
  status: ProcedureExecStatus;
  type: ProcedureType;
  required: boolean;

  /**
   * Создание объекта "информация о процедуре" по объекту json.
   *
   * @param json json object
   */
  constructor(json: any) {
    this.id = json.id;
    this.title = json.title;
    this.status = json.status;
    this.type = json.type;
    this.required = json.required;
  }
}
