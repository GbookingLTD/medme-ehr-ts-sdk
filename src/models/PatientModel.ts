import { IJsonModel } from "./JsonModel";
import { Gender } from "../types/Gender";
import { MaritalStatus } from "../types/MaritalStatus";
import { FamilyMember } from "../types/FamilyMember";
import { Insurance } from "../types/Insurance";
import { Period } from "../types/Period";

export class PatientModel implements IJsonModel {
    private _id: string;
    private _active: boolean;
    private _surname: string;
    private _name: string;
    private _phones: string;
    private _email: string;
    private _gender: Gender;
    private _birthdate: Date;
    private _deceased: boolean;
    private _maritalStatus: MaritalStatus;
    private _photo: string;
    private _familyMembers: FamilyMember[];
    private _address: string;
    private _medcardNumber: string;
    private _insurances: Insurance[];

    constructor() {}

    public get id(): string { return this._id; }
    public get active(): boolean { return this._active; }
    public get surname(): string { return this._surname; }
    public get name(): string { return this._name; }
    public get phones(): string { return this._phones; }
    public get email(): string { return this._email; }
    public get gender(): Gender { return this._gender; }
    public get birthdate(): Date { return this._birthdate; }
    public get deceased(): boolean { return this._deceased; }
    public get maritalStatus(): MaritalStatus { return this._maritalStatus; }
    public get photo(): string { return this._photo; }
    public get familyMembers(): FamilyMember[] { return this._familyMembers; }
    public get address(): string { return this._address; }
    public get medcardNumber(): string { return this._medcardNumber; }
    public get insurances(): Insurance[] { return this._insurances; }

    public fromJson(json: any) {
        this._id = json.id;
        this._active = json.active;
        this._surname = json.surname;
        this._name = json.name;
        this._phones = json.phones;
        this._email = json.email;
        this._gender = json.gender;
        if (json.birthdate && json.birthdate.length && 
            json.birthdate[json.birthdate.length - 1] !== 'Z')
            json.birthdate += 'Z';
        this._birthdate = new Date(Date.parse(json.birthdate));
        this._deceased = json.deceased;
        this._maritalStatus = json.maritalStatus;
        this._photo = json.photo;
        this._familyMembers = [];
        if (json.familyMembers && json.familyMembers.length) {
            for (let i = 0; i < json.familyMembers.length; ++i) {
                let fm = new FamilyMember();
                fm.patientId = json.familyMembers[i].patientId;
                fm.type = json.familyMembers[i].type;
                this._familyMembers.push(fm);
            }
        }

        this._address = json.address;
        this._medcardNumber = json.medcardNumber;
        this._insurances = [];
        if (json.insurances && json.insurances.length) {
            for (let i = 0; i < json.insurances.length; ++i) {
                let insurance = new Insurance();
                insurance.companyId = json.insurances[i].companyId;
                insurance.period = new Period();
                if (json.insurances[i].period)
                    insurance.period.fromJson(json.insurances[i].period);
                insurance.policyNumber = json.insurances[i].policyNumber;
                this._insurances.push(insurance);
            }
        }
        
    }

    public toJson(): object {
        return this;
    }
}