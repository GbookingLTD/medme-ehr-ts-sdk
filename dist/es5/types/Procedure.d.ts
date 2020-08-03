import { Service } from "./Service";
import { ProcedureType } from "./ProcedureType";
import { ProcedureExecStatus } from "./ProcedureExecStatus";
import { Period } from "./Period";
export declare class Procedure {
    id: string;
    created: Date;
    title: string;
    services: Service[];
    type: ProcedureType;
    required: boolean;
    status: ProcedureExecStatus;
    period: Period;
    strictPeriod: Period;
    preparations: string[];
    requiredPreparations: string[];
    appointmentResultId: string;
    constructor();
    fromJson(json: any): Procedure;
    toJson(): object;
}
