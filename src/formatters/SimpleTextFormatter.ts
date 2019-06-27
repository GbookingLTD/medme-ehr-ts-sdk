import { AppointmentResultModel } from "../models/AppointmentResultModel";
import { Doctor } from "../types/Doctor";

function alignStrings(obj: object) {
    // find max strings length
    let ml = 0;
    let a = Object.values(obj);
    for (let i = 0; i < a.length; ++i)
        if (ml < a[i].length)
            ml = a[i].length;
    
    // pad_right all strings
    Object.keys(obj).forEach((key) => obj[key] = obj[key].padEnd(ml, " "));
}

function paragrathes(a: string[], offset: string): string {
    if (a.length == 0)
        return "";
    // this is simple string
    if (a.length == 1 && a[0].length < 100 && a[0].indexOf("\n") < 0)
        return a[0];
    return offset + a.join("\n\n");
}

function formatObject(obj: object, keys: string[], propFormats: object, localize: object, offset: string) {
    let ret = "";
    let localizedKeys = keys.reduce((ret, key) => {
        ret[key] = localize[key];
        return ret;
    }, {});
    alignStrings(localizedKeys);
    keys.forEach((key) => {
        if (propFormats[key])
            ret += offset + localizedKeys[key] + " " + propFormats[key](obj[key], offset + "    ") + "\n";
        else
            ret += offset + localizedKeys[key] + " " + obj[key] + "\n";
    });
    ret += "\n";
    return ret;
}

export class SimpleTextFormatter {
    public static LOCALIZE = {
        "ru-ru": {
            "MINUTE_UNIT": "мин.",
            "created": "Дата создания",
            "start": "Дата и время начала",
            "doctor": "Врач",
            "duration": "Длительность",
            "anamnesis": "Анамнез"
        }
    };

    private _localize: object;

    public constructor(localize: object) {
        this._localize = localize;
    }

    public appointmentResult(ar: AppointmentResultModel, offset: string = ""): string {
        let keys = ["created", "start", "doctor", "duration", "anamnesis"];
        let propFormats = {
            doctor: this.doctor.bind(this),
            anamnesis: paragrathes
        };
        return formatObject(ar, keys, propFormats, this._localize, offset);
    }

    public duration(n: number): string {
        return n.toString() + " " + this._localize["MINUTE_UNIT"];
    }

    public doctor(d: Doctor, offset: string): string {
        return d.name + " " + d.surname;
    }
}