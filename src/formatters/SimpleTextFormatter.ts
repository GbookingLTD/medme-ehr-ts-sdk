import { AppointmentResultModel } from "../models/AppointmentResultModel";
import { Doctor } from "../types/Doctor";
import { Diagnosis } from "../types/Diagnosis";
import { Procedure } from "../types/Procedure";
import { PrescriptionInfo } from "../types/PrescriptionInfo";
import { Service } from "../types/Service";
import { ProcedureType } from "../types/ProcedureType";
import { ProcedureExecStatus } from "../types/ProcedureExecStatus";
import { Period } from "../types/Period";


function alignStrings(obj: object, keys: string[]) {
    // find max strings length
    let ml = 0;
    for (let i = 0; i < keys.length; ++i)
        if (ml < obj[keys[i]].length)
            ml = obj[keys[i]].length;
    
    // pad_right all strings
    keys.forEach((key) => obj[key] = obj[key].padEnd(ml, " "));
}

function formatObject(obj: object, keys: string[], notAlignedKeys: object, propFormats: object, localize: object, offset: string) {
    let ret = "";
    let localizedKeys = keys.reduce((ret, key) => {
        ret[key] = localize[key];
        return ret;
    }, {});
    alignStrings(localizedKeys, keys.filter((key) => !notAlignedKeys[key]));
    keys.forEach((key) => {
        if (propFormats[key])
            ret += offset + localizedKeys[key] + " " + propFormats[key](obj[key], offset + "    ") + "\n";
        else
            ret += offset + localizedKeys[key] + " " + obj[key] + "\n";
    });
    ret += "\n";
    return ret;
}

function paragrathes(a: string[], offset: string): string {
    if (a.length == 0)
        return "";
    // this is simple string
    if (a.length == 1 && a[0].length < 100 && a[0].indexOf("\n") < 0)
        return a[0];
    return offset + a.join("\n\n");
}

function paragrathes_nl(a: string[], offset: string): string {
    if (a.length == 0)
        return "";
    return "\n" + offset + a.join("\n\n");
}

function dateFormat(d: Date): string {
    return d.toISOString();
}

export class SimpleTextFormatter {
    public static LOCALIZE = {
        "ru-ru": {
            "MINUTE_UNIT": "мин.",
            "YES": "Да",
            "NO": "Нет",
            "appointmentResult": {
                "created": "Дата создания",
                "start": "Дата и время начала",
                "doctor": "Врач",
                "duration": "Длительность",
                "anamnesis": "Анамнез",
                "medicalExaminationResult": "Результаты обследования",
                "diagnosis": "Диагноз",
                "recommendations": "Рекомендации",
                "scheduledProcedures": "Назначенные на приеме процедуры, анализы, исследования",
                "prescriptions": "Медикаментозные назначения (выписанные лекарства)",
            },
            "procedure": {
                "created": "Дата создания",
                "title": "Название",
                "services": "Услуги",
                "type": "Тип",
                "required": "Обязательно",
                "status": "Статус",
                "period": "Предполагаемый период выполнения услуги",
                "strictPeriod": "Период выполнения услуги, который нельзя нарушить",
                "preparations": "Желаемые приготовления к процедуре",
                "requiredPreparations": "Необходимые приготовления к процедуре",
            },
            "procedureType": [
                "Рекомендация",
                "Процедура",
                "Анализы"
            ],
            "ProcedureExecStatus": [
                "Запланировано",
                "В процессе",
                "Отменено",
                "Выполнена"
            ],
            "Period": {
                "begin": "Дата начала",
                "end": "Дата окончания"
            }
        }
    };

    private _localize: object;

    public constructor(localize: object) {
        this._localize = localize;
    }

    public appointmentResult(ar: AppointmentResultModel, offset: string = ""): string {
        let keys = ["created", "start", "doctor", "duration", "anamnesis", 
            "medicalExaminationResult", "diagnosis", "recommendations", "scheduledProcedures", "prescriptions"];
        let propFormats = {
            doctor: this.doctor.bind(this),
            anamnesis: paragrathes,
            medicalExaminationResult: paragrathes,
            diagnosis: this.diagnosis.bind(this),
            recommendations: this.procedures.bind(this),
            scheduledProcedures: this.procedures.bind(this),
            prescriptions: this.prescriptions.bind(this),
        };
        let notAlignedKeys = {
            "scheduledProcedures": 1,
            "prescriptions": 1
        };
        return formatObject(ar, keys, notAlignedKeys, propFormats, this._localize["appointmentResult"], offset);
    }

    public duration(n: number): string {
        return n.toString() + " " + this._localize["MINUTE_UNIT"];
    }

    public doctor(d: Doctor, offset: string): string {
        return d.name + " " + d.surname;
    }

    public diagnosis(d: Diagnosis[], offset: string): string {
        if (d.length == 1 && d[0].description.length < 100 && d[0].description.indexOf("\n") < 0)
            return d[0].description + " (cd10: " + d[0].cd10 + ")";

        return d.map((item) =>
            item.description + " (cd10: " + item.cd10 + ")").join("\n\n");
    }

    public procedures(p: Procedure[], offset: string): string {
        let this_ = this;
        return "\n" + p.map((item, i) => offset + (i + 1).toString() + ".\n" + this_.procedure(item, offset)).join("\n");
    }

    public procedure(p: Procedure, offset: string): string {
        let keys = ["created", "title", "services", "type", "required", "status", "period", "strictPeriod",
            "preparations", "requiredPreparations"];
        let propFormats = {
            services: this.services.bind(this),
            type: this.procedureType.bind(this),
            required: this.yesNo.bind(this),
            status: this.procedureExecStatus.bind(this),
            period: this.period.bind(this),
            strictPeriod: this.period.bind(this),
            preparations: paragrathes_nl,
            requiredPreparations: paragrathes_nl,
        };
        let notAlignedKeys = {
            period: 1,
            strictPeriod: 1,
            preparations: 1,
            requiredPreparations: 1
        };
        return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["procedure"], offset);
    }

    public yesNo(b: boolean, offset: string): string {
        return b ? this._localize["YES"] : this._localize["NO"];
    }

    public prescriptions(p: PrescriptionInfo[], offset: string): string {
        return "\n" + p.map(item => this.prescription(item, offset)).join("\n");
    }

    public prescription(p: PrescriptionInfo, offset: string): string {
        return "";
    }

    public services(s: Service[], offset: string): string {
        return "\n" + s.map(item => this.service(item, offset)).join("\n");
    }

    public service(s: Service, offset: string): string {
        return "";
    }

    public procedureType(type: ProcedureType): string {
        return this._localize["procedureType"][type];
    }

    public procedureExecStatus(status: ProcedureExecStatus): string {
        return this ._localize["ProcedureExecStatus"][status];
    }
    public period(period: Period, offset: string): string {
        return "\n" + offset + this ._localize["Period"]["begin"] + " " + dateFormat(period.begin) + "\n" + 
            offset + this ._localize["Period"]["end"] + " " + dateFormat(period.end) + "\n";
    }
    
}