export declare enum KindDiagnosis {
    Base = 0,
    Complication = 1,
    Related = 2
}
export declare enum TypeDiagnosis {
    AcuteDisease = 0,
    ChronicalFirst = 1,
    ChronicalEarly = 2
}
export declare class Diagnosis {
    id: string;
    cd10: Cd10;
    diagnosisText: string;
    kind: KindDiagnosis;
    type: TypeDiagnosis;
}
export declare class Cd10 {
    description: string;
    code: string;
}
