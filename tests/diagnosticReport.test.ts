"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IDiagnosticReportService } from '../src/services/DiagnosticReportService';
import { DiagnosticReportModel } from '../src/models/DiagnosticReportModel';
import { Credentials } from '../src/services/Credentials';
import { getCreateServiceFn } from './login';
import {RpcErrorCodes} from "../src/services/RpcErrorCodes";

describe('DiagnosticReport', function() {
    function getOneById(service: IDiagnosticReportService, id: string, done: (err: Error, p: DiagnosticReportModel) => void) {
        service.getDiagnosticReportModelById(id, (err: any, appointment: DiagnosticReportModel) => {
            // console.log("prescription.id:", appointment.id);
            assert.strictEqual(appointment.id, id);
            done(null, appointment);
        });
    }

    function getPatientDiagnosticReports(service: IDiagnosticReportService, patientId: string, limit: number, offset: number,
            done: (err: Error, appointments: DiagnosticReportModel[]) => void) {
        service.getPatientDiagnosticReports(patientId, limit, offset, (err: any, reports: DiagnosticReportModel[]) => {
            reports.forEach(function(r) {
                assert.strictEqual(r.id, "1");
            });
            done(null, reports);
        });
   
    }

    describe('JsonRPC', function() {
        const createService = getCreateServiceFn<IDiagnosticReportService>(function(authCred: Credentials) {
            return new JsonRPC.DiagnosticReportService("http://localhost:9999/", authCred, JsonRPC.Transports.xhr);
        });
        it('GetOneById', function(done: (err?: any) => void) {
            createService(function(err: any, service?: IDiagnosticReportService) {
                if (err) return done(err);
                getOneById(service, "1", done);
            });
        });
        it('GetPatientDiagnosticReports', function(done: (err?: any) => void) {
            createService(function(err: any, service?: IDiagnosticReportService) {
                if (err) return done(err);
                getPatientDiagnosticReports(service, "1", 10, 0, done);
            });
        });
        it('GetOtherPatientDiagnosticReports', function(done: (err?: any) => void) {
            createService(function(err: any, service?: IDiagnosticReportService) {
                if (err) return done(err);
                service.getPatientDiagnosticReports("2", 10, 0, (err: any, reports: DiagnosticReportModel[]) => {
                    if (err && err.code === RpcErrorCodes.AccessForbidden) return done();
                });
            });
        });

        it('From json test', function(done: (err?: any) => void) {
            const json = {
                "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54",
                "patientId": "160",
                "status": 0,
                "type": 0,
                "category": "",
                "effectivePeriod": {
                    "begin": "0001-01-01T00:00:00",
                    "end": "0001-01-01T00:00:00"
                },
                "issuedDate": "2017-11-30T08:40:44",
                "result": [
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:SostoyanieMatki",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "SostoyanieMatki",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "0"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:Gidrosonografiya",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "Gidrosonografiya",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "1"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:SvobodnoProhodimaPr",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "SvobodnoProhodimaPr",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:ZatrudnenoProhodimaPr",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "ZatrudnenoProhodimaPr",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:NeprohodimaVIstmichesko",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "NeprohodimaVIstmichesko",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:NeprohodimaVAmpulyarnom",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "NeprohodimaVAmpulyarnom",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "True"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:NeprohodimaVIntersticia",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "NeprohodimaVIntersticia",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:MeshotchatoeObrazovanie",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "MeshotchatoeObrazovanie",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:PeritubarnyeSpaykiPr",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "PeritubarnyeSpaykiPr",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:SvobodnoProhodimaLv",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "SvobodnoProhodimaLv",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "True"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:ZatrudnenoProhodimaLv",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "ZatrudnenoProhodimaLv",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:NeprohodimaVIstmichesk1",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "NeprohodimaVIstmichesk1",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:NeprohodimaVAmpulyarno1",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "NeprohodimaVAmpulyarno1",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:NeprohodimaVInterstici1",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "NeprohodimaVInterstici1",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:MeshotchatoeObrazovanie1",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "MeshotchatoeObrazovanie1",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    },
                    {
                        "id": "MedMe.EHR.Providers.MedialogProvider.Entities.Hysterosalpingograph:54:PeritubarnyeSpaykiLv",
                        "createdDate": "2017-11-30T08:40:44",
                        "patientInfo": null,
                        "type": 1,
                        "observationKey": "PeritubarnyeSpaykiLv",
                        "status": 0,
                        "effectivePeriod": {
                            "begin": "0001-01-01T00:00:00",
                            "end": "0001-01-01T00:00:00"
                        },
                        "issuedDate": "0001-01-01T00:00:00",
                        "performerDoctor": null,
                        "performerBusiness": null,
                        "value": {
                            "serializedValue": null,
                            "unit": 0,
                            "code": null,
                            "value": "False"
                        },
                        "note": null,
                        "device": null,
                        "interpretation": [],
                        "ranges": null,
                        "components": null
                    }
                ],
                "services": null,
                "resultInterpreter": null,
                "resultInterpretation": [],
                "imagineMedia": [],
                "attachments": []
            }

            let diagnosticReport = (new DiagnosticReportModel).fromJson(json);

            done();
        });
    });
});