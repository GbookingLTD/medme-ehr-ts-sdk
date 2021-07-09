import { Service } from "./Service";
import { ProcedureType } from "./ProcedureType";
import { ProcedureExecStatus } from "./ProcedureExecStatus";
import { Period } from "./Period";
import { JSONArray, JSONObject, JSONValue } from "../json";

export class Procedure  {
    public id: string;
    public created: Date;
    public title: string;
    public services: Service[];
    public type: ProcedureType;
    public required: boolean;
    public status: ProcedureExecStatus;
    public period: Period;
    public strictPeriod: Period;
    public preparations: string[];
    public requiredPreparations: string[];
    public appointmentResultId: string;

    constructor() {
        this.services = [];
        this.period = new Period();
        this.strictPeriod = new Period();
        this.preparations = [];
        this.requiredPreparations = [];
    }

    fromJson(json: any): Procedure {
        this.id = json.id;
        this.created = json.created;
        this.title = json.title;
        this.services = json.services ? json.services.map((s: object) => (new Service).fromJson(s)) : [];
        this.type = json.type;
        this.required = json.required;
        this.status = json.status;

        if (json.period)
            this.period.fromJson(json.period);

        if (json.strictPeriod)
            this.strictPeriod.fromJson(json.strictPeriod);

        this.preparations = json.preparations;
        this.requiredPreparations = json.requiredPreparations;
        this.appointmentResultId = this.appointmentResultId;
        return this;
    }

    toJson(): JSONValue {
        let payload: JSONObject = {};
        payload.id = this.id;
        payload.created = this.created.toJSON();
        payload.title = this.title;
        payload.services = this.services ? this.services.map(s => s.toJson()) : [];
        payload.type = this.type;
        payload.required = this.required;
        payload.status = this.status;
        payload.period = this.period.toJson();
        payload.strictPeriod = this.strictPeriod.toJson();
        payload.preparations = this.preparations;
        payload.requiredPreparations = this.requiredPreparations;
        payload.appointmentResultId = this.appointmentResultId;
        return payload;
    }
}
