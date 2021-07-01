declare const _default: {
    MINUTE_UNIT: string;
    YES: string;
    NO: string;
    CREATED: string;
    appointmentResult: {
        created: string;
        start: string;
        doctor: string;
        duration: string;
        anamnesis: string;
        medicalExaminationResult: string;
        diagnosis: string;
        recommendations: string;
        scheduledProcedures: string;
        prescriptions: string;
    };
    procedure: {
        created: string;
        title: string;
        services: string;
        type: string;
        required: string;
        status: string;
        period: string;
        strictPeriod: string;
        preparations: string;
        requiredPreparations: string;
    };
    procedureType: string[];
    ProcedureExecStatus: string[];
    Period: {
        begin: string;
        end: string;
    };
    DiagnosticReport: {
        Doctor: string;
        EffectivePeriod: string;
        Result: string;
        Images: string;
        Attachments: string;
    };
    Prescription: {
        title: string;
        created: string;
        recorderDoctor: string;
        medications: string;
        dosageText: string;
        reasonText: string;
        validityPeriod: string;
        numberOfRepeats: string;
    };
    MedicationForm: {
        0: string;
        1: string;
        2: string;
    };
};
export default _default;
