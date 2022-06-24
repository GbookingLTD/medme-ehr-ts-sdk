import { JSONObject, JSONValue } from "../json";

export enum KindDiagnosis {
  // основное
  Base = 0,
  // осложнение
  Complication = 1,
  // сопутсвующее
  Related = 2,
}

// характер заболевания
export enum TypeDiagnosis {
  // острое заболевание
  AcuteDisease = 0,
  // хроническое заболевание, впервые выявлено
  ChronicalFirst = 1,
  // хроническое заболевание, ранее выявленное
  ChronicalEarly = 2,
}

export class Diagnosis {
  id: string;
  cd10: Cd10;
  diagnosisText: string;
  kind: KindDiagnosis;
  type: TypeDiagnosis;
}

export class Cd10 {
  description: string;
  code: string;
}
