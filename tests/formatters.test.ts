import {SimpleTextFormatter} from "../src/formatters/SimpleTextFormatter";
import {BusinessInfo, Doctor, PrescriptionInfo} from "../src/types";
import {MedicationForm} from "../src/types/MedicationForm";
import {Medication} from "../src/types/Medication";
import {Period} from "../src/types/Period";
import {Specialization} from "../src/types/Specialization";
import * as assert from "assert";
import {AppointmentResultModel} from "../src/models/AppointmentResultModel";

describe('Simple test formatter', function () {
    it('Prescription not empty and works', function () {
        let formatter = new SimpleTextFormatter(SimpleTextFormatter.LOCALIZE["ru-ru"]);

        let presciption: PrescriptionInfo = {
            id: "1",
            created: new Date(2019, 10, 2, 4, 20),
            dosageText: "чуть чуть",
            title: "Трамадол",
            numberOfRepeats: 12,
            medications: [
                {
                    amount: 10,
                    expirationDate: new Date(2019, 10, 2, ),
                    form: MedicationForm.Tablets
                } as Medication
            ],
            reasonText: "some reason",
            validityPeriod: {
                begin: new Date(2019, 10, 2),
                end: new Date(2019, 10, 2)
            } as Period,
            recorderDoctor: {
                id: "1",
                name: "John",
                surname: "Smith",
                specialization: {
                    id: "1",
                    name: "Хирург"
                } as Specialization
            } as Doctor
        } as PrescriptionInfo

        let formatted = formatter.prescription(presciption, "");

        assert(formatted)
    })

    it('Formatter without empty strings', function () {
        let formatter = new SimpleTextFormatter(SimpleTextFormatter.LOCALIZE["ru-ru"]);

        let appointmentResult: AppointmentResultModel = new AppointmentResultModel().fromJson({
            doctor: {
                id: "1",
                name: "",
                surname: "Smith",
                specialization: {
                    id: "1",
                    name: "Хирург"
                }
            },
            prescriptions: [],
            recommendations: [],
            diagnosis: [],
            anamnesis: [],
            business: {
                name: 'Asd',
                id: '1',
                location: 'das',
                networkId: '1'
            },
            created: new Date(2019, 10, 2),
            diagnosticReportIds: [],
            duration: 1,
            id: '',
            medicalExaminationResult: [],
            patientId: 'asd',
            scheduledProcedures: [],
            start: new Date(2019, 10, 2)
        });

        let formatted = formatter.appointmentResult(appointmentResult);

        assert(!formatted.includes(SimpleTextFormatter.LOCALIZE["ru-ru"]["appointmentResult"]["scheduledProcedures"]))
    })
})