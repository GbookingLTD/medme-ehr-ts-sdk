"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    MINUTE_UNIT: "мин.",
    YES: "Да",
    NO: "Нет",
    CREATED: "Дата создания",
    Gender: {
        0: "М",
        1: "Ж",
        2: "Другое",
        3: "Не установлено",
    },
    appointmentResult: {
        business: "ЛПУ",
        created: "Дата создания",
        start: "Дата и время начала",
        doctor: "Врач",
        duration: "Длительность",
        anamnesis: "Анамнез",
        medicalExaminationResult: "Результаты обследования",
        diagnosis: "Диагноз",
        recommendations: "Рекомендации",
        scheduledProcedures: "Процедуры",
        scheduledProceduresHint: "Назначенные на приеме процедуры, анализы, исследования",
        prescriptions: "Назначения",
        prescriptionsHint: "Медикаментозные назначения (выписанные лекарства)",
        attachments: "Прикрепления"
    },
    procedure: {
        created: "Дата создания",
        title: "Название",
        services: "Услуги",
        type: "Тип",
        required: "Обязательно",
        status: "Статус",
        period: "Предполагаемый период выполнения услуги",
        strictPeriod: "Период выполнения услуги, который нельзя нарушить",
        preparations: "Желаемые приготовления к процедуре",
        requiredPreparations: "Необходимые приготовления к процедуре",
    },
    procedureType: ["Рекомендация", "Процедура", "Анализы"],
    ProcedureExecStatus: ["Запланировано", "В процессе", "Отменено", "Выполнена"],
    Period: {
        begin: "Дата начала",
        end: "Дата окончания",
    },
    DiagnosticReport: {
        doctor: "Врач",
        effectivePeriod: "Период, в течение которого данные действительны",
        result: "Обследование",
        imagineMedia: "Изображения",
        attachments: "Документы",
        id: "Идентификатор",
        created: "Создано",
        active: "Статус",
        business: "ЛПУ",
        patient: "Пациент",
        status: "Статус готовности",
        type: "Тип отчета",
        category: "Категория",
        resultInterpretation: "Отчет, по результатам обследования",
        resultInterpreter: "Врач, составивший отчет",
        services: "Услуги",
        issuedDate: "Дата публикации отчета",
    },
    Prescription: {
        title: "Название",
        created: "Дата создания",
        recorderDoctor: "Врач, выписавший рецепт",
        medications: "Список назначений",
        dosageText: "Медикаментозные назначения",
        reasonText: "Причина назначения",
        validityPeriod: "Время, в течение которого рецепт действует",
        numberOfRepeats: "Сколько раз по этому рецепту можно получить лекарства",
        diagnoses: "Диагнозы",
    },
    MedicationForm: {
        0: "Порошок",
        1: "Таблетки",
        2: "Капсулы",
    },
    ActiveStatus: {
        disactive: "Не активно",
        active: "Активно",
    },
    DiagnosisType: {
        laboratoryTest: "Лабораторный тест",
        observation: "Обследование",
        unknown: "Не определено",
    },
    Currency: ["₽", "$"],
    currencyPosition: "right",
    diagnosisTitle: "Диагноз",
    Duration: {
        hour: "час",
        hours: "часов",
        minute: "минута",
        minutes: "минут",
    },
    Observation: {
        id: "Идентификатор",
        createdDate: "Дата создания",
        patientInfo: "Пациент",
        type: "Тип обследования",
        observationKey: "Название обследования",
        status: "Статус",
        effectivePeriod: "Период, в течение которого данные обследования корректны",
        issuedDate: "Дата публикации",
        performerDoctor: "Специалист, выполнивший обследование",
        performerBusiness: "ЛПУ/Лаборатория",
        value: "Данные",
        note: "Заметки",
        interpretation: "Интерпретация",
        ranges: "Допустимые интервалы значений",
        components: "Показатели в интервалах",
    },
    patient: {
        id: "Идентификатор",
        fullName: "Имя",
        phones: "Телефон",
        email: "email",
        gender: "Пол",
        birthdate: "Дата рождения",
        medcardNumber: "Мед Карта",
        address: "Адрес",
    },
    appointment: {
        business: "ЛПУ",
        created: "Дата создания",
        start: "Дата и время начала",
        doctor: "Врач",
        duration: "Длительность",
    },
    filters: {
        Unknown: "Неизвестно",
        PatientByMedCard: "Мед. Карта",
        PatientByName: "Имя",
        PatientByPhone: "Телефон",
        AppointmentByPatientId: "ID Пациента",
        AppointmentByCreated: "Дата создания",
        AppointmentByStarted: "Дата приёма",
        AppointmentByBusiness: "ЛПУ",
        DiagnosticReportByPatient: "ID Пациента",
        DiagnosticReportByCreated: "Дата создания",
        DiagnosticReportByBusiness: "ЛПУ",
        PrescriptionByPatient: "ID Пациента",
        PrescriptionByDiagnosisCd10: "МКБ-10",
        PrescriptionByCreated: "Дата создания",
        PrescriptionByBusiness: "ЛПУ",
    },
};
