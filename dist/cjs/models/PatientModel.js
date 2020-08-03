"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FamilyMember_1 = require("../types/FamilyMember");
var Insurance_1 = require("../types/Insurance");
var Period_1 = require("../types/Period");
var PatientModel = /** @class */ (function () {
    function PatientModel() {
    }
    Object.defineProperty(PatientModel.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "active", {
        get: function () { return this._active; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "surname", {
        get: function () { return this._surname; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "phones", {
        get: function () { return this._phones; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "email", {
        get: function () { return this._email; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "gender", {
        get: function () { return this._gender; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "birthdate", {
        get: function () { return this._birthdate; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "deceased", {
        get: function () { return this._deceased; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "maritalStatus", {
        get: function () { return this._maritalStatus; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "photo", {
        get: function () { return this._photo; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "familyMembers", {
        get: function () { return this._familyMembers; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "address", {
        get: function () { return this._address; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "medcardNumber", {
        get: function () { return this._medcardNumber; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatientModel.prototype, "insurances", {
        get: function () { return this._insurances; },
        enumerable: true,
        configurable: true
    });
    PatientModel.prototype.fromJson = function (json) {
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
            for (var i = 0; i < json.familyMembers.length; ++i) {
                var fm = new FamilyMember_1.FamilyMember();
                fm.patientId = json.familyMembers[i].patientId;
                fm.type = json.familyMembers[i].type;
                this._familyMembers.push(fm);
            }
        }
        this._address = json.address;
        this._medcardNumber = json.medcardNumber;
        this._insurances = [];
        if (json.insurances && json.insurances.length) {
            for (var i = 0; i < json.insurances.length; ++i) {
                var insurance = new Insurance_1.Insurance();
                insurance.companyId = json.insurances[i].companyId;
                insurance.period = new Period_1.Period();
                if (json.insurances[i].period)
                    insurance.period.fromJson(json.insurances[i].period);
                insurance.policyNumber = json.insurances[i].policyNumber;
                this._insurances.push(insurance);
            }
        }
    };
    PatientModel.prototype.toJson = function () {
        return this;
    };
    return PatientModel;
}());
exports.PatientModel = PatientModel;
