/* Tests fixtures.
Set it up when generate new cache data.
*/

import { PatientInputProperties } from "../src/types";
import { BusinessInfo, Doctor, PrescriptionInfo } from "../src/types";
import { MedicationForm } from "../src/types/MedicationForm";
import { Medication } from "../src/types/Medication";
import { Period } from "../src/types/Period";
import { Specialization } from "../src/types/Specialization";
import { AppointmentResultModel } from "../src/models/AppointmentResultModel";

export const sudoApiKey = "123456";

export const authPatient = {
  publicUserId: "user999",
  internalUserId: 709,
  appointmentId: "981",
  appointmentResultId: "735",
  diagnosticReportId: "38",
  prescriptionId: "146",
};

export const authPatientInputProperties = new PatientInputProperties().fromJson(
  {
    id: "709",
    surname: "Shields",
    middleName: "Rufus",
    name: "Rufus",
    phone: "806.593.1458 x29688",
    email: "Cheyenne_Murphy@hotmail.com",
    gender: 0,
    date: new Date(Date.parse("1945-08-15 04:40:32.4570000Z")),
  }
);

// entities ranges in cache

export const patIdRange = {
  first: 709,
  count: 100,
  get last() {
    return this.first + this.count - 1;
  },
};

export const appIdRange = {
  first: 979,
  count: 100,
  get last() {
    return this.first + this.count - 1;
  },
};

export const arIdRange = {
  first: 705,
  count: 100,
  get last() {
    return this.first + this.count - 1;
  },
};

export const drIdRange = {
  first: 1,
  count: 100,
  get last() {
    return this.first + this.count - 1;
  },
};

export const pmIdRange = {
  first: 111,
  count: 100,
  get last() {
    return this.first + this.count - 1;
  },
};

// end of entity ranges

export let presciption: PrescriptionInfo = {
  id: "1",
  created: new Date(2019, 10, 2, 4, 20),
  dosageText: "чуть чуть",
  title: "Трамадол",
  numberOfRepeats: 12,
  medications: [
    {
      amount: 10,
      expirationDate: new Date(2019, 10, 2),
      form: MedicationForm.Tablets,
    } as Medication,
  ],
  reasonText: "some reason",
  validityPeriod: {
    begin: new Date(2019, 10, 2),
    end: new Date(2019, 10, 2),
  } as Period,
  recorderDoctor: {
    id: "1",
    name: "John",
    surname: "Smith",
    specialization: {
      id: "1",
      name: "Хирург",
    } as Specialization,
  } as Doctor,
} as PrescriptionInfo;

export let appointmentResult: AppointmentResultModel =
  new AppointmentResultModel().fromJson({
    doctor: {
      id: "1",
      name: "",
      surname: "Smith",
      specialization: {
        id: "1",
        name: "Хирург",
      },
    },
    prescriptions: [],
    recommendations: [],
    diagnosis: [],
    anamnesis: [],
    business: {
      name: "Asd",
      id: "1",
      location: "das",
      networkId: "1",
    },
    created: new Date(2019, 10, 2),
    diagnosticReportIds: [],
    duration: 1,
    id: "",
    medicalExaminationResult: [],
    patientId: "asd",
    scheduledProcedures: [],
    start: new Date(2019, 10, 2),
  });
