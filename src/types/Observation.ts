import { BusinessInfo } from "./BusinessInfo";
import { Doctor } from "./Doctor";
import { PatientInfo } from "./PatientInfo";
import { ObservationType } from "./ObservationType";
import { Period } from "./Period";
import { ObservationValue } from "./ObservationValue";
import { ObservationRange } from "./ObservationRange";
import { ObservationComponent } from "./ObservationComponent";
import { JSONObject, JSONValue } from "../json";

export class Observation {
  id: string;
  createdDate: Date;
  patientInfo: PatientInfo;
  type: ObservationType;
  observationKey: string;
  status: string;
  effectivePeriod: Period;
  issuedDate: Date;
  performerDoctor: Doctor;
  performerBusiness: BusinessInfo;
  value: ObservationValue;
  note: string;
  interpretation: string[];
  ranges: ObservationRange[];
  components: ObservationComponent[];

  constructor() {
    this.patientInfo = new PatientInfo();
    this.effectivePeriod = new Period();
    this.performerDoctor = new Doctor();
    this.performerBusiness = new BusinessInfo();
    this.value = new ObservationValue();
    this.interpretation = [];
    this.ranges = [];
    this.components = [];
  }

  fromJson(json: any): Observation {
    this.id = json.id;
    this.createdDate = new Date(json.createdDate);

    if (json.patientInfo) this.patientInfo.fromJson(json.patientInfo);

    this.type = json.type;
    this.observationKey = json.observationKey;
    this.status = json.status;

    if (json.effectivePeriod)
      this.effectivePeriod.fromJson(json.effectivePeriod);

    this.issuedDate = new Date(json.issuedDate);

    if (json.performerDoctor)
      this.performerDoctor.fromJson(json.performerDoctor);

    if (json.performerBusiness)
      this.performerBusiness.fromJson(json.performerBusiness);

    if (json.value) this.value.fromJson(json.value);

    this.note = json.note;

    this.interpretation = [];
    if (json.interpretation)
      for (let i: number = 0; i < json.interpretation.length; ++i)
        this.interpretation.push(json.interpretation[i]);

    this.ranges = [];
    if (json.ranges)
      for (let i: number = 0; i < json.ranges.length; ++i)
        this.ranges.push(new ObservationRange().fromJson(json.ranges[i]));

    this.components = [];
    if (json.components)
      for (let i: number = 0; i < json.components.length; ++i)
        this.components.push(
          new ObservationComponent().fromJson(json.components[i])
        );

    return this;
  }

  toJson(): JSONValue {
    let payload: JSONObject = {};
    payload.id = this.id;
    payload.createdDate = this.createdDate.toJSON();
    payload.patientInfo = this.patientInfo ? this.patientInfo.toJson() : null;
    payload.type = this.type;
    payload.observationKey = this.observationKey;
    payload.status = this.status;
    payload.effectivePeriod = this.effectivePeriod
      ? this.effectivePeriod.toJson()
      : null;
    payload.issuedDate = this.issuedDate.toJSON();
    payload.performerDoctor = this.performerDoctor
      ? this.performerDoctor.toJson()
      : null;
    payload.performerBusiness = this.performerBusiness
      ? this.performerBusiness.toJson()
      : null;
    payload.value = this.value ? this.value.toJson() : null;
    payload.note = this.note;
    payload.interpretation = this.interpretation;
    payload.ranges = this.ranges ? this.ranges.map((r) => r.toJson()) : null;
    payload.components = this.components
      ? this.components.map((c) => c.toJson())
      : null;
    return payload;
  }
}
