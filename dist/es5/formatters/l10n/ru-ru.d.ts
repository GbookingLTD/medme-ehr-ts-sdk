declare const _default: {
    MINUTE_UNIT: string;
    YES: string;
    NO: string;
    CREATED: string;
    Gender: {
        0: string;
        1: string;
        2: string;
        3: string;
    };
    appointmentResult: {
        business: string;
        created: string;
        start: string;
        doctor: string;
        duration: string;
        anamnesis: string;
        medicalExaminationResult: string;
        diagnosis: string;
        recommendations: string;
        scheduledProcedures: string;
        scheduledProceduresHint: string;
        prescriptions: string;
        prescriptionsHint: string;
        attachments: string;
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
        doctor: string;
        effectivePeriod: string;
        result: string;
        imagineMedia: string;
        attachments: string;
        id: string;
        created: string;
        active: string;
        business: string;
        patient: string;
        status: string;
        type: string;
        category: string;
        resultInterpretation: string;
        resultInterpreter: string;
        services: string;
        issuedDate: string;
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
        diagnoses: string;
    };
    MedicationForm: {
        0: string;
        1: string;
        2: string;
    };
    ActiveStatus: {
        disactive: string;
        active: string;
    };
    DiagnosisType: {
        laboratoryTest: string;
        observation: string;
        unknown: string;
    };
    Currency: string[];
    currencyPosition: string;
    diagnosisTitle: string;
    Duration: {
        hour: string;
        hours: string;
        minute: string;
        minutes: string;
    };
    Observation: {
        id: string;
        createdDate: string;
        patientInfo: string;
        type: string;
        observationKey: string;
        status: string;
        effectivePeriod: string;
        issuedDate: string;
        performerDoctor: string;
        performerBusiness: string;
        value: string;
        note: string;
        interpretation: string;
        ranges: string;
        components: string;
    };
    patient: {
        id: string;
        fullName: string;
        phones: string;
        email: string;
        gender: string;
        birthdate: string;
        medcardNumber: string;
        address: string;
    };
    appointment: {
        business: string;
        created: string;
        start: string;
        doctor: string;
        duration: string;
    };
    filters: {
        Unknown: string;
        PatientByMedCard: string;
        PatientByName: string;
        PatientByPhone: string;
        AppointmentByPatientId: string;
        AppointmentByCreated: string;
        AppointmentByStarted: string;
        AppointmentByBusiness: string;
        DiagnosticReportByPatient: string;
        DiagnosticReportByCreated: string;
        DiagnosticReportByBusiness: string;
        PrescriptionByPatient: string;
        PrescriptionByDiagnosisCd10: string;
        PrescriptionByCreated: string;
        PrescriptionByBusiness: string;
    };
};
export default _default;
