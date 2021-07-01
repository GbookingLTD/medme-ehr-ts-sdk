/* Tests fixtures.
Set it up when generate new cache data.
*/

import { PatientInputProperties } from "../src/types";

export const sudoApiKey = "123456";

export const authPatient = {
    publicUserId: "user999",
    internalUserId: 709,
    appointmentId: "981",
    appointmentResultId: "735",
    diagnosticReportId: "38",
    prescriptionId: "146"
};

export const authPatientInputProperties = (new PatientInputProperties).fromJson({
    id: "709",
    surname: "Shields",
    middleName: "Rufus",
    name: "Rufus",
    phone: "806.593.1458 x29688",
    email: "Cheyenne_Murphy@hotmail.com",
    gender: 0,
    date: new Date(Date.parse("1945-08-15 04:40:32.4570000Z")),
});

// entities ranges in cache

export const patIdRange = {
    first: 709,
    count: 100,
    get last() {
        return this.first + this.count - 1;
    }
};

export const appIdRange = {
    first: 979,
    count: 100,
    get last() {
        return this.first + this.count - 1;
    }
};

export const arIdRange = {
    first: 705,
    count: 100,
    get last () {
        return this.first + this.count - 1;
    }
};

export const drIdRange = {
    first: 1,
    count: 100,
    get last() {
        return this.first + this.count - 1;
    }
};

export const pmIdRange = {
    first: 111,
    count: 100,
    get last() {
        return this.first + this.count - 1;
    }
};

// end of entity ranges
