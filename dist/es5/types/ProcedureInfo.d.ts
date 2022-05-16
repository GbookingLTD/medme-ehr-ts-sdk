import { ProcedureExecStatus } from "./ProcedureExecStatus";
import { ProcedureType } from "./ProcedureType";
export declare class ProcedureInfo {
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
    constructor(json: any);
}
//# sourceMappingURL=ProcedureInfo.d.ts.map