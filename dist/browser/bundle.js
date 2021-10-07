var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// see here https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540
// also see here another solution https://stackoverflow.com/questions/42027864/is-there-any-way-to-target-the-plain-javascript-object-type-in-typescript/59647842#59647842
define("json", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/BusinessInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BusinessInfo = void 0;
    var BusinessInfo = /** @class */ (function () {
        function BusinessInfo() {
        }
        BusinessInfo.prototype.fromJson = function (json) {
            this.id = json.id;
            this.name = json.name;
            this.location = json.location;
            this.networkId = json.networkId;
            return this;
        };
        BusinessInfo.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.name = this.name;
            payload.location = this.location;
            payload.networkId = this.networkId;
            return payload;
        };
        return BusinessInfo;
    }());
    exports.BusinessInfo = BusinessInfo;
});
define("types/Specialization", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Specialization = void 0;
    var Specialization = /** @class */ (function () {
        function Specialization() {
        }
        Specialization.prototype.fromJson = function (json) {
            this.id = json.id;
            this.name = json.name;
            return this;
        };
        Specialization.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.name = this.name;
            return payload;
        };
        return Specialization;
    }());
    exports.Specialization = Specialization;
});
define("types/Doctor", ["require", "exports", "types/Specialization"], function (require, exports, Specialization_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Doctor = void 0;
    var Doctor = /** @class */ (function () {
        function Doctor() {
        }
        Doctor.prototype.fromJson = function (json) {
            this.id = json.id;
            this.surname = json.surname;
            this.name = json.name;
            this.specialization = json.specialization
                ? new Specialization_1.Specialization().fromJson(json.specialization)
                : new Specialization_1.Specialization();
            return this;
        };
        Doctor.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.surname = this.surname;
            payload.name = this.name;
            payload.specialization = this.specialization
                ? this.specialization.toJson()
                : null;
            return payload;
        };
        return Doctor;
    }());
    exports.Doctor = Doctor;
});
define("types/Currency", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Currency = void 0;
    var Currency;
    (function (Currency) {
        Currency[Currency["Rur"] = 0] = "Rur";
        Currency[Currency["Usd"] = 1] = "Usd";
    })(Currency = exports.Currency || (exports.Currency = {}));
});
define("types/DiscountType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiscountType = void 0;
    var DiscountType;
    (function (DiscountType) {
        DiscountType[DiscountType["Percent"] = 0] = "Percent";
        DiscountType[DiscountType["Absolute"] = 1] = "Absolute";
    })(DiscountType = exports.DiscountType || (exports.DiscountType = {}));
});
define("types/Discount", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Discount = void 0;
    var Discount = /** @class */ (function () {
        function Discount() {
        }
        Discount.prototype.fromJson = function (json) {
            this.discountType = json.discountType;
            this.discountPercent = json.discountPercent;
            return this;
        };
        Discount.prototype.toJson = function () {
            var payload = {};
            payload.discountType = this.discountType;
            payload.discountPercent = this.discountPercent;
            return payload;
        };
        return Discount;
    }());
    exports.Discount = Discount;
});
define("types/ClientPrice", ["require", "exports", "types/Discount"], function (require, exports, Discount_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClientPrice = void 0;
    var ClientPrice = /** @class */ (function () {
        function ClientPrice() {
            this.discount = new Discount_1.Discount();
        }
        ClientPrice.prototype.fromJson = function (json) {
            this.currency = json.currency;
            this.originValue = json.originValue;
            this.discountValue = json.discountValue;
            this.value = json.value;
            if (json.discount)
                this.discount.fromJson(json.discount);
            return this;
        };
        ClientPrice.prototype.toJson = function () {
            var payload = {};
            payload.currency = this.currency;
            payload.originValue = this.originValue;
            payload.discountValue = this.discountValue;
            payload.value = this.value;
            payload.discount = this.discount ? this.discount.toJson() : null;
            return payload;
        };
        return ClientPrice;
    }());
    exports.ClientPrice = ClientPrice;
});
define("types/Service", ["require", "exports", "types/ClientPrice"], function (require, exports, ClientPrice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Service = void 0;
    var Service = /** @class */ (function () {
        function Service() {
            this.price = new ClientPrice_1.ClientPrice();
        }
        Service.prototype.fromJson = function (json) {
            this.id = json.id;
            this.name = json.name;
            if (json.price)
                this.price.fromJson(json.price);
            this.duration = json.duration;
            return this;
        };
        Service.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.name = this.name;
            payload.price = this.price ? this.price.toJson() : null;
            payload.duration = this.duration;
            return payload;
        };
        return Service;
    }());
    exports.Service = Service;
});
define("types/AppointmentConfirmationStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentConfirmationStatus = void 0;
    var AppointmentConfirmationStatus;
    (function (AppointmentConfirmationStatus) {
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["Tentative"] = 0] = "Tentative";
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["ConfirmedByClient"] = 1] = "ConfirmedByClient";
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["ConfirmedByBusiness"] = 2] = "ConfirmedByBusiness";
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["CancelledByClient"] = 3] = "CancelledByClient";
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["CancelledByBusiness"] = 4] = "CancelledByBusiness";
    })(AppointmentConfirmationStatus = exports.AppointmentConfirmationStatus || (exports.AppointmentConfirmationStatus = {}));
});
define("types/AppointmentSource", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/AppointmentHistoryItem", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentHistoryItem = void 0;
    var AppointmentHistoryItem = /** @class */ (function () {
        function AppointmentHistoryItem() {
        }
        return AppointmentHistoryItem;
    }());
    exports.AppointmentHistoryItem = AppointmentHistoryItem;
});
define("types/AppointmentInputProperties", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentInputProperties = void 0;
    var AppointmentInputProperties = /** @class */ (function () {
        function AppointmentInputProperties() {
        }
        return AppointmentInputProperties;
    }());
    exports.AppointmentInputProperties = AppointmentInputProperties;
});
define("types/Diagnosis", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Diagnosis = void 0;
    var Diagnosis = /** @class */ (function () {
        /**
         * Cоздание объекта "диагноз" из json объекта.
         * @param json json object
         */
        function Diagnosis(json) {
            this.description = json.description;
            this.cd10 = json.cd10;
        }
        Diagnosis.prototype.toJson = function () {
            var payload = {};
            payload.description = this.description;
            payload.cd10 = this.cd10;
            return payload;
        };
        return Diagnosis;
    }());
    exports.Diagnosis = Diagnosis;
});
define("types/ProcedureExecStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProcedureExecStatus = void 0;
    var ProcedureExecStatus;
    (function (ProcedureExecStatus) {
        ProcedureExecStatus[ProcedureExecStatus["Scheduled"] = 0] = "Scheduled";
        ProcedureExecStatus[ProcedureExecStatus["InProgress"] = 1] = "InProgress";
        ProcedureExecStatus[ProcedureExecStatus["Rejected"] = 2] = "Rejected";
        ProcedureExecStatus[ProcedureExecStatus["Completed"] = 3] = "Completed";
    })(ProcedureExecStatus = exports.ProcedureExecStatus || (exports.ProcedureExecStatus = {}));
});
define("types/ProcedureType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProcedureType = void 0;
    var ProcedureType;
    (function (ProcedureType) {
        ProcedureType[ProcedureType["Recomendation"] = 0] = "Recomendation";
        ProcedureType[ProcedureType["Precedure"] = 1] = "Precedure";
        ProcedureType[ProcedureType["Analisys"] = 2] = "Analisys";
    })(ProcedureType = exports.ProcedureType || (exports.ProcedureType = {}));
});
define("types/ProcedureInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProcedureInfo = void 0;
    var ProcedureInfo = /** @class */ (function () {
        /**
         * Создание объекта "информация о процедуре" по объекту json.
         *
         * @param json json object
         */
        function ProcedureInfo(json) {
            this.id = json.id;
            this.title = json.title;
            this.status = json.status;
            this.type = json.type;
            this.required = json.required;
        }
        return ProcedureInfo;
    }());
    exports.ProcedureInfo = ProcedureInfo;
});
define("types/Period", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Period = exports.TextPeriod = void 0;
    var TextPeriod = /** @class */ (function () {
        function TextPeriod() {
        }
        return TextPeriod;
    }());
    exports.TextPeriod = TextPeriod;
    var Period = /** @class */ (function () {
        function Period() {
        }
        Period.prototype.fromJson = function (json) {
            this.begin = new Date(json.begin);
            this.end = new Date(json.end);
            return this;
        };
        Period.prototype.toJson = function () {
            var payload = {};
            payload.begin = this.begin.toJSON();
            payload.end = this.end.toJSON();
            return payload;
        };
        return Period;
    }());
    exports.Period = Period;
});
define("types/Procedure", ["require", "exports", "types/Service", "types/Period"], function (require, exports, Service_1, Period_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Procedure = void 0;
    var Procedure = /** @class */ (function () {
        function Procedure() {
            this.services = [];
            this.period = new Period_1.Period();
            this.strictPeriod = new Period_1.Period();
            this.preparations = [];
            this.requiredPreparations = [];
        }
        Procedure.prototype.fromJson = function (json) {
            this.id = json.id;
            this.created = json.created;
            this.title = json.title;
            this.services = json.services
                ? json.services.map(function (s) { return new Service_1.Service().fromJson(s); })
                : [];
            this.type = json.type;
            this.required = json.required;
            this.status = json.status;
            if (json.period)
                this.period.fromJson(json.period);
            if (json.strictPeriod)
                this.strictPeriod.fromJson(json.strictPeriod);
            this.preparations = json.preparations;
            this.requiredPreparations = json.requiredPreparations;
            this.appointmentResultId = this.appointmentResultId;
            return this;
        };
        Procedure.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.created = this.created.toJSON();
            payload.title = this.title;
            payload.services = this.services
                ? this.services.map(function (s) { return s.toJson(); })
                : [];
            payload.type = this.type;
            payload.required = this.required;
            payload.status = this.status;
            payload.period = this.period.toJson();
            payload.strictPeriod = this.strictPeriod.toJson();
            payload.preparations = this.preparations;
            payload.requiredPreparations = this.requiredPreparations;
            payload.appointmentResultId = this.appointmentResultId;
            return payload;
        };
        return Procedure;
    }());
    exports.Procedure = Procedure;
});
define("types/Gender", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Gender = void 0;
    var Gender;
    (function (Gender) {
        Gender[Gender["Male"] = 1] = "Male";
        Gender[Gender["Fename"] = 2] = "Fename";
        Gender[Gender["Other"] = 3] = "Other";
        Gender[Gender["Unknown"] = 4] = "Unknown";
    })(Gender = exports.Gender || (exports.Gender = {}));
});
define("types/PatientInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatientInfo = void 0;
    var PatientInfo = /** @class */ (function () {
        function PatientInfo() {
        }
        PatientInfo.prototype.fromJson = function (json) {
            this.id = json.id;
            this.surname = json.surname;
            this.name = json.name;
            this.middleName = json.middleName;
            this.phones = json.phones;
            this.email = json.email;
            this.gender = json.gender;
            this.date = json.date;
            this.medcardNumber = json.medcardNumber;
            return this;
        };
        PatientInfo.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.surname = this.surname;
            payload.name = this.name;
            payload.middleName = this.middleName;
            payload.phones = this.phones;
            payload.email = this.email;
            payload.gender = this.gender;
            payload.date = this.date.toJSON();
            payload.medcardNumber = this.medcardNumber;
            return payload;
        };
        return PatientInfo;
    }());
    exports.PatientInfo = PatientInfo;
});
define("types/MedicationForm", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MedicationForm = void 0;
    var MedicationForm;
    (function (MedicationForm) {
        MedicationForm[MedicationForm["Powder"] = 0] = "Powder";
        MedicationForm[MedicationForm["Tablets"] = 1] = "Tablets";
        MedicationForm[MedicationForm["Capsule"] = 2] = "Capsule";
    })(MedicationForm = exports.MedicationForm || (exports.MedicationForm = {}));
});
define("types/Medication", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Medication = void 0;
    var Medication = /** @class */ (function () {
        function Medication() {
        }
        Medication.prototype.fromJson = function (json) {
            this.name = json.name;
            this.code = json.code;
            this.codeTable = json.codeTable;
            this.reference = json.reference;
            this.itemSize = json.itemSize;
            this.dosageText = json.dosageText;
            this.form = json.from;
            this.amount = json.amount;
            this.expirationDate = json.expirationDate;
        };
        Medication.prototype.toJson = function () {
            var payload = {};
            payload.name = this.name;
            payload.code = this.code;
            payload.codeTable = this.codeTable;
            payload.reference = this.reference;
            payload.itemSize = this.itemSize;
            payload.dosageText = this.dosageText;
            payload.form = this.form;
            payload.amount = this.amount;
            payload.expirationDate = this.expirationDate.toJSON();
            return payload;
        };
        return Medication;
    }());
    exports.Medication = Medication;
});
define("types/PrescriptionInfo", ["require", "exports", "types/Doctor", "types/Medication", "types/Period"], function (require, exports, Doctor_1, Medication_1, Period_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrescriptionInfo = void 0;
    var PrescriptionInfo = /** @class */ (function () {
        function PrescriptionInfo() {
        }
        PrescriptionInfo.prototype.fromJson = function (json) {
            this.id = json.id;
            this.created = new Date(json.created);
            if (json.recorderDoctor)
                this.recorderDoctor = new Doctor_1.Doctor().fromJson(json.recorderDoctor);
            this.medications = json.medications
                ? json.medications.map(function (m) { return new Medication_1.Medication().fromJson(m); })
                : [];
            this.dosageText = json.dosageText;
            this.reasonText = json.reasonText;
            this.validityPeriod = json.validityPeriod
                ? new Period_2.Period().fromJson(json.validityPeriod)
                : new Period_2.Period();
            this.numberOfRepeats = json.numberOfRepeats;
            this.title = json.title;
            return this;
        };
        PrescriptionInfo.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.created = this.created.toJSON();
            payload.recorderDoctor = this.recorderDoctor.toJson();
            payload.medications = this.medications
                ? this.medications.map(function (m) { return m.toJson(); })
                : [];
            payload.dosageText = this.dosageText;
            payload.reasonText = this.reasonText;
            payload.validityPeriod = this.validityPeriod.toJson();
            payload.numberOfRepeats = this.numberOfRepeats;
            payload.title = this.title;
            return payload;
        };
        return PrescriptionInfo;
    }());
    exports.PrescriptionInfo = PrescriptionInfo;
});
define("types/PatientInputProperties", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatientInputProperties = void 0;
    var PatientInputProperties = /** @class */ (function () {
        function PatientInputProperties() {
        }
        PatientInputProperties.prototype.fromJson = function (json) {
            this.id = json.id;
            this.surname = json.surname;
            this.name = json.name;
            this.middleName = json.middleName;
            this.phone = json.phone;
            this.email = json.email;
            this.gender = json.gender;
            this.date = json.date;
            return this;
        };
        return PatientInputProperties;
    }());
    exports.PatientInputProperties = PatientInputProperties;
});
define("types/index", ["require", "exports", "types/BusinessInfo", "types/Doctor", "types/Service", "types/AppointmentConfirmationStatus", "types/ClientPrice", "types/AppointmentHistoryItem", "types/AppointmentInputProperties", "types/Currency", "types/Diagnosis", "types/ProcedureExecStatus", "types/ProcedureType", "types/ProcedureInfo", "types/Procedure", "types/PrescriptionInfo", "types/PatientInfo", "types/PatientInputProperties", "types/Medication", "types/Period"], function (require, exports, BusinessInfo_1, Doctor_2, Service_2, AppointmentConfirmationStatus_1, ClientPrice_2, AppointmentHistoryItem_1, AppointmentInputProperties_1, Currency_1, Diagnosis_1, ProcedureExecStatus_1, ProcedureType_1, ProcedureInfo_1, Procedure_1, PrescriptionInfo_1, PatientInfo_1, PatientInputProperties_1, Medication_2, Period_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Period = exports.Medication = exports.PatientInputProperties = exports.PatientInfo = exports.PrescriptionInfo = exports.Procedure = exports.ProcedureInfo = exports.ProcedureType = exports.ProcedureExecStatus = exports.Diagnosis = exports.AppointmentInputProperties = exports.AppointmentHistoryItem = exports.Currency = exports.ClientPrice = exports.AppointmentConfirmationStatus = exports.Service = exports.Doctor = exports.BusinessInfo = void 0;
    Object.defineProperty(exports, "BusinessInfo", { enumerable: true, get: function () { return BusinessInfo_1.BusinessInfo; } });
    Object.defineProperty(exports, "Doctor", { enumerable: true, get: function () { return Doctor_2.Doctor; } });
    Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return Service_2.Service; } });
    Object.defineProperty(exports, "AppointmentConfirmationStatus", { enumerable: true, get: function () { return AppointmentConfirmationStatus_1.AppointmentConfirmationStatus; } });
    Object.defineProperty(exports, "ClientPrice", { enumerable: true, get: function () { return ClientPrice_2.ClientPrice; } });
    Object.defineProperty(exports, "AppointmentHistoryItem", { enumerable: true, get: function () { return AppointmentHistoryItem_1.AppointmentHistoryItem; } });
    Object.defineProperty(exports, "AppointmentInputProperties", { enumerable: true, get: function () { return AppointmentInputProperties_1.AppointmentInputProperties; } });
    Object.defineProperty(exports, "Currency", { enumerable: true, get: function () { return Currency_1.Currency; } });
    Object.defineProperty(exports, "Diagnosis", { enumerable: true, get: function () { return Diagnosis_1.Diagnosis; } });
    Object.defineProperty(exports, "ProcedureExecStatus", { enumerable: true, get: function () { return ProcedureExecStatus_1.ProcedureExecStatus; } });
    Object.defineProperty(exports, "ProcedureType", { enumerable: true, get: function () { return ProcedureType_1.ProcedureType; } });
    Object.defineProperty(exports, "ProcedureInfo", { enumerable: true, get: function () { return ProcedureInfo_1.ProcedureInfo; } });
    Object.defineProperty(exports, "Procedure", { enumerable: true, get: function () { return Procedure_1.Procedure; } });
    Object.defineProperty(exports, "PrescriptionInfo", { enumerable: true, get: function () { return PrescriptionInfo_1.PrescriptionInfo; } });
    Object.defineProperty(exports, "PatientInfo", { enumerable: true, get: function () { return PatientInfo_1.PatientInfo; } });
    Object.defineProperty(exports, "PatientInputProperties", { enumerable: true, get: function () { return PatientInputProperties_1.PatientInputProperties; } });
    Object.defineProperty(exports, "Medication", { enumerable: true, get: function () { return Medication_2.Medication; } });
    Object.defineProperty(exports, "Period", { enumerable: true, get: function () { return Period_3.Period; } });
});
define("services/ResourceService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("messages/AppointmentMessage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentMessage = void 0;
    var AppointmentMessage = /** @class */ (function () {
        function AppointmentMessage() {
        }
        return AppointmentMessage;
    }());
    exports.AppointmentMessage = AppointmentMessage;
});
define("formatters/l10n/ru-ru", ["require", "exports"], function (require, exports) {
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
            medications: "Список лекарств",
            dosageText: "Список лекарств",
            reasonText: "Причина назначения",
            validityPeriod: "Время, в течение которого рецепт действует",
            numberOfRepeats: "Сколько раз по этому рецепту можно получить лекарства",
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
            PrescriptionByCreated: "Дата создания",
            PrescriptionByBusiness: "ЛПУ",
        },
    };
});
define("formatters/l10n/en-us", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        MINUTE_UNIT: "min",
        YES: "Yes",
        NO: "No",
        CREATED: "Creation date",
        appointmentResult: {
            created: "Created",
            start: "Date and time of creation",
            doctor: "Doctor",
            duration: "Duration",
            anamnesis: "Anamnesis",
            medicalExaminationResult: "Examination results",
            diagnosis: "Diagnosis",
            recommendations: "Recommendations",
            scheduledProcedures: "Procedures, medical examinations and lab tests prescribed during the doctor visit",
            prescriptions: "Medicines (prescription drugs)",
        },
        procedure: {
            created: "Created",
            title: "Title",
            services: "Services",
            type: "Type",
            required: "Required",
            status: "Status",
            period: "Expected period of service execution",
            strictPeriod: "Strict service execution period",
            preparations: "Desired preparations for the procedure",
            requiredPreparations: "Required preparations for the procedure",
        },
        procedureType: ["Recommendation", "Procedure", "Lab tests"],
        ProcedureExecStatus: ["Planned", "In progress", "Cancelled", "Complete"],
        Period: {
            begin: "Start date",
            end: "End date",
        },
        DiagnosticReport: {
            Doctor: "Doctor",
            EffectivePeriod: "Medical data effective period",
            Result: "Results",
            Images: "Images",
            Attachments: "Documents",
        },
        Prescription: {
            title: "Drug name",
            created: "Date created",
            recorderDoctor: "The doctor who wrote out this prescription",
            medications: "Drug list",
            dosageText: "Dosage",
            reasonText: "Prescription reason",
            validityPeriod: "Prescription validity period",
            numberOfRepeats: "How many times can you get your prescription drugs",
        },
        MedicationForm: {
            0: "Powder",
            1: "Pills",
            2: "Capsules",
        },
    };
});
define("formatters/LocaleCode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LocaleCode = void 0;
    var LocaleCode;
    (function (LocaleCode) {
        LocaleCode["ruRU"] = "ru-ru";
        LocaleCode["enUS"] = "en-us";
    })(LocaleCode = exports.LocaleCode || (exports.LocaleCode = {}));
});
define("formatters/l10n/index", ["require", "exports", "formatters/l10n/ru-ru", "formatters/l10n/en-us"], function (require, exports, ru_ru_1, en_us_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        ruRU: ru_ru_1.default,
        enUS: en_us_1.default,
        getByLocaleCode: function (locale) {
            return {
                "ru-ru": ru_ru_1.default,
                "en-us": en_us_1.default,
            }[locale];
        },
    };
});
define("services/filters/FilterTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilterKeys = exports.FilterTypeEnum = void 0;
    var FilterTypeEnum;
    (function (FilterTypeEnum) {
        FilterTypeEnum[FilterTypeEnum["Unknown"] = 0] = "Unknown";
        FilterTypeEnum[FilterTypeEnum["PatientByMedCard"] = 1] = "PatientByMedCard";
        FilterTypeEnum[FilterTypeEnum["PatientByName"] = 2] = "PatientByName";
        FilterTypeEnum[FilterTypeEnum["PatientByPhone"] = 3] = "PatientByPhone";
        FilterTypeEnum[FilterTypeEnum["AppointmentByPatientId"] = 10] = "AppointmentByPatientId";
        FilterTypeEnum[FilterTypeEnum["AppointmentByCreated"] = 11] = "AppointmentByCreated";
        FilterTypeEnum[FilterTypeEnum["AppointmentByStarted"] = 12] = "AppointmentByStarted";
        FilterTypeEnum[FilterTypeEnum["AppointmentByBusiness"] = 13] = "AppointmentByBusiness";
        FilterTypeEnum[FilterTypeEnum["DiagnosticReportByPatientId"] = 20] = "DiagnosticReportByPatientId";
        FilterTypeEnum[FilterTypeEnum["DiagnosticReportByCreated"] = 21] = "DiagnosticReportByCreated";
        FilterTypeEnum[FilterTypeEnum["DiagnosticReportByBusiness"] = 22] = "DiagnosticReportByBusiness";
        FilterTypeEnum[FilterTypeEnum["PrescriptionByPatient"] = 30] = "PrescriptionByPatient";
        FilterTypeEnum[FilterTypeEnum["PrescriptionByCreated"] = 31] = "PrescriptionByCreated";
        FilterTypeEnum[FilterTypeEnum["PrescriptionByBusiness"] = 32] = "PrescriptionByBusiness";
    })(FilterTypeEnum = exports.FilterTypeEnum || (exports.FilterTypeEnum = {}));
    exports.FilterKeys = (_a = {},
        _a[FilterTypeEnum.Unknown] = "Unknown",
        _a[FilterTypeEnum.PatientByMedCard] = "PatientByMedCard",
        _a[FilterTypeEnum.PatientByName] = "PatientByName",
        _a[FilterTypeEnum.PatientByPhone] = "PatientByPhone",
        _a[FilterTypeEnum.AppointmentByPatientId] = "AppointmentByPatientId",
        _a[FilterTypeEnum.AppointmentByCreated] = "AppointmentByCreated",
        _a[FilterTypeEnum.AppointmentByStarted] = "AppointmentByStarted",
        _a[FilterTypeEnum.AppointmentByBusiness] = "AppointmentByBusiness",
        _a[FilterTypeEnum.DiagnosticReportByPatientId] = "DiagnosticReportByPatient",
        _a[FilterTypeEnum.DiagnosticReportByCreated] = "DiagnosticReportByCreated",
        _a[FilterTypeEnum.DiagnosticReportByBusiness] = "DiagnosticReportByBusiness",
        _a[FilterTypeEnum.PrescriptionByPatient] = "PrescriptionByPatient",
        _a[FilterTypeEnum.PrescriptionByCreated] = "PrescriptionByCreated",
        _a[FilterTypeEnum.PrescriptionByBusiness] = "PrescriptionByBusiness",
        _a);
});
define("services/filters/Filters", ["require", "exports", "services/filters/FilterTypes"], function (require, exports, FilterTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Filter = exports.FilterList = void 0;
    var FilterList = /** @class */ (function () {
        function FilterList() {
        }
        FilterList.prototype.isEmpty = function () {
            return this.getFilters().find(function (item) { return !item.isEmpty(); }) == null;
        };
        FilterList.prototype.getFilledFilters = function () {
            return this.getFilters().filter(function (item) { return !item.isEmpty(); });
        };
        return FilterList;
    }());
    exports.FilterList = FilterList;
    var Filter = /** @class */ (function () {
        function Filter(localize) {
            this.localize = localize;
        }
        Object.defineProperty(Filter.prototype, "key", {
            get: function () {
                return FilterTypes_1.FilterKeys[this.kind];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Filter.prototype, "title", {
            get: function () {
                return this.localize[this.key];
            },
            enumerable: false,
            configurable: true
        });
        return Filter;
    }());
    exports.Filter = Filter;
});
define("services/filters/DatePeriodFilter", ["require", "exports", "services/filters/Filters", "services/filters/AppointmentFilters"], function (require, exports, Filters_1, AppointmentFilters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatePeriodFilter = void 0;
    var DatePeriodFilter = /** @class */ (function (_super) {
        __extends(DatePeriodFilter, _super);
        function DatePeriodFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(DatePeriodFilter.prototype, "prettyValue", {
            get: function () {
                return (new Intl.DateTimeFormat("ru").format(this.from) +
                    " — " +
                    new Intl.DateTimeFormat("ru").format(this.to));
            },
            enumerable: false,
            configurable: true
        });
        DatePeriodFilter.prototype.setup = function (val) {
            this.from = (val === null || val === void 0 ? void 0 : val.from) ? new Date(Date.parse(val.from)) : null;
            this.to = (val === null || val === void 0 ? void 0 : val.to) ? new Date(Date.parse(val.to)) : null;
        };
        DatePeriodFilter.prototype.plain = function () {
            return {
                from: this.from ? this.from.toISOString() : "",
                to: this.to ? this.to.toISOString() : "",
            };
        };
        DatePeriodFilter.prototype.isEmpty = function () {
            return AppointmentFilters_1.isNullUndefZero(this.from) && AppointmentFilters_1.isNullUndefZero(this.to);
        };
        return DatePeriodFilter;
    }(Filters_1.Filter));
    exports.DatePeriodFilter = DatePeriodFilter;
});
define("services/filters/AppointmentFilters", ["require", "exports", "formatters/l10n/index", "services/filters/DatePeriodFilter", "services/filters/Filters", "services/filters/FilterTypes"], function (require, exports, index_1, DatePeriodFilter_1, Filters_2, FilterTypes_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentFilters = exports.AppointmentByPatientIdFilter = exports.AppointmentByStartFilter = exports.AppointmentByCreatedFilter = exports.AppointmentByBusinessIdFilter = exports.isNullUndefZero = void 0;
    function isNullUndefEmpty(val) {
        return val == undefined || val == null || val == "";
    }
    function isNullUndef(val) {
        return val == null || val == undefined;
    }
    function isNullUndefZero(val) {
        return val == null || val == undefined || val.getTime() == 0;
    }
    exports.isNullUndefZero = isNullUndefZero;
    var AppointmentByBusinessIdFilter = /** @class */ (function (_super) {
        __extends(AppointmentByBusinessIdFilter, _super);
        function AppointmentByBusinessIdFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.businessId = "";
            _this.businessName = "";
            return _this;
        }
        Object.defineProperty(AppointmentByBusinessIdFilter.prototype, "prettyValue", {
            get: function () {
                return this.businessName;
            },
            enumerable: false,
            configurable: true
        });
        AppointmentByBusinessIdFilter.prototype.setup = function (val) {
            this.businessId = (val === null || val === void 0 ? void 0 : val.businessId) || "";
            this.businessName = (val === null || val === void 0 ? void 0 : val.businessName) || "";
        };
        AppointmentByBusinessIdFilter.prototype.plain = function () {
            return { businessId: this.businessId, businessName: this.businessName };
        };
        Object.defineProperty(AppointmentByBusinessIdFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_2.FilterTypeEnum.AppointmentByBusiness;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentByBusinessIdFilter.prototype, "key", {
            get: function () {
                return FilterTypes_2.FilterKeys[this.kind];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentByBusinessIdFilter.prototype, "title", {
            get: function () {
                return this.localize[this.key];
            },
            enumerable: false,
            configurable: true
        });
        AppointmentByBusinessIdFilter.prototype.isEmpty = function () {
            return isNullUndefEmpty(this.businessId);
        };
        return AppointmentByBusinessIdFilter;
    }(Filters_2.Filter));
    exports.AppointmentByBusinessIdFilter = AppointmentByBusinessIdFilter;
    var AppointmentByCreatedFilter = /** @class */ (function (_super) {
        __extends(AppointmentByCreatedFilter, _super);
        function AppointmentByCreatedFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(AppointmentByCreatedFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_2.FilterTypeEnum.AppointmentByCreated;
            },
            enumerable: false,
            configurable: true
        });
        return AppointmentByCreatedFilter;
    }(DatePeriodFilter_1.DatePeriodFilter));
    exports.AppointmentByCreatedFilter = AppointmentByCreatedFilter;
    var AppointmentByStartFilter = /** @class */ (function (_super) {
        __extends(AppointmentByStartFilter, _super);
        function AppointmentByStartFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(AppointmentByStartFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_2.FilterTypeEnum.AppointmentByStarted;
            },
            enumerable: false,
            configurable: true
        });
        return AppointmentByStartFilter;
    }(DatePeriodFilter_1.DatePeriodFilter));
    exports.AppointmentByStartFilter = AppointmentByStartFilter;
    var AppointmentByPatientIdFilter = /** @class */ (function (_super) {
        __extends(AppointmentByPatientIdFilter, _super);
        function AppointmentByPatientIdFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.patientId = "";
            return _this;
        }
        Object.defineProperty(AppointmentByPatientIdFilter.prototype, "prettyValue", {
            get: function () {
                return this.patientId;
            },
            enumerable: false,
            configurable: true
        });
        AppointmentByPatientIdFilter.prototype.setup = function (val) {
            this.patientId = (val === null || val === void 0 ? void 0 : val.patientId) || "";
        };
        AppointmentByPatientIdFilter.prototype.plain = function () {
            return { patientId: this.patientId };
        };
        Object.defineProperty(AppointmentByPatientIdFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_2.FilterTypeEnum.AppointmentByPatientId;
            },
            enumerable: false,
            configurable: true
        });
        AppointmentByPatientIdFilter.prototype.isEmpty = function () {
            return isNullUndefEmpty(this.patientId);
        };
        return AppointmentByPatientIdFilter;
    }(Filters_2.Filter));
    exports.AppointmentByPatientIdFilter = AppointmentByPatientIdFilter;
    var AppointmentFilters = /** @class */ (function (_super) {
        __extends(AppointmentFilters, _super);
        function AppointmentFilters(localize) {
            var _this = _super.call(this) || this;
            _this.byBusinessId = new AppointmentByBusinessIdFilter(localize);
            _this.byCreated = new AppointmentByCreatedFilter(localize);
            _this.byPatientId = new AppointmentByPatientIdFilter(localize);
            _this.byStart = new AppointmentByStartFilter(localize);
            return _this;
        }
        AppointmentFilters.createWithLocale = function (locale) {
            return new AppointmentFilters(index_1.default.getByLocaleCode(locale)["filters"]);
        };
        AppointmentFilters.prototype.setup = function (val) {
            if (isNullUndef(val))
                return;
            this.byBusinessId.setup(val["byBusines"]);
            this.byCreated.setup(val["byCreated"]);
            this.byStart.setup(val["byStart"]);
            this.byPatientId.setup(val["byPatient"]);
        };
        AppointmentFilters.prototype.plain = function () {
            return {
                byBusiness: this.byBusinessId.plain(),
                byCreated: this.byCreated.plain(),
                byStart: this.byStart.plain(),
                byPatient: this.byPatientId.plain(),
            };
        };
        AppointmentFilters.prototype.getFilters = function () {
            return [this.byBusinessId, this.byCreated, this.byStart, this.byPatientId];
        };
        return AppointmentFilters;
    }(Filters_2.FilterList));
    exports.AppointmentFilters = AppointmentFilters;
});
define("services/AppointmentService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("models/JsonModel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("models/AppointmentModel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentModel = exports.copyCommonPropertiesFromJson = void 0;
    function copyCommonPropertiesFromJson(json) {
        this._id = json.id;
        this._patientId = json.patientId;
        if (json.business)
            this._business = json.business;
        this._created = json.created;
        this._start = json.start;
        if (json.doctor)
            this._doctor = json.doctor;
    }
    exports.copyCommonPropertiesFromJson = copyCommonPropertiesFromJson;
    /**
     * Класс модели записи.
     * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
     */
    var AppointmentModel = /** @class */ (function () {
        function AppointmentModel() {
        }
        Object.defineProperty(AppointmentModel.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "patientId", {
            get: function () {
                return this._patientId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "business", {
            get: function () {
                return this._business;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "created", {
            get: function () {
                return this._created;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "start", {
            get: function () {
                return this._start;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "doctor", {
            get: function () {
                return this._doctor;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "services", {
            get: function () {
                return this._services;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "duration", {
            get: function () {
                return this._duration;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "confirmationStatus", {
            get: function () {
                return this._confirmationStatus;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "clientAppear", {
            get: function () {
                return this._clientAppear;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "resultId", {
            get: function () {
                return this._resultId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "clientPrice", {
            get: function () {
                return this._clientPrice;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "source", {
            get: function () {
                return this._source;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "history", {
            get: function () {
                return this._history;
            },
            enumerable: false,
            configurable: true
        });
        /**
         *
         * @param json
         */
        AppointmentModel.prototype.fromJson = function (json) {
            copyCommonPropertiesFromJson.call(this, json);
            this._services = json.services;
            this._duration = json.duration;
            this._confirmationStatus = json.confirmationStatus;
            this._clientAppear = json.clientAppear;
            this._resultId = json.resultId;
            this._clientPrice = json.clientPrice;
            this._confirmationStatus = json.status;
            this._source = json.source;
            this._history = json.history;
        };
        /**
         *
         */
        AppointmentModel.prototype.toJson = function () {
            var payload = {
                id: this._id,
                patientId: this._patientId,
            };
            payload.business = this._business.toJson();
            payload.created = this._created.toJSON();
            payload.start = this._start.toJSON();
            payload.doctor = this._doctor.toJson();
            payload.services = Array.isArray(this._services)
                ? this._services.map(function (s) { return s.toJson(); })
                : null;
            payload.duration = this._duration;
            payload.status = this._confirmationStatus;
            payload.clientAppear = this._clientAppear;
            payload.resultId = this._resultId;
            payload.clientPrice = this._clientPrice.toJson();
            payload.source = this._source;
            return payload;
        };
        AppointmentModel.prototype.toJSON = function () {
            return this.toJson();
        };
        AppointmentModel.prototype.toString = function () {
            return JSON.stringify(this.toJson());
        };
        return AppointmentModel;
    }());
    exports.AppointmentModel = AppointmentModel;
});
define("models/index", ["require", "exports", "models/AppointmentModel"], function (require, exports, AppointmentModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        AppointmentModel: AppointmentModel_1.AppointmentModel,
    };
});
define("types/MaritalStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MaritalStatus = void 0;
    var MaritalStatus;
    (function (MaritalStatus) {
        MaritalStatus[MaritalStatus["Divorced"] = 1] = "Divorced";
        MaritalStatus[MaritalStatus["Married"] = 2] = "Married";
        MaritalStatus[MaritalStatus["NeverMarried"] = 3] = "NeverMarried";
        MaritalStatus[MaritalStatus["Unmarried"] = 4] = "Unmarried";
        MaritalStatus[MaritalStatus["Widowed"] = 5] = "Widowed";
        MaritalStatus[MaritalStatus["Unknown"] = 6] = "Unknown";
    })(MaritalStatus = exports.MaritalStatus || (exports.MaritalStatus = {}));
});
define("types/FamilyMember", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FamilyMember = exports.FamilyMemberType = void 0;
    var FamilyMemberType;
    (function (FamilyMemberType) {
        FamilyMemberType[FamilyMemberType["FamilyMember"] = 1] = "FamilyMember";
        FamilyMemberType[FamilyMemberType["Child"] = 2] = "Child";
        FamilyMemberType[FamilyMemberType["AdoptedChild"] = 3] = "AdoptedChild";
        FamilyMemberType[FamilyMemberType["Parent"] = 4] = "Parent";
        FamilyMemberType[FamilyMemberType["AdoptiveParent"] = 5] = "AdoptiveParent";
        FamilyMemberType[FamilyMemberType["Husband"] = 6] = "Husband";
        FamilyMemberType[FamilyMemberType["Wife"] = 7] = "Wife";
        FamilyMemberType[FamilyMemberType["Brother"] = 8] = "Brother";
        FamilyMemberType[FamilyMemberType["Sister"] = 9] = "Sister";
        FamilyMemberType[FamilyMemberType["ExtendedFamilyMember"] = 10] = "ExtendedFamilyMember";
    })(FamilyMemberType = exports.FamilyMemberType || (exports.FamilyMemberType = {}));
    var FamilyMember = /** @class */ (function () {
        function FamilyMember() {
        }
        return FamilyMember;
    }());
    exports.FamilyMember = FamilyMember;
});
define("types/Insurance", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Insurance = void 0;
    var Insurance = /** @class */ (function () {
        function Insurance() {
        }
        return Insurance;
    }());
    exports.Insurance = Insurance;
});
define("models/PatientModel", ["require", "exports", "types/FamilyMember", "types/Insurance", "types/Period"], function (require, exports, FamilyMember_1, Insurance_1, Period_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatientModel = void 0;
    var PatientModel = /** @class */ (function () {
        function PatientModel() {
        }
        Object.defineProperty(PatientModel.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "active", {
            get: function () {
                return this._active;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "surname", {
            get: function () {
                return this._surname;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "phones", {
            get: function () {
                return this._phones;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "email", {
            get: function () {
                return this._email;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "gender", {
            get: function () {
                return this._gender;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "birthdate", {
            get: function () {
                return this._birthdate;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "deceased", {
            get: function () {
                return this._deceased;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "maritalStatus", {
            get: function () {
                return this._maritalStatus;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "photo", {
            get: function () {
                return this._photo;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "familyMembers", {
            get: function () {
                return this._familyMembers;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "address", {
            get: function () {
                return this._address;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "medcardNumber", {
            get: function () {
                return this._medcardNumber;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientModel.prototype, "insurances", {
            get: function () {
                return this._insurances;
            },
            enumerable: false,
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
            if (json.birthdate &&
                json.birthdate.length &&
                json.birthdate[json.birthdate.length - 1] !== "Z")
                json.birthdate += "Z";
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
                    insurance.period = new Period_4.Period();
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
});
define("types/UserSign", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("messages/PatientMessage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatientMessage = void 0;
    var PatientMessage = /** @class */ (function () {
        function PatientMessage() {
        }
        return PatientMessage;
    }());
    exports.PatientMessage = PatientMessage;
});
define("services/filters/PatientFilters", ["require", "exports", "formatters/l10n/index", "services/filters/Filters", "services/filters/FilterTypes"], function (require, exports, index_2, Filters_3, FilterTypes_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatientFilters = exports.PatientByPhoneFilter = exports.PatientByMedCardFilter = exports.PatientByNameFilter = void 0;
    function isNullUndefEmpty(val) {
        return val == undefined || val == null || val == "";
    }
    function isNullUndef(val) {
        return val == null || val == undefined;
    }
    var PatientByNameFilter = /** @class */ (function (_super) {
        __extends(PatientByNameFilter, _super);
        function PatientByNameFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = "";
            return _this;
        }
        Object.defineProperty(PatientByNameFilter.prototype, "prettyValue", {
            get: function () {
                return this.name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientByNameFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_3.FilterTypeEnum.PatientByName;
            },
            enumerable: false,
            configurable: true
        });
        PatientByNameFilter.prototype.isEmpty = function () {
            return isNullUndefEmpty(this.name);
        };
        PatientByNameFilter.prototype.setup = function (val) {
            this.name = (val === null || val === void 0 ? void 0 : val.name) || "";
        };
        PatientByNameFilter.prototype.plain = function () {
            return { name: this.name };
        };
        return PatientByNameFilter;
    }(Filters_3.Filter));
    exports.PatientByNameFilter = PatientByNameFilter;
    var PatientByMedCardFilter = /** @class */ (function (_super) {
        __extends(PatientByMedCardFilter, _super);
        function PatientByMedCardFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.medCardId = "";
            return _this;
        }
        Object.defineProperty(PatientByMedCardFilter.prototype, "prettyValue", {
            get: function () {
                return this.medCardId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientByMedCardFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_3.FilterTypeEnum.PatientByMedCard;
            },
            enumerable: false,
            configurable: true
        });
        PatientByMedCardFilter.prototype.isEmpty = function () {
            return isNullUndefEmpty(this.medCardId);
        };
        PatientByMedCardFilter.prototype.setup = function (val) {
            this.medCardId = (val === null || val === void 0 ? void 0 : val.medCardId) || "";
        };
        PatientByMedCardFilter.prototype.plain = function () {
            return { medCardId: this.medCardId };
        };
        return PatientByMedCardFilter;
    }(Filters_3.Filter));
    exports.PatientByMedCardFilter = PatientByMedCardFilter;
    var PatientByPhoneFilter = /** @class */ (function (_super) {
        __extends(PatientByPhoneFilter, _super);
        function PatientByPhoneFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.phone = "";
            return _this;
        }
        Object.defineProperty(PatientByPhoneFilter.prototype, "prettyValue", {
            get: function () {
                return this.phone;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatientByPhoneFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_3.FilterTypeEnum.PatientByPhone;
            },
            enumerable: false,
            configurable: true
        });
        PatientByPhoneFilter.prototype.isEmpty = function () {
            return isNullUndefEmpty(this.phone);
        };
        PatientByPhoneFilter.prototype.setup = function (val) {
            this.phone = (val === null || val === void 0 ? void 0 : val.phone) || "";
        };
        PatientByPhoneFilter.prototype.plain = function () {
            return { phone: this.phone };
        };
        return PatientByPhoneFilter;
    }(Filters_3.Filter));
    exports.PatientByPhoneFilter = PatientByPhoneFilter;
    var PatientFilters = /** @class */ (function (_super) {
        __extends(PatientFilters, _super);
        function PatientFilters(localize) {
            var _this = _super.call(this) || this;
            _this.byMedCard = new PatientByMedCardFilter(localize);
            _this.byName = new PatientByNameFilter(localize);
            _this.byPhone = new PatientByPhoneFilter(localize);
            return _this;
        }
        PatientFilters.createWithLocale = function (locale) {
            return new PatientFilters(index_2.default.getByLocaleCode(locale)["filters"]);
        };
        PatientFilters.prototype.getFilters = function () {
            return [this.byName, this.byMedCard, this.byPhone];
        };
        PatientFilters.prototype.setup = function (val) {
            if (isNullUndef(val))
                return;
            this.byName.setup(val["byName"]);
            this.byMedCard.setup(val["byMedCard"]);
            this.byPhone.setup(val["byPhone"]);
        };
        PatientFilters.prototype.plain = function () {
            return {
                byName: this.byName.plain(),
                byMedCard: this.byMedCard.plain(),
                byPhone: this.byPhone.plain(),
            };
        };
        return PatientFilters;
    }(Filters_3.FilterList));
    exports.PatientFilters = PatientFilters;
});
define("services/PatientService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/RpcErrorCodes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAuthorizationError = exports.RpcErrorCodes = void 0;
    var RpcErrorCodes = /** @class */ (function () {
        function RpcErrorCodes() {
        }
        RpcErrorCodes.ParseError = -32700;
        RpcErrorCodes.InvalidRequest = -32600;
        RpcErrorCodes.MethodNotFound = -32601;
        RpcErrorCodes.InvalidParams = -32602;
        RpcErrorCodes.UnknownError = -32603;
        RpcErrorCodes.NotAuthorized = -33000;
        RpcErrorCodes.AuthExpired = -33001;
        RpcErrorCodes.UnknownAuthError = -33002;
        RpcErrorCodes.AccessForbidden = -33403;
        RpcErrorCodes.PatientAlreadyMatched = -34000;
        RpcErrorCodes.PatientNotAuthenticated = -34001;
        RpcErrorCodes.PatientNotFound = -34002;
        RpcErrorCodes.SaveAuthInfoError = -34003;
        RpcErrorCodes.SaveExchangeTokenError = -34004;
        RpcErrorCodes.AppointmentNotFound = -34005;
        RpcErrorCodes.DiagnosticReportNotFound = -34006;
        RpcErrorCodes.UserNotFound = -34007;
        RpcErrorCodes.PrescriptionNotFound = -34008;
        RpcErrorCodes.PatientAlreadyLinked = -34009;
        RpcErrorCodes.AppointmentResultNotFound = -34010;
        RpcErrorCodes.LinkedPatientNotFound = -34011;
        return RpcErrorCodes;
    }());
    exports.RpcErrorCodes = RpcErrorCodes;
    function isAuthorizationError(err) {
        return (err.code === RpcErrorCodes.NotAuthorized ||
            err.code === RpcErrorCodes.AuthExpired ||
            err.code === RpcErrorCodes.UnknownAuthError);
    }
    exports.isAuthorizationError = isAuthorizationError;
});
define("services/AuthService", ["require", "exports", "services/RpcErrorCodes"], function (require, exports, RpcErrorCodes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAuthenticatedPatientByExchangeToken = exports.getAuthenticatedPatient = exports.ConnectionError = exports.PatientAuthenticationError = exports.PatientAuthenticationStep = exports.PatientAuthenticationResult = exports.AuthInfo = exports.ExchangeTokenResponse = void 0;
    var ExchangeTokenResponse = /** @class */ (function () {
        function ExchangeTokenResponse() {
        }
        return ExchangeTokenResponse;
    }());
    exports.ExchangeTokenResponse = ExchangeTokenResponse;
    var AuthInfo = /** @class */ (function () {
        function AuthInfo() {
        }
        return AuthInfo;
    }());
    exports.AuthInfo = AuthInfo;
    var PatientAuthenticationResult = /** @class */ (function () {
        function PatientAuthenticationResult() {
            this.patientAuthenticated = false;
            this.patientFound = false;
            this.patient = null;
            this.userSign = null;
        }
        return PatientAuthenticationResult;
    }());
    exports.PatientAuthenticationResult = PatientAuthenticationResult;
    /**
     * Перечисление шагов сценария аутентификации пациента.
     */
    var PatientAuthenticationStep;
    (function (PatientAuthenticationStep) {
        PatientAuthenticationStep[PatientAuthenticationStep["patient"] = 1] = "patient";
        PatientAuthenticationStep[PatientAuthenticationStep["exchangeToken"] = 2] = "exchangeToken";
        PatientAuthenticationStep[PatientAuthenticationStep["input"] = 3] = "input";
        PatientAuthenticationStep[PatientAuthenticationStep["authenticate"] = 4] = "authenticate";
    })(PatientAuthenticationStep = exports.PatientAuthenticationStep || (exports.PatientAuthenticationStep = {}));
    /**
     * Ошибка сценария аутентификации пациента.
     * Инкапсулирует внутри себя ошибку запроса, предоставляет информацию о типе ошибки и
     * информацию о шаге сценария аутентификации, на котором произошла ошибка.
     */
    var PatientAuthenticationError = /** @class */ (function (_super) {
        __extends(PatientAuthenticationError, _super);
        function PatientAuthenticationError(aStep, anInternalError) {
            var _this = _super.call(this, "Patient authentication error") || this;
            _this.step = aStep;
            _this.internalError = anInternalError;
            return _this;
        }
        PatientAuthenticationError.isAuthorizationError = function (err) {
            return err.internalError && RpcErrorCodes_1.isAuthorizationError(err.internalError);
        };
        PatientAuthenticationError.isAuthenticationError = function (err) {
            return (err.step === PatientAuthenticationStep.authenticate &&
                err.internalError.code === RpcErrorCodes_1.RpcErrorCodes.PatientNotAuthenticated);
        };
        PatientAuthenticationError.isConnectionError = function (err) {
            return err.internalError && err.internalError instanceof ConnectionError;
        };
        PatientAuthenticationError.isEhrServerDisabled = function (err) {
            return (err.step === PatientAuthenticationStep.patient &&
                this.isConnectionError(err));
        };
        PatientAuthenticationError.patientAlreadyMatched = function (err) {
            return (err.step === PatientAuthenticationStep.authenticate &&
                err.internalError.code === RpcErrorCodes_1.RpcErrorCodes.PatientAlreadyMatched);
        };
        PatientAuthenticationError.patientAlreadyLinked = function (err) {
            return (err.step === PatientAuthenticationStep.authenticate &&
                err.internalError.code === RpcErrorCodes_1.RpcErrorCodes.PatientAlreadyLinked);
        };
        return PatientAuthenticationError;
    }(Error));
    exports.PatientAuthenticationError = PatientAuthenticationError;
    var ConnectionError = /** @class */ (function (_super) {
        __extends(ConnectionError, _super);
        function ConnectionError() {
            var _newTarget = this.constructor;
            var _this = _super.call(this, "Connection cannot be established") || this;
            // https://github.com/Microsoft/TypeScript/issues/13965
            _this.__proto__ = _newTarget.prototype;
            return _this;
        }
        return ConnectionError;
    }(Error));
    exports.ConnectionError = ConnectionError;
    /**
     * Функция, реализующая сценарий проверки аутентификации при заходе пользователя в Мед.карту.
     *
     * 1. Запрос на получение данных пациента.
     * 2.1. Если запрос с текущими креденшиалами завершился успешно, возвращаем результат (+статус, что пациент получен стазу)
     * 2.2. Если запрос с текущими креденшиалами завершился ошибкой "пользователь не аутентифицирован", то переходим на п.3
     * 3. Отправляем запрос на обмен токенов на сервер авторизации
     * 4. Получаем через форму ввода от пользователя его аутентификационные данные
     * 5. Выполняем запрос на аутентификацию на EHR сервер. Если запрос завершился успешно, возвращаем результат
     *   (+статус, что пациента аутентифицировали)
     *
     * @param {IPatientService} patientService
     * @param {IAuthService} authService
     * @param {function} patientInput
     * @param {function} cb
     */
    function getAuthenticatedPatient(patientService, authService, patientInput, cb) {
        patientService.getPatient(function (err, patient, userSign) {
            if (err && RpcErrorCodes_1.isAuthorizationError(err))
                return authService.getExchangeToken(function (err, res) {
                    if (err)
                        return cb(new PatientAuthenticationError(PatientAuthenticationStep.exchangeToken, err), null);
                    var exchangeToken = res.exchangeToken;
                    patientInput(function (err, searchStrategy, patientProperties, medCardId) {
                        if (err)
                            return cb(new PatientAuthenticationError(PatientAuthenticationStep.input, err), null);
                        authService.authenticate(exchangeToken, searchStrategy, patientProperties, medCardId, function (err, patient, userSign) {
                            // Возможные типы ошибок:
                            // - пользователь не найден (ошибка аутентификации) - сообщение пользователю
                            // - пользователь уже аутентифицирован - перелогиниться
                            if (err)
                                return cb(new PatientAuthenticationError(PatientAuthenticationStep.authenticate, err), null);
                            var authenticated = new PatientAuthenticationResult();
                            authenticated.patient = patient;
                            authenticated.patientAuthenticated = true;
                            authenticated.userSign = userSign;
                            cb(null, authenticated);
                        });
                    });
                });
            // Если возникла какая-то другая ошибка при получении пациента - возвращаем сообщение об ошибке
            if (err)
                return cb(new PatientAuthenticationError(PatientAuthenticationStep.patient, err), null);
            var authenticated = new PatientAuthenticationResult();
            authenticated.patient = patient;
            authenticated.patientFound = true;
            authenticated.userSign = userSign;
            return cb(null, authenticated);
        });
    }
    exports.getAuthenticatedPatient = getAuthenticatedPatient;
    /**
     * Функция, аналогичная предыдущей, за исключением того, что токен обмена был получен ранее.
     *
     * @param {string} exchangeToken
     * @param {IAuthService} authService
     * @param {function} patientInput
     * @param {function} cb
     */
    function getAuthenticatedPatientByExchangeToken(exchangeToken, authService, patientInput, cb) {
        patientInput(function (err, searchStrategy, patientProperties, medCardId) {
            if (err)
                return cb(new PatientAuthenticationError(PatientAuthenticationStep.input, err), null);
            authService.authenticate(exchangeToken, searchStrategy, patientProperties, medCardId, function (err, patient, userSign) {
                // Возможные типы ошибок:
                // - пользователь не найден (ошибка аутентификации) - сообщение пользователю
                // - пользователь уже аутентифицирован - перелогиниться
                if (err)
                    return cb(new PatientAuthenticationError(PatientAuthenticationStep.authenticate, err), null);
                var authenticated = new PatientAuthenticationResult();
                authenticated.patient = patient;
                authenticated.patientAuthenticated = true;
                authenticated.userSign = userSign;
                cb(null, authenticated);
            });
        });
    }
    exports.getAuthenticatedPatientByExchangeToken = getAuthenticatedPatientByExchangeToken;
});
define("services/Credentials", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Credentials = void 0;
    var Credentials = /** @class */ (function () {
        function Credentials(user, token) {
            this.user = user;
            this.token = token;
        }
        return Credentials;
    }());
    exports.Credentials = Credentials;
});
define("services/jsonRPC/jsonRpcRequest", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonRpcHeader = void 0;
    var JsonRpcHeader = /** @class */ (function () {
        function JsonRpcHeader(id, method, cred, apiKey) {
            if (cred === void 0) { cred = null; }
            if (apiKey === void 0) { apiKey = null; }
            this._id = id;
            this._method = method;
            this._cred = cred;
            this._apiKey = apiKey;
        }
        Object.defineProperty(JsonRpcHeader.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JsonRpcHeader.prototype, "method", {
            get: function () {
                return this._method;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JsonRpcHeader.prototype, "cred", {
            get: function () {
                return this._cred;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JsonRpcHeader.prototype, "apiKey", {
            get: function () {
                return this._apiKey;
            },
            enumerable: false,
            configurable: true
        });
        return JsonRpcHeader;
    }());
    exports.JsonRpcHeader = JsonRpcHeader;
});
define("services/jsonRPC/jsonrpc", ["require", "exports"], function (require, exports) {
    // **Github:** https://github.com/teambition/jsonrpc-lite
    //
    // http://www.jsonrpc.org/specification
    // **License:** MIT
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.jsonrpc = exports.parseObject = exports.parse = exports.error = exports.success = exports.notification = exports.request = exports.JsonRpcError = exports.JsonRpcParsed = exports.RpcStatusType = exports.ErrorObject = exports.SuccessObject = exports.NotificationObject = exports.RequestObject = exports.JsonRpc = void 0;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var isInteger = typeof Number.isSafeInteger === "function"
        ? Number.isSafeInteger // ECMAScript 2015
        : function (num) {
            return (typeof num === "number" &&
                isFinite(num) &&
                num === Math.floor(num) &&
                Math.abs(num) <= 9007199254740991);
        };
    var JsonRpc = /** @class */ (function () {
        function JsonRpc() {
            this.jsonrpc = "2.0";
        }
        JsonRpc.prototype.serialize = function () {
            return JSON.stringify(this);
        };
        JsonRpc.VERSION = "2.0";
        return JsonRpc;
    }());
    exports.JsonRpc = JsonRpc;
    var RequestObject = /** @class */ (function (_super) {
        __extends(RequestObject, _super);
        function RequestObject(id, method, params) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.method = method;
            if (params !== undefined) {
                _this.params = params;
            }
            return _this;
        }
        return RequestObject;
    }(JsonRpc));
    exports.RequestObject = RequestObject;
    var NotificationObject = /** @class */ (function (_super) {
        __extends(NotificationObject, _super);
        function NotificationObject(method, params) {
            var _this = _super.call(this) || this;
            _this.method = method;
            if (params !== undefined) {
                _this.params = params;
            }
            return _this;
        }
        return NotificationObject;
    }(JsonRpc));
    exports.NotificationObject = NotificationObject;
    var SuccessObject = /** @class */ (function (_super) {
        __extends(SuccessObject, _super);
        function SuccessObject(id, result) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.result = result;
            return _this;
        }
        return SuccessObject;
    }(JsonRpc));
    exports.SuccessObject = SuccessObject;
    var ErrorObject = /** @class */ (function (_super) {
        __extends(ErrorObject, _super);
        // tslint:disable-next-line:no-shadowed-variable
        function ErrorObject(id, error) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.error = error;
            _this.id = id;
            _this.error = error;
            return _this;
        }
        return ErrorObject;
    }(JsonRpc));
    exports.ErrorObject = ErrorObject;
    /**
     * JsonRpcParsed Class
     *
     * @param  {JsonRpc|JsonRpcError} payload
     * @param  {type: <Enum, 'request'|'notification'|'success'|'error'|'invalid'>} type
     * @api public
     */
    var RpcStatusType;
    (function (RpcStatusType) {
        RpcStatusType["request"] = "request";
        RpcStatusType["notification"] = "notification";
        RpcStatusType["success"] = "success";
        RpcStatusType["error"] = "error";
        RpcStatusType["invalid"] = "invalid";
    })(RpcStatusType = exports.RpcStatusType || (exports.RpcStatusType = {}));
    var JsonRpcParsed = /** @class */ (function () {
        function JsonRpcParsed(payload, type) {
            this.payload = payload;
            this.type = type;
            this.payload = payload;
            this.type = type;
        }
        return JsonRpcParsed;
    }());
    exports.JsonRpcParsed = JsonRpcParsed;
    /**
     * JsonRpcError Class
     *
     * @param  {String} message
     * @param  {Integer} code
     * @return {String} name: optional
     * @api public
     */
    var JsonRpcError = /** @class */ (function () {
        function JsonRpcError(message, code, data) {
            this.message = message;
            this.code = isInteger(code) ? code : 0;
            if (data != null) {
                this.data = data;
            }
        }
        JsonRpcError.invalidRequest = function (data) {
            return new JsonRpcError("Invalid request", -32600, data);
        };
        JsonRpcError.methodNotFound = function (data) {
            return new JsonRpcError("Method not found", -32601, data);
        };
        JsonRpcError.invalidParams = function (data) {
            return new JsonRpcError("Invalid params", -32602, data);
        };
        JsonRpcError.internalError = function (data) {
            return new JsonRpcError("Internal error", -32603, data);
        };
        JsonRpcError.parseError = function (data) {
            return new JsonRpcError("Parse error", -32700, data);
        };
        return JsonRpcError;
    }());
    exports.JsonRpcError = JsonRpcError;
    /**
     * Creates a JSON-RPC 2.0 request object
     *
     * @param  {String|Integer} id
     * @param  {String} method
     * @param  {Object|Array} [params]: optional
     * @return {Object} JsonRpc object
     * @api public
     */
    function request(id, method, params) {
        var object = new RequestObject(id, method, params);
        validateMessage(object, true);
        return object;
    }
    exports.request = request;
    /**
     * Creates a JSON-RPC 2.0 notification object
     *
     * @param  {String} method
     * @param  {Object|Array} [params]: optional
     * @return {Object} JsonRpc object
     * @api public
     */
    function notification(method, params) {
        var object = new NotificationObject(method, params);
        validateMessage(object, true);
        return object;
    }
    exports.notification = notification;
    /**
     * Creates a JSON-RPC 2.0 success response object
     *
     * @param  {String|Integer} id
     * @param  {Mixed} result
     * @return {Object} JsonRpc object
     * @api public
     */
    function success(id, result) {
        var object = new SuccessObject(id, result);
        validateMessage(object, true);
        return object;
    }
    exports.success = success;
    /**
     * Creates a JSON-RPC 2.0 error response object
     *
     * @param  {String|Integer} id
     * @param  {Object} JsonRpcError error
     * @return {Object} JsonRpc object
     * @api public
     */
    function error(id, err) {
        var object = new ErrorObject(id, err);
        validateMessage(object, true);
        return object;
    }
    exports.error = error;
    function parse(message) {
        if (!isString(message)) {
            return new JsonRpcParsed(JsonRpcError.invalidRequest(message), RpcStatusType.invalid);
        }
        var jsonrpcObj;
        try {
            jsonrpcObj = JSON.parse(message);
        }
        catch (err) {
            return new JsonRpcParsed(JsonRpcError.parseError(message), RpcStatusType.invalid);
        }
        if (!Array.isArray(jsonrpcObj)) {
            return parseObject(jsonrpcObj);
        }
        if (jsonrpcObj.length === 0) {
            return new JsonRpcParsed(JsonRpcError.invalidRequest(jsonrpcObj), RpcStatusType.invalid);
        }
        var parsedObjectArray = [];
        for (var i = 0, len = jsonrpcObj.length; i < len; i++) {
            parsedObjectArray[i] = parseObject(jsonrpcObj[i]);
        }
        return parsedObjectArray;
    }
    exports.parse = parse;
    /**
     * Takes a JSON-RPC 2.0 payload (Object) and tries to parse it into a JSON.
     * If successful, determine what object is it (response, notification,
     * success, error, or invalid), and return it's type and properly formatted object.
     *
     * @param  {Object} msg
     * @return {Object} an `JsonRpcParsed` object with `type` and `payload`:
     *
     *  {
     *    type: <Enum, 'request'|'notification'|'success'|'error'|'invalid'>
     *    payload: <JsonRpc|JsonRpcError>
     *  }
     *
     * @api public
     */
    function parseObject(obj) {
        var err = null;
        var payload = null;
        var payloadType = RpcStatusType.invalid;
        if (obj == null || obj.jsonrpc !== JsonRpc.VERSION) {
            err = JsonRpcError.invalidRequest(obj);
            payloadType = RpcStatusType.invalid;
        }
        else if (!hasOwnProperty.call(obj, "id")) {
            var tmp = obj;
            payload = new NotificationObject(tmp.method, tmp.params);
            err = validateMessage(payload);
            payloadType = RpcStatusType.notification;
        }
        else if (hasOwnProperty.call(obj, "method")) {
            var tmp = obj;
            payload = new RequestObject(tmp.id, tmp.method, tmp.params);
            err = validateMessage(payload);
            payloadType = RpcStatusType.request;
        }
        else if (hasOwnProperty.call(obj, "result")) {
            var tmp = obj;
            payload = new SuccessObject(tmp.id, tmp.result);
            err = validateMessage(payload);
            payloadType = RpcStatusType.success;
        }
        else if (hasOwnProperty.call(obj, "error")) {
            var tmp = obj;
            payloadType = RpcStatusType.error;
            if (tmp.error == null) {
                err = JsonRpcError.internalError(tmp);
            }
            else {
                var errorObj = new JsonRpcError(tmp.error.message, tmp.error.code, tmp.error.data);
                if (errorObj.message !== tmp.error.message ||
                    errorObj.code !== tmp.error.code) {
                    err = JsonRpcError.internalError(tmp);
                }
                else {
                    payload = new ErrorObject(tmp.id, errorObj);
                    err = validateMessage(payload);
                }
            }
        }
        if (err == null && payload != null) {
            return new JsonRpcParsed(payload, payloadType);
        }
        return new JsonRpcParsed(err != null ? err : JsonRpcError.invalidRequest(obj), RpcStatusType.invalid);
    }
    exports.parseObject = parseObject;
    // if error, return error, else return null
    function validateMessage(obj, throwIt) {
        var err = null;
        if (obj instanceof RequestObject) {
            err = checkId(obj.id);
            if (err == null) {
                err = checkMethod(obj.method);
            }
            if (err == null) {
                err = checkParams(obj.params);
            }
        }
        else if (obj instanceof NotificationObject) {
            err = checkMethod(obj.method);
            if (err == null) {
                err = checkParams(obj.params);
            }
        }
        else if (obj instanceof SuccessObject) {
            err = checkId(obj.id);
            if (err == null) {
                err = checkResult(obj.result);
            }
        }
        else if (obj instanceof ErrorObject) {
            err = checkId(obj.id, true);
            if (err == null) {
                err = checkError(obj.error);
            }
        }
        if (throwIt && err != null) {
            throw err;
        }
        return err;
    }
    function checkId(id, maybeNull) {
        if (maybeNull && id === null) {
            return null;
        }
        return isString(id) || isInteger(id)
            ? null
            : JsonRpcError.internalError('"id" must be provided, a string or an integer.');
    }
    function checkMethod(method) {
        return isString(method) ? null : JsonRpcError.invalidRequest(method);
    }
    function checkResult(result) {
        return result === undefined
            ? JsonRpcError.internalError("Result must exist for success Response objects")
            : null;
    }
    function checkParams(params) {
        if (params === undefined) {
            return null;
        }
        if (Array.isArray(params) || isObject(params)) {
            // ensure params can be stringify
            try {
                JSON.stringify(params);
                return null;
            }
            catch (err) {
                return JsonRpcError.parseError(params);
            }
        }
        return JsonRpcError.invalidParams(params);
    }
    function checkError(err) {
        if (!(err instanceof JsonRpcError)) {
            return JsonRpcError.internalError("Error must be an instance of JsonRpcError");
        }
        if (!isInteger(err.code)) {
            return JsonRpcError.internalError("Invalid error code. It must be an integer.");
        }
        if (!isString(err.message)) {
            return JsonRpcError.internalError("Message must exist or must be a string.");
        }
        return null;
    }
    function isString(obj) {
        return obj !== "" && typeof obj === "string";
    }
    function isObject(obj) {
        return obj != null && typeof obj === "object" && !Array.isArray(obj);
    }
    var jsonrpc = {
        JsonRpc: JsonRpc,
        JsonRpcError: JsonRpcError,
        request: request,
        notification: notification,
        success: success,
        error: error,
        parse: parse,
        parseObject: parseObject,
    };
    exports.jsonrpc = jsonrpc;
    exports.default = jsonrpc;
});
/*
 jsonrpc 2.0 extention for the "cred" property supports.
*/
define("services/jsonRPC/jsonrpc_cred", ["require", "exports", "services/jsonRPC/jsonrpc"], function (require, exports, jsonrpc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.requestCred = exports.RequestCredObject = void 0;
    var RequestCredObject = /** @class */ (function (_super) {
        __extends(RequestCredObject, _super);
        function RequestCredObject(id, method, cred, apiKey, params) {
            var _this = _super.call(this, id, method, params) || this;
            _this.cred = cred;
            _this.apiKey = apiKey;
            return _this;
        }
        return RequestCredObject;
    }(jsonrpc.RequestObject));
    exports.RequestCredObject = RequestCredObject;
    /**
     * Creates a JSON-RPC 2.0 request object with "cred" property.
     *
     * @param  {String|Integer} id
     * @param  {String} method
     * @param  {Credentials} cred
     * @param  {Object|Array} [params]: optional
     * @return {Object} JsonRpc object
     * @api public
     */
    function requestCred(id, method, cred, apiKey, params) {
        // call "standart" request function for validate message
        jsonrpc.request(id, method, params);
        return new RequestCredObject(id, method, cred, apiKey, params);
    }
    exports.requestCred = requestCred;
});
define("services/jsonRPC/xhr", ["require", "exports", "services/AuthService", "services/jsonRPC/jsonrpc_cred"], function (require, exports, AuthService_1, jsonrpc_cred_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.xhr = void 0;
    if (typeof window === "undefined") {
        var XMLHttpRequest = require("xhr2");
    }
    else {
        var XMLHttpRequest = window.XMLHttpRequest;
    }
    var verbose = true;
    var debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (verbose)
            console.debug.apply(console, args);
    };
    var xhr = function (endpoint, header, requestPayload, cb) {
        var _this = this;
        var req = new XMLHttpRequest();
        req.responseType = "json";
        req.withCredentials = true;
        req.onload = function (res) {
            var target = res.target;
            if (target.status >= 400)
                cb(new Error("status code " + target.status));
            else if (target.response) {
                var jsonRpcResponse = target.response;
                if (jsonRpcResponse.result)
                    cb(null, jsonRpcResponse.result);
                else if (jsonRpcResponse.error)
                    cb(jsonRpcResponse.error);
                else
                    cb(new Error("wrong json-rpc format " + jsonRpcResponse));
            }
            else
                cb(new Error("wrong json format"));
        };
        req.onerror = function (res) {
            var target = res.target;
            console.error("onerror " + _this.status + "\n" + target.response);
            if (target.status === 0)
                return cb(new AuthService_1.ConnectionError(), null);
            cb(new Error("error request " + endpoint + " method #" + header.method), null);
        };
        req.open("POST", endpoint, true);
        //req.overrideMimeType('application/json;charset=UTF-8');
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        debug(header.method + " cred=" + JSON.stringify(header.cred) + " apikey=" + header.apiKey + "\n" + JSON.stringify(requestPayload));
        //console.trace();
        var jsonRpcRequest = jsonrpc_cred_1.requestCred(header.id, header.method, header.cred, header.apiKey, requestPayload);
        debug("jsonRpcRequest.serialize()", jsonRpcRequest.serialize());
        req.send(jsonRpcRequest.serialize());
    };
    exports.xhr = xhr;
});
define("services/jsonRPC/jsonRpcService", ["require", "exports", "services/jsonRPC/jsonRpcRequest", "services/RpcErrorCodes"], function (require, exports, jsonRpcRequest_1, RpcErrorCodes_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonRPCCredService = exports.JsonRPCService = void 0;
    var JsonRPCService = /** @class */ (function () {
        function JsonRPCService(endpoint, request) {
            this._endpoint = endpoint;
            this._request = request;
        }
        Object.defineProperty(JsonRPCService.prototype, "endpoint", {
            get: function () {
                return this._endpoint;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JsonRPCService.prototype, "request", {
            get: function () {
                return this._request;
            },
            enumerable: false,
            configurable: true
        });
        JsonRPCService.prototype.exec = function (rpcMethod, payload, cb, optionalEndpoint, optionalCred) {
            if (optionalEndpoint === void 0) { optionalEndpoint = undefined; }
            if (optionalCred === void 0) { optionalCred = undefined; }
            this.request(optionalEndpoint || this._endpoint, new jsonRpcRequest_1.JsonRpcHeader((JsonRPCService.id++).toString(), rpcMethod, optionalCred), payload, cb);
        };
        JsonRPCService.id = 1;
        return JsonRPCService;
    }());
    exports.JsonRPCService = JsonRPCService;
    var JsonRPCCredService = /** @class */ (function (_super) {
        __extends(JsonRPCCredService, _super);
        function JsonRPCCredService(endpoint, cred, apiKey, request) {
            var _this = _super.call(this, endpoint, request) || this;
            _this.cred_ = cred;
            _this.apikey_ = apiKey;
            return _this;
        }
        Object.defineProperty(JsonRPCCredService.prototype, "cred", {
            get: function () {
                return this.cred_;
            },
            set: function (value) {
                this.cred_ = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(JsonRPCCredService.prototype, "apiKey", {
            get: function () {
                return this.apikey_;
            },
            set: function (value) {
                this.apikey_ = value;
            },
            enumerable: false,
            configurable: true
        });
        JsonRPCCredService.prototype.exec = function (rpcMethod, payload, cb, optionalEndpoint) {
            if (optionalEndpoint === void 0) { optionalEndpoint = undefined; }
            var service = this;
            function auth(cb) {
                var this_ = this;
                return function () {
                    var args = arguments;
                    if (args[0] &&
                        args[0].code === RpcErrorCodes_2.RpcErrorCodes.NotAuthorized &&
                        service.onAuthNotAuthorized)
                        service.onAuthNotAuthorized();
                    else if (args[0] &&
                        args[0].code === RpcErrorCodes_2.RpcErrorCodes.AuthExpired &&
                        service.onAuthExpired)
                        service.onAuthExpired();
                    else if (args[0] &&
                        args[0].code === RpcErrorCodes_2.RpcErrorCodes.UnknownAuthError &&
                        service.onAuthUnknownAuthError)
                        service.onAuthUnknownAuthError();
                    cb.apply(this_, args);
                };
            }
            var header = new jsonRpcRequest_1.JsonRpcHeader((JsonRPCService.id++).toString(), rpcMethod, this.cred, this.apiKey);
            this.request(optionalEndpoint || this.endpoint, header, payload, auth(cb));
        };
        JsonRPCCredService.prototype.getLastValidationErrors = function () {
            return this.lastValidationErrors_;
        };
        JsonRPCCredService.prototype.getLastValidationErrorsOfList = function () {
            return this.lastValidationErrorsOfList_;
        };
        return JsonRPCCredService;
    }(JsonRPCService));
    exports.JsonRPCCredService = JsonRPCCredService;
});
define("Handlers", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Handlers = void 0;
    var Handlers = /** @class */ (function () {
        function Handlers() {
        }
        Handlers.HANDLER_GET_APPOINTMENT_BY_ID = 100;
        Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD = "appointment.get_appointment_by_id";
        Handlers.HANDLER_SAVE_APPOINTMENT = 101;
        Handlers.HANDLER_SAVE_APPOINTMENT_METHOD = "appointment.save_appointment";
        Handlers.HANDLER_GET_PATIENT_APPOINTMENTS = 102;
        Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD = "appointment.get_patient_appointments";
        Handlers.HANDLER_GET_APPOINTMENTS = 103;
        Handlers.HANDLER_GET_APPOINTMENTS_METHOD = "appointment.get_appointments";
        Handlers.HANDLER_GET_APPOINTMENTS_COUNT = 104;
        Handlers.HANDLER_GET_APPOINTMENTS_COUNT_METHOD = "appointment.count";
        Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_COUNT = 105;
        Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_COUNT_METHOD = "appointment.patient_appointments_count";
        Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID = 200;
        Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD = "appointment_result.get_appointment_result_by_id";
        Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS = 201;
        Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD = "appointment_result.get_patient_appointment_results";
        Handlers.HANDLER_GET_APPOINTMENT_RESULTS = 202;
        Handlers.HANDLER_GET_APPOINTMENT_RESULTS_METHOD = "appointment_result.get_appointment_results";
        Handlers.HANDLER_GET_APPOINTMENT_RESULTS_COUNT = 203;
        Handlers.HANDLER_GET_APPOINTMENT_RESULTS_COUNT_METHOD = "appointment_result.count";
        Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_COUNT = 204;
        Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_COUNT_METHOD = "appointment_result.patient_appointment_results_count";
        Handlers.HANDLER_GET_PRESCRIPTION_BY_ID = 300;
        Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD = "prescription.get_prescription_by_id";
        Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS = 301;
        Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD = "prescription.get_patient_prescriptions";
        Handlers.HANDLER_GET_PRESCRIPTIONS = 302;
        Handlers.HANDLER_GET_PRESCRIPTIONS_METHOD = "prescription.get_prescriptions";
        Handlers.HANDLER_GET_PRESCRIPTIONS_COUNT = 303;
        Handlers.HANDLER_GET_PRESCRIPTIONS_COUNT_METHOD = "prescription.count";
        Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_COUNT = 304;
        Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_COUNT_METHOD = "prescription.patient_prescriptions_count";
        Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID = 400;
        Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD = "diagnostic_report.get_diagnostic_report_by_id";
        Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS = 401;
        Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD = "diagnostic_report.get_patient_diagnostic_reports";
        Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS = 402;
        Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_METHOD = "diagnostic_report.get_diagnostic_reports";
        Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_COUNT = 403;
        Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_COUNT_METHOD = "diagnostic_report.count";
        Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_COUNT = 404;
        Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_COUNT_METHOD = "diagnostic_report.patient_diagnostic_reports_count";
        Handlers.HANDLER_SAVE_AUTH_INFO = 500;
        Handlers.HANDLER_SAVE_AUTH_INFO_METHOD = "embedded_storage.save_auth_info";
        Handlers.HANDLER_SAVE_EXCHANGE_TOKEN = 501;
        Handlers.HANDLER_SAVE_EXCHANGE_TOKEN_METHOD = "embedded_storage.save_exchange_token";
        Handlers.HANDLER_AUTHENTICATE = 502;
        Handlers.HANDLER_AUTHENTICATE_METHOD = "embedded_storage.authenticate";
        Handlers.HANDLER_REMOVE_AUTH_INFO = 503;
        Handlers.HANDLER_REMOVE_AUTH_INFO_METHOD = "embedded_storage.remove_auth_info";
        Handlers.HANDLER_REMOVE_AUTHENTICATION = 504;
        Handlers.HANDLER_REMOVE_AUTHENTICATION_METHOD = "embedded_storage.remove_authentication";
        Handlers.HANDLER_GET_BUSINESS_INFO = 505;
        Handlers.HANDLER_GET_BUSINESS_INFO_METHOD = "embedded_storage.get_business_info";
        Handlers.HANDLER_GET_PATIENT = 600;
        Handlers.HANDLER_GET_PATIENT_METHOD = "patient.get_patient";
        Handlers.HANDLER_GET_PATIENT_BY_ID_METHOD = "patient.get_patient_by_id";
        Handlers.HANDLER_GET_PATIENTS_METHOD = "patient.get_patients";
        Handlers.HANDLER_GET_PATIENTS_COUNT_METHOD = "patient.count";
        return Handlers;
    }());
    exports.Handlers = Handlers;
});
define("services/jsonRPC/AppointmentService", ["require", "exports", "models/AppointmentModel", "services/jsonRPC/jsonRpcService", "Handlers"], function (require, exports, AppointmentModel_2, jsonRpcService_1, Handlers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentService = void 0;
    var AppointmentService = /** @class */ (function (_super) {
        __extends(AppointmentService, _super);
        function AppointmentService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppointmentService.prototype.getAppointmentById = function (id, cb) {
            this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD, { id: id }, function (err, payload) {
                if (err)
                    return cb(err, null);
                return cb(null, payload["appointment"]);
            });
        };
        AppointmentService.prototype.getAppointmentByIdAsync = function (id) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getAppointmentById(id, function (err, appointment) {
                    // console.log("appointment.patientId:", appointment.patientId);
                    if (err)
                        return rej(err);
                    res(appointment);
                });
            });
        };
        AppointmentService.prototype.getPatientAppointments = function (patientId, limit, offset, cb) {
            var _this = this;
            var params = { patientId: patientId, limit: limit, offset: offset };
            this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                var appointments = payload["appointments"].map(function (jsonApp) {
                    var app = new AppointmentModel_2.AppointmentModel();
                    app.fromJson(jsonApp);
                    return app;
                });
                return cb(null, appointments);
            });
        };
        AppointmentService.prototype.getPatientAppointmentsAsync = function (patientId, limit, offset) {
            return __awaiter(this, void 0, void 0, function () {
                var service;
                return __generator(this, function (_a) {
                    service = this;
                    return [2 /*return*/, new Promise(function (res, rej) {
                            service.getPatientAppointments(patientId, limit, offset, function (err, appointments) {
                                if (err)
                                    return rej(err);
                                res(appointments);
                            });
                        })];
                });
            });
        };
        AppointmentService.prototype.getAppointments = function (limit, offset, cb) {
            var _this = this;
            var params = { limit: limit, offset: offset };
            this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["appointments"]);
            });
        };
        AppointmentService.prototype.getAppointmentsAsync = function (limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getAppointments(limit, offset, function (err, appointments) {
                    if (err)
                        return rej(err);
                    res(appointments);
                });
            });
        };
        AppointmentService.prototype.getFilteredAppointments = function (filters, limit, offset, cb) {
            var _this = this;
            var params = { filters: filters.plain(), limit: limit, offset: offset };
            this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["appointments"]);
            });
        };
        AppointmentService.prototype.getFilteredAppointmentsAsync = function (filters, limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getFilteredAppointments(filters, limit, offset, function (err, appointments) {
                    if (err)
                        return rej(err);
                    res(appointments);
                });
            });
        };
        AppointmentService.prototype.getAppointmentsCount = function (cb) {
            var _this = this;
            this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENTS_COUNT_METHOD, {}, function (err, payload) {
                if (err)
                    return cb(err, null, false);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["count"], payload["support"]);
            });
        };
        AppointmentService.prototype.getAppointmentsCountAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.getAppointmentsCount(function (err, count, support) {
                    if (err)
                        return rej(err);
                    res({ count: count, support: support });
                });
            });
        };
        AppointmentService.prototype.getPatientAppointmentsCount = function (patientId, cb) {
            var _this = this;
            this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
                if (err)
                    return cb(err, null, false);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["count"], payload["support"]);
            });
        };
        AppointmentService.prototype.getPatientAppointmentsCountAsync = function (patientId) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatientAppointmentsCount(patientId, function (err, count, support) {
                    if (err)
                        return rej(err);
                    res({ count: count, support: support });
                });
            });
        };
        return AppointmentService;
    }(jsonRpcService_1.JsonRPCCredService));
    exports.AppointmentService = AppointmentService;
});
define("models/AppointmentResultModel", ["require", "exports", "types/index", "models/AppointmentModel"], function (require, exports, index_3, AppointmentModel_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentResultModel = void 0;
    /**
     * Класс модели записи.
     * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
     */
    var AppointmentResultModel = /** @class */ (function () {
        function AppointmentResultModel() {
        }
        Object.defineProperty(AppointmentResultModel.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "patientId", {
            get: function () {
                return this._patientId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "business", {
            get: function () {
                return this._business;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "created", {
            get: function () {
                return this._created;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "start", {
            get: function () {
                return this._start;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "doctor", {
            get: function () {
                return this._doctor;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "duration", {
            get: function () {
                return this._duration;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "anamnesis", {
            get: function () {
                return this._anamnesis;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "medicalExaminationResult", {
            get: function () {
                return this._medicalExaminationResult;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "diagnosis", {
            get: function () {
                return this._diagnosis;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "recommendations", {
            get: function () {
                return this._recommendations;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "scheduledProcedures", {
            get: function () {
                return this._scheduledProcedures;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "prescriptions", {
            get: function () {
                return this._prescriptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "diagnosticReportIds", {
            get: function () {
                return this._diagnosticReportIds;
            },
            enumerable: false,
            configurable: true
        });
        /**
         *
         * @param json
         */
        AppointmentResultModel.prototype.fromJson = function (json) {
            AppointmentModel_3.copyCommonPropertiesFromJson.call(this, json);
            this._duration = json.duration;
            this._anamnesis = json.anamnesis;
            this._medicalExaminationResult = json.medicalExaminationResult;
            this._diagnosis = json.diagnosis
                ? json.diagnosis.map(function (d) { return new index_3.Diagnosis(d); })
                : [];
            this._recommendations = json.recommendations
                ? json.recommendations.map(function (r) { return new index_3.Procedure().fromJson(r); })
                : [];
            this._scheduledProcedures = json.scheduledProcedures
                ? json.scheduledProcedures.map(function (p) { return new index_3.Procedure().fromJson(p); })
                : [];
            this._prescriptions = json.prescriptions
                ? json.prescriptions.map(function (p) { return new index_3.PrescriptionInfo().fromJson(p); })
                : [];
            this._diagnosticReportIds = json.diagnosticReportIds || [];
            return this;
        };
        /**
         *
         */
        AppointmentResultModel.prototype.toJson = function () {
            var payload = {
                id: this._id,
                patientId: this._patientId,
            };
            payload.business = this._business.toJson();
            payload.created = this._created.toJSON();
            payload.start = this._start.toJSON();
            payload.doctor = this._doctor.toJson();
            payload.duration = this._duration;
            payload.anamnesis = this._anamnesis;
            payload.medicalExaminationResult = this._medicalExaminationResult;
            payload.diagnosis = Array.isArray(this._diagnosis)
                ? this._diagnosis.map(function (d) { return d.toJson(); })
                : [];
            payload.recommendations = Array.isArray(this._recommendations)
                ? this._recommendations.map(function (r) { return r.toJson(); })
                : [];
            payload.scheduledProcedures = Array.isArray(this._scheduledProcedures)
                ? this._scheduledProcedures.map(function (r) { return r.toJson(); })
                : [];
            payload.prescriptions = Array.isArray(this._prescriptions)
                ? this._prescriptions.map(function (p) { return p.toJson(); })
                : [];
            payload.diagnosticReportIds = this._diagnosticReportIds;
            return payload;
        };
        return AppointmentResultModel;
    }());
    exports.AppointmentResultModel = AppointmentResultModel;
});
define("messages/AppointmentResultMessage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentResultMessage = void 0;
    var AppointmentResultMessage = /** @class */ (function () {
        function AppointmentResultMessage() {
        }
        return AppointmentResultMessage;
    }());
    exports.AppointmentResultMessage = AppointmentResultMessage;
});
define("services/AppointmentResultService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/jsonRPC/AppointmentResultService", ["require", "exports", "models/AppointmentResultModel", "services/jsonRPC/jsonRpcService", "Handlers"], function (require, exports, AppointmentResultModel_1, jsonRpcService_2, Handlers_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppointmentResultService = void 0;
    var AppointmentResultService = /** @class */ (function (_super) {
        __extends(AppointmentResultService, _super);
        function AppointmentResultService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Возвращает результаты записи по идентификатору.
         * @param id идентификатор результата записи
         * @param cb callback
         */
        AppointmentResultService.prototype.getAppointmentResultById = function (id, cb) {
            var _this = this;
            this.exec(Handlers_2.Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD, { id: id }, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrors_ = payload["validationErrors"];
                return cb(null, payload["appointmentResult"]);
            });
        };
        AppointmentResultService.prototype.getAppointmentResultByIdAsync = function (id) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getAppointmentResultById(id, function (err, appointment) {
                    if (err)
                        return rej(err);
                    // console.log("appointment_result.id:", appointment.id);
                    res(appointment);
                });
            });
        };
        AppointmentResultService.prototype.getPatientAppointmentResults = function (patientId, limit, offset, cb) {
            var _this = this;
            var params = { patientId: patientId, limit: limit, offset: offset };
            this.exec(Handlers_2.Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                var appointmentResults = payload["appointmentResults"].map(function (jsonApp) {
                    var app = new AppointmentResultModel_1.AppointmentResultModel();
                    app.fromJson(jsonApp);
                    return app;
                });
                return cb(null, appointmentResults);
            });
        };
        AppointmentResultService.prototype.getPatientAppointmentResultsAsync = function (patientId, limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatientAppointmentResults(patientId, limit, offset, function (err, appResults) {
                    if (err)
                        return rej(err);
                    res(appResults);
                });
            });
        };
        AppointmentResultService.prototype.getAppointmentResults = function (limit, offset, cb) {
            var _this = this;
            var params = { limit: limit, offset: offset };
            this.exec(Handlers_2.Handlers.HANDLER_GET_APPOINTMENT_RESULTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                return cb(null, payload["appointmentResults"]);
            });
        };
        AppointmentResultService.prototype.getAppointmentResultsAsync = function (limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getAppointmentResults(limit, offset, function (err, appResults) {
                    if (err)
                        return rej(err);
                    res(appResults);
                });
            });
        };
        AppointmentResultService.prototype.getAppointmentResultsCount = function (cb) {
            var _this = this;
            this.exec(Handlers_2.Handlers.HANDLER_GET_APPOINTMENT_RESULTS_COUNT_METHOD, {}, function (err, payload) {
                if (err)
                    return cb(err, null, false);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["count"], payload["support"]);
            });
        };
        AppointmentResultService.prototype.getAppointmentResultsCountAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.getAppointmentResultsCount(function (err, count, support) {
                    if (err)
                        return rej(err);
                    res({ count: count, support: support });
                });
            });
        };
        AppointmentResultService.prototype.getPatientAppointmentResultsCount = function (patientId, cb) {
            var _this = this;
            this.exec(Handlers_2.Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
                if (err)
                    return cb(err, null, false);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["count"], payload["support"]);
            });
        };
        AppointmentResultService.prototype.getPatientAppointmentResultsCountAsync = function (patientId) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatientAppointmentResultsCount(patientId, function (err, count, support) {
                    if (err)
                        return rej(err);
                    res({ count: count, support: support });
                });
            });
        };
        return AppointmentResultService;
    }(jsonRpcService_2.JsonRPCCredService));
    exports.AppointmentResultService = AppointmentResultService;
});
define("models/PrescriptionModel", ["require", "exports", "types/index", "types/PatientInfo"], function (require, exports, index_4, PatientInfo_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrescriptionModel = void 0;
    /**
     * Класс модели медикаментозного назначения.
     */
    var PrescriptionModel = /** @class */ (function (_super) {
        __extends(PrescriptionModel, _super);
        function PrescriptionModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PrescriptionModel.prototype.fromJson = function (json) {
            _super.prototype.fromJson.call(this, json);
            this.patientId = json.patientInfo.id;
            this.patientInfo = new PatientInfo_2.PatientInfo();
            this.patientInfo.fromJson(json.patientInfo);
            return this;
        };
        PrescriptionModel.prototype.toJson = function () {
            return this;
        };
        return PrescriptionModel;
    }(index_4.PrescriptionInfo));
    exports.PrescriptionModel = PrescriptionModel;
});
define("messages/PrescriptionMessage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrescriptionMessage = void 0;
    var PrescriptionMessage = /** @class */ (function () {
        function PrescriptionMessage() {
        }
        return PrescriptionMessage;
    }());
    exports.PrescriptionMessage = PrescriptionMessage;
});
define("services/filters/PrescriptionFilters", ["require", "exports", "formatters/l10n/index", "services/filters/DatePeriodFilter", "services/filters/Filters", "services/filters/FilterTypes"], function (require, exports, index_5, DatePeriodFilter_2, Filters_4, FilterTypes_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrescriptionFilters = exports.PrescriptionByPatientIdFilter = exports.PrescriptionByCreatedFilter = exports.PrescriptionByBusinessIdFilter = void 0;
    function isNullUndefEmpty(val) {
        return val == undefined || val == null || val == "";
    }
    function isNullUndef(val) {
        return val == null || val == undefined;
    }
    function isNullUndefZero(val) {
        return val == null || val == undefined || val.getTime() == 0;
    }
    var PrescriptionByBusinessIdFilter = /** @class */ (function (_super) {
        __extends(PrescriptionByBusinessIdFilter, _super);
        function PrescriptionByBusinessIdFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.businessId = "";
            _this.businessName = "";
            return _this;
        }
        Object.defineProperty(PrescriptionByBusinessIdFilter.prototype, "prettyValue", {
            get: function () {
                return this.businessName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PrescriptionByBusinessIdFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_4.FilterTypeEnum.PrescriptionByBusiness;
            },
            enumerable: false,
            configurable: true
        });
        PrescriptionByBusinessIdFilter.prototype.isEmpty = function () {
            return isNullUndefEmpty(this.businessId);
        };
        PrescriptionByBusinessIdFilter.prototype.setup = function (val) {
            this.businessId = (val === null || val === void 0 ? void 0 : val.businessId) || "";
            this.businessName = (val === null || val === void 0 ? void 0 : val.businessName) || "";
        };
        PrescriptionByBusinessIdFilter.prototype.plain = function () {
            return { businessId: this.businessId, businessName: this.businessName };
        };
        return PrescriptionByBusinessIdFilter;
    }(Filters_4.Filter));
    exports.PrescriptionByBusinessIdFilter = PrescriptionByBusinessIdFilter;
    var PrescriptionByCreatedFilter = /** @class */ (function (_super) {
        __extends(PrescriptionByCreatedFilter, _super);
        function PrescriptionByCreatedFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PrescriptionByCreatedFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_4.FilterTypeEnum.PrescriptionByCreated;
            },
            enumerable: false,
            configurable: true
        });
        return PrescriptionByCreatedFilter;
    }(DatePeriodFilter_2.DatePeriodFilter));
    exports.PrescriptionByCreatedFilter = PrescriptionByCreatedFilter;
    var PrescriptionByPatientIdFilter = /** @class */ (function (_super) {
        __extends(PrescriptionByPatientIdFilter, _super);
        function PrescriptionByPatientIdFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.patientId = "";
            return _this;
        }
        Object.defineProperty(PrescriptionByPatientIdFilter.prototype, "prettyValue", {
            get: function () {
                return this.patientId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PrescriptionByPatientIdFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_4.FilterTypeEnum.PrescriptionByPatient;
            },
            enumerable: false,
            configurable: true
        });
        PrescriptionByPatientIdFilter.prototype.isEmpty = function () {
            return isNullUndefEmpty(this.patientId);
        };
        PrescriptionByPatientIdFilter.prototype.setup = function (val) {
            this.patientId = (val === null || val === void 0 ? void 0 : val.patientId) || "";
        };
        PrescriptionByPatientIdFilter.prototype.plain = function () {
            return {
                patientId: this.patientId || "",
            };
        };
        return PrescriptionByPatientIdFilter;
    }(Filters_4.Filter));
    exports.PrescriptionByPatientIdFilter = PrescriptionByPatientIdFilter;
    var PrescriptionFilters = /** @class */ (function (_super) {
        __extends(PrescriptionFilters, _super);
        function PrescriptionFilters(localize) {
            var _this = _super.call(this) || this;
            _this.byBusinessId = new PrescriptionByBusinessIdFilter(localize);
            _this.byCreated = new PrescriptionByCreatedFilter(localize);
            _this.byPatientId = new PrescriptionByPatientIdFilter(localize);
            return _this;
        }
        PrescriptionFilters.createWithLocale = function (locale) {
            return new PrescriptionFilters(index_5.default.getByLocaleCode(locale)["filters"]);
        };
        PrescriptionFilters.prototype.setup = function (val) {
            if (isNullUndef(val))
                return;
            this.byBusinessId.setup(val["byBusines"]);
            this.byCreated.setup(val["byCreated"]);
            this.byPatientId.setup(val["byPatient"]);
        };
        PrescriptionFilters.prototype.plain = function () {
            return {
                byBusiness: this.byBusinessId.plain(),
                byCreated: this.byCreated.plain(),
                byPatient: this.byPatientId.plain(),
            };
        };
        PrescriptionFilters.prototype.getFilters = function () {
            return [this.byBusinessId, this.byCreated, this.byPatientId];
        };
        return PrescriptionFilters;
    }(Filters_4.FilterList));
    exports.PrescriptionFilters = PrescriptionFilters;
});
define("services/PrescriptionService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/jsonRPC/PrescriptionService", ["require", "exports", "services/jsonRPC/jsonRpcService", "Handlers"], function (require, exports, jsonRpcService_3, Handlers_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrescriptionService = void 0;
    var PrescriptionService = /** @class */ (function (_super) {
        __extends(PrescriptionService, _super);
        function PrescriptionService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Возвращает назначение по идентификатору.
         * @param id идентификатор результата записи
         * @param cb callback
         */
        PrescriptionService.prototype.getPrescriptionById = function (id, cb) {
            var _this = this;
            this.exec(Handlers_3.Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD, { id: id }, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrors_ = payload["validationErrors"];
                cb(null, payload["prescription"]);
            });
        };
        PrescriptionService.prototype.getPrescriptionByIdAsync = function (id) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPrescriptionById(id, function (err, pm) {
                    if (err)
                        return rej(err);
                    res(pm);
                });
            });
        };
        PrescriptionService.prototype.getPatientPrescriptions = function (patientId, limit, offset, cb) {
            var _this = this;
            var params = { patientId: patientId, limit: limit, offset: offset };
            this.exec(Handlers_3.Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                return cb(null, payload["prescriptions"]);
            });
        };
        PrescriptionService.prototype.getPatientPrescriptionsAsync = function (patientId, limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatientPrescriptions(patientId, limit, offset, function (err, values) {
                    if (err)
                        return rej(err);
                    res(values);
                });
            });
        };
        PrescriptionService.prototype.getPrescriptions = function (limit, offset, cb) {
            var _this = this;
            var params = { limit: limit, offset: offset };
            this.exec(Handlers_3.Handlers.HANDLER_GET_PRESCRIPTIONS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                return cb(null, payload["prescriptions"]);
            });
        };
        PrescriptionService.prototype.getPrescriptionsAsync = function (limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPrescriptions(limit, offset, function (err, values) {
                    if (err)
                        return rej(err);
                    res(values);
                });
            });
        };
        PrescriptionService.prototype.getFilteredPrescriptions = function (filters, limit, offset, cb) {
            var _this = this;
            var params = { filters: filters.plain(), limit: limit, offset: offset };
            this.exec(Handlers_3.Handlers.HANDLER_GET_PRESCRIPTIONS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                return cb(null, payload["prescriptions"]);
            });
        };
        PrescriptionService.prototype.getFilteredPrescriptionsAsync = function (filters, limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getFilteredPrescriptions(filters, limit, offset, function (err, values) {
                    if (err)
                        return rej(err);
                    res(values);
                });
            });
        };
        PrescriptionService.prototype.getPrescriptionsCount = function (cb) {
            var _this = this;
            this.exec(Handlers_3.Handlers.HANDLER_GET_PRESCRIPTIONS_COUNT_METHOD, {}, function (err, payload) {
                if (err)
                    return cb(err, null, false);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["count"], payload["support"]);
            });
        };
        PrescriptionService.prototype.getPrescriptionsCountAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPrescriptionsCount(function (err, count, support) {
                    if (err)
                        return rej(err);
                    res({ count: count, support: support });
                });
            });
        };
        PrescriptionService.prototype.getPatientPrescriptionsCount = function (patientId, cb) {
            var _this = this;
            this.exec(Handlers_3.Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
                if (err)
                    return cb(err, null, false);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["count"], payload["support"]);
            });
        };
        PrescriptionService.prototype.getPatientPrescriptionsCountAsync = function (patientId) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatientPrescriptionsCount(patientId, function (err, count, support) {
                    if (err)
                        return rej(err);
                    res({ count: count, support: support });
                });
            });
        };
        return PrescriptionService;
    }(jsonRpcService_3.JsonRPCCredService));
    exports.PrescriptionService = PrescriptionService;
});
define("types/DiagnosticReportStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagnosticReportStatus = void 0;
    var DiagnosticReportStatus;
    (function (DiagnosticReportStatus) {
    })(DiagnosticReportStatus = exports.DiagnosticReportStatus || (exports.DiagnosticReportStatus = {}));
});
define("types/ObservationType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObservationType = void 0;
    var ObservationType;
    (function (ObservationType) {
        ObservationType[ObservationType["Observation"] = 1] = "Observation";
        ObservationType[ObservationType["LaboratoryTest"] = 2] = "LaboratoryTest";
    })(ObservationType = exports.ObservationType || (exports.ObservationType = {}));
});
define("types/ObservationStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObservationStatus = void 0;
    var ObservationStatus;
    (function (ObservationStatus) {
    })(ObservationStatus = exports.ObservationStatus || (exports.ObservationStatus = {}));
});
define("types/ObservationUnit", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObservationUnit = void 0;
    var ObservationUnit;
    (function (ObservationUnit) {
    })(ObservationUnit = exports.ObservationUnit || (exports.ObservationUnit = {}));
});
define("types/ObservationValue", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObservationValue = void 0;
    var ObservationValue = /** @class */ (function () {
        function ObservationValue() {
        }
        ObservationValue.prototype.fromJson = function (json) {
            this.serializedValue = json.serializedValue;
            this.unit = json.unit;
            this.code = json.code;
            this.value = json.value;
            return this;
        };
        ObservationValue.prototype.toJson = function () {
            var payload = {};
            payload.serializedValue = this.serializedValue;
            payload.unit = this.unit;
            payload.code = this.code;
            payload.value = this.value;
            return payload;
        };
        return ObservationValue;
    }());
    exports.ObservationValue = ObservationValue;
});
define("types/ObservationRange", ["require", "exports", "types/Period"], function (require, exports, Period_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObservationRange = void 0;
    var ObservationRange = /** @class */ (function () {
        function ObservationRange() {
            this.age = new Period_5.Period();
        }
        ObservationRange.prototype.fromJson = function (json) {
            this.low = json.low;
            this.high = json.high;
            this.unit = json.unit;
            this.type = json.type;
            if (json.age)
                this.age.fromJson(json.age);
            this.text = json.text;
            return this;
        };
        ObservationRange.prototype.toJson = function () {
            var payload = {};
            payload.low = this.low;
            payload.high = this.high;
            payload.unit = this.unit;
            payload.type = this.type;
            payload.age = this.age ? this.age.toJson() : null;
            payload.text = this.text;
            return payload;
        };
        return ObservationRange;
    }());
    exports.ObservationRange = ObservationRange;
});
define("types/ObservationComponent", ["require", "exports", "types/ObservationRange"], function (require, exports, ObservationRange_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObservationComponent = void 0;
    var ObservationComponent = /** @class */ (function () {
        function ObservationComponent() {
        }
        ObservationComponent.prototype.fromJson = function (json) {
            this.type = json.type;
            this.value = json.value;
            this.interpretation = json.interpretation;
            this.ranges = json.ranges ? new ObservationRange_1.ObservationRange[json.ranges.length]() : [];
            if (json.ranges)
                for (var i = 0; i < json.ranges.length; ++i)
                    this.ranges[i] = new ObservationRange_1.ObservationRange().fromJson(json.ranges[i]);
            return this;
        };
        ObservationComponent.prototype.toJson = function () {
            var payload = {};
            payload.type = this.type;
            payload.value = this.value.toJson();
            payload.interpretation = this.interpretation;
            payload.ranges = this.ranges ? this.ranges.map(function (r) { return r.toJson(); }) : null;
            return payload;
        };
        return ObservationComponent;
    }());
    exports.ObservationComponent = ObservationComponent;
});
define("types/Observation", ["require", "exports", "types/BusinessInfo", "types/Doctor", "types/PatientInfo", "types/Period", "types/ObservationValue", "types/ObservationRange", "types/ObservationComponent"], function (require, exports, BusinessInfo_2, Doctor_3, PatientInfo_3, Period_6, ObservationValue_1, ObservationRange_2, ObservationComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Observation = void 0;
    var Observation = /** @class */ (function () {
        function Observation() {
            this.patientInfo = new PatientInfo_3.PatientInfo();
            this.effectivePeriod = new Period_6.Period();
            this.performerDoctor = new Doctor_3.Doctor();
            this.performerBusiness = new BusinessInfo_2.BusinessInfo();
            this.value = new ObservationValue_1.ObservationValue();
            this.interpretation = [];
            this.ranges = [];
            this.components = [];
        }
        Observation.prototype.fromJson = function (json) {
            this.id = json.id;
            this.createdDate = new Date(json.createdDate);
            if (json.patientInfo)
                this.patientInfo.fromJson(json.patientInfo);
            this.type = json.type;
            this.observationKey = json.observationKey;
            this.status = json.status;
            if (json.effectivePeriod)
                this.effectivePeriod.fromJson(json.effectivePeriod);
            this.issuedDate = new Date(json.issuedDate);
            if (json.performerDoctor)
                this.performerDoctor.fromJson(json.performerDoctor);
            if (json.performerBusiness)
                this.performerBusiness.fromJson(json.performerBusiness);
            if (json.value)
                this.value.fromJson(json.value);
            this.note = json.note;
            this.interpretation = [];
            if (json.interpretation)
                for (var i = 0; i < json.interpretation.length; ++i)
                    this.interpretation.push(json.interpretation[i]);
            this.ranges = [];
            if (json.ranges)
                for (var i = 0; i < json.ranges.length; ++i)
                    this.ranges.push(new ObservationRange_2.ObservationRange().fromJson(json.ranges[i]));
            this.components = [];
            if (json.components)
                for (var i = 0; i < json.components.length; ++i)
                    this.components.push(new ObservationComponent_1.ObservationComponent().fromJson(json.components[i]));
            return this;
        };
        Observation.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.createdDate = this.createdDate.toJSON();
            payload.patientInfo = this.patientInfo ? this.patientInfo.toJson() : null;
            payload.type = this.type;
            payload.observationKey = this.observationKey;
            payload.status = this.status;
            payload.effectivePeriod = this.effectivePeriod
                ? this.effectivePeriod.toJson()
                : null;
            payload.issuedDate = this.issuedDate.toJSON();
            payload.performerDoctor = this.performerDoctor
                ? this.performerDoctor.toJson()
                : null;
            payload.performerBusiness = this.performerBusiness
                ? this.performerBusiness.toJson()
                : null;
            payload.value = this.value ? this.value.toJson() : null;
            payload.note = this.note;
            payload.interpretation = this.interpretation;
            payload.ranges = this.ranges ? this.ranges.map(function (r) { return r.toJson(); }) : null;
            payload.components = this.components
                ? this.components.map(function (c) { return c.toJson(); })
                : null;
            return payload;
        };
        return Observation;
    }());
    exports.Observation = Observation;
});
define("models/DiagnosticReportModel", ["require", "exports", "types/Doctor", "types/Period", "types/Observation", "types/Service"], function (require, exports, Doctor_4, Period_7, Observation_1, Service_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagnosticReportModel = void 0;
    /**
     * Класс модели медикаментозного назначения.
     */
    var DiagnosticReportModel = /** @class */ (function () {
        function DiagnosticReportModel() {
            this._issuedDate = new Date();
            this._effectivePeriod = new Period_7.Period();
            this._result = [];
            this._resultInterpreter = [];
            this._resultInterpretation = [];
            this._imagineMedia = [];
            this._attachments = [];
            this._services = [];
        }
        Object.defineProperty(DiagnosticReportModel.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "status", {
            /**
             * Статус диагностического отчета.
             */
            get: function () {
                return this._status;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "type", {
            /**
             * Тип обследования.
             */
            get: function () {
                return this._type;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "services", {
            /**
             * Список оказанных на исследовании услуг.
             */
            get: function () {
                return this._services;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "category", {
            /**
             * Категория сервисов диагностики (код).
             * @see http://hl7.org/fhir/valueset-diagnostic-service-sections.html
             */
            get: function () {
                return this._category;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "effectivePeriod", {
            /**
             * Период дат, в течение которых результаты теста считать действительными.
             */
            get: function () {
                return this._effectivePeriod;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "issuedDate", {
            /**
             * Дата публикации обследования пациенту.
             */
            get: function () {
                return this._issuedDate;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "result", {
            /**
             * Результаты обследования в нормализованном виде.
             */
            get: function () {
                return this._result;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "resultInterpreter", {
            /**
             * Врач, который интерпретировал результаты.
             */
            get: function () {
                return this._resultInterpreter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "resultInterpretation", {
            /**
             * Интерпретация результатов обследования/анализов.
             */
            get: function () {
                return this._resultInterpretation;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "imagineMedia", {
            /**
             * Список ссылок на флюорографии, ЭКГ и т.п.
             */
            get: function () {
                return this._imagineMedia;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "attachments", {
            /**
             * Весь отчет, как документ ворд, pdf  т.п.
             */
            get: function () {
                return this._attachments;
            },
            enumerable: false,
            configurable: true
        });
        DiagnosticReportModel.prototype.fromJson = function (json) {
            this._id = json.id;
            this._status = json.status;
            this._type = json.type;
            this._effectivePeriod = new Period_7.Period().fromJson(json.effectivePeriod);
            this._issuedDate = new Date(json.issuedDate);
            this._result = [];
            if (json.result)
                for (var i = 0; i < json.result.length; ++i)
                    this._result.push(new Observation_1.Observation().fromJson(json.result[i]));
            this._resultInterpreter = json.resultInterpreter
                ? json.resultInterpreter.map(function (d) { return new Doctor_4.Doctor().fromJson(d); })
                : [];
            this._resultInterpretation = json.resultInterpretation || [];
            this._imagineMedia = json.imagineMedia || [];
            this._attachments = json.attachments || [];
            this._services = [];
            if (json.services)
                for (var i = 0; i < json.services.length; ++i)
                    this._services.push(new Service_3.Service().fromJson(json.services[i]));
            this._category = json.category;
            return this;
        };
        DiagnosticReportModel.prototype.toJson = function () {
            var payload = {};
            payload.id = this._id;
            payload.status = this._status;
            payload.type = this._type;
            payload.effectivePeriod = this._effectivePeriod
                ? this._effectivePeriod.toJson()
                : null;
            payload.issuedDate = this._issuedDate.toJSON();
            payload.result = this._result
                ? this._result.map(function (value) { return value.toJson(); })
                : null;
            payload.resultInterpreter = this._resultInterpreter
                ? this._resultInterpreter.map(function (i) { return i.toJson(); })
                : null;
            payload.resultInterpretation = this._resultInterpretation;
            payload.imagineMedia = this._imagineMedia;
            payload.attachments = this._attachments;
            payload.services = this._services
                ? this._services.map(function (s) { return s.toJson(); })
                : null;
            payload.category = this._category;
            return payload;
        };
        return DiagnosticReportModel;
    }());
    exports.DiagnosticReportModel = DiagnosticReportModel;
});
define("messages/DiagnosticReportMessage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagnosticReportMessage = void 0;
    var DiagnosticReportMessage = /** @class */ (function () {
        function DiagnosticReportMessage() {
        }
        return DiagnosticReportMessage;
    }());
    exports.DiagnosticReportMessage = DiagnosticReportMessage;
});
define("services/filters/DiagnosticReportFilters", ["require", "exports", "formatters/l10n/index", "services/filters/DatePeriodFilter", "services/filters/Filters", "services/filters/FilterTypes"], function (require, exports, index_6, DatePeriodFilter_3, Filters_5, FilterTypes_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagnosticReportFilters = exports.DiagnosticReportByPatientIdFilter = exports.DiagnosticReportByCreatedFilter = exports.DiagnosticReportByBusinessIdFilter = void 0;
    function isNullUndefEmpty(val) {
        return val == undefined || val == null || val == "";
    }
    function isNullUndef(val) {
        return val == null || val == undefined;
    }
    function isNullUndefZero(val) {
        return val == null || val == undefined || val.getTime() == 0;
    }
    var DiagnosticReportByBusinessIdFilter = /** @class */ (function (_super) {
        __extends(DiagnosticReportByBusinessIdFilter, _super);
        function DiagnosticReportByBusinessIdFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.businessId = "";
            _this.businessName = "";
            return _this;
        }
        Object.defineProperty(DiagnosticReportByBusinessIdFilter.prototype, "prettyValue", {
            get: function () {
                return this.businessName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportByBusinessIdFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_5.FilterTypeEnum.DiagnosticReportByBusiness;
            },
            enumerable: false,
            configurable: true
        });
        DiagnosticReportByBusinessIdFilter.prototype.isEmpty = function () {
            return isNullUndefEmpty(this.businessId);
        };
        DiagnosticReportByBusinessIdFilter.prototype.setup = function (val) {
            this.businessId = (val === null || val === void 0 ? void 0 : val.businessId) || "";
            this.businessName = (val === null || val === void 0 ? void 0 : val.businessName) || "";
        };
        DiagnosticReportByBusinessIdFilter.prototype.plain = function () {
            return { businessId: this.businessId, businessName: this.businessName };
        };
        return DiagnosticReportByBusinessIdFilter;
    }(Filters_5.Filter));
    exports.DiagnosticReportByBusinessIdFilter = DiagnosticReportByBusinessIdFilter;
    var DiagnosticReportByCreatedFilter = /** @class */ (function (_super) {
        __extends(DiagnosticReportByCreatedFilter, _super);
        function DiagnosticReportByCreatedFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(DiagnosticReportByCreatedFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_5.FilterTypeEnum.DiagnosticReportByCreated;
            },
            enumerable: false,
            configurable: true
        });
        return DiagnosticReportByCreatedFilter;
    }(DatePeriodFilter_3.DatePeriodFilter));
    exports.DiagnosticReportByCreatedFilter = DiagnosticReportByCreatedFilter;
    var DiagnosticReportByPatientIdFilter = /** @class */ (function (_super) {
        __extends(DiagnosticReportByPatientIdFilter, _super);
        function DiagnosticReportByPatientIdFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.patientId = "";
            return _this;
        }
        Object.defineProperty(DiagnosticReportByPatientIdFilter.prototype, "prettyValue", {
            get: function () {
                return this.patientId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportByPatientIdFilter.prototype, "kind", {
            get: function () {
                return FilterTypes_5.FilterTypeEnum.DiagnosticReportByPatientId;
            },
            enumerable: false,
            configurable: true
        });
        DiagnosticReportByPatientIdFilter.prototype.isEmpty = function () {
            return isNullUndefEmpty(this.patientId);
        };
        DiagnosticReportByPatientIdFilter.prototype.setup = function (val) {
            this.patientId = (val === null || val === void 0 ? void 0 : val.patientId) || "";
        };
        DiagnosticReportByPatientIdFilter.prototype.plain = function () {
            return {
                patientId: this.patientId || "",
            };
        };
        return DiagnosticReportByPatientIdFilter;
    }(Filters_5.Filter));
    exports.DiagnosticReportByPatientIdFilter = DiagnosticReportByPatientIdFilter;
    var DiagnosticReportFilters = /** @class */ (function (_super) {
        __extends(DiagnosticReportFilters, _super);
        function DiagnosticReportFilters(localize) {
            var _this = _super.call(this) || this;
            _this.byBusinessId = new DiagnosticReportByBusinessIdFilter(localize);
            _this.byCreated = new DiagnosticReportByCreatedFilter(localize);
            _this.byPatientId = new DiagnosticReportByPatientIdFilter(localize);
            return _this;
        }
        DiagnosticReportFilters.createWithLocale = function (locale) {
            return new DiagnosticReportFilters(index_6.default.getByLocaleCode(locale)["filters"]);
        };
        DiagnosticReportFilters.prototype.setup = function (val) {
            if (isNullUndef(val))
                return;
            this.byBusinessId.setup(val["byBusines"]);
            this.byCreated.setup(val["byCreated"]);
            this.byPatientId.setup(val["byPatient"]);
        };
        DiagnosticReportFilters.prototype.plain = function () {
            return {
                byBusiness: this.byBusinessId.plain(),
                byCreated: this.byCreated.plain(),
                byPatient: this.byPatientId.plain(),
            };
        };
        DiagnosticReportFilters.prototype.getFilters = function () {
            return [this.byBusinessId, this.byCreated, this.byPatientId];
        };
        return DiagnosticReportFilters;
    }(Filters_5.FilterList));
    exports.DiagnosticReportFilters = DiagnosticReportFilters;
});
define("services/DiagnosticReportService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/jsonRPC/DiagnosticReportService", ["require", "exports", "services/jsonRPC/jsonRpcService", "Handlers"], function (require, exports, jsonRpcService_4, Handlers_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagnosticReportService = void 0;
    var DiagnosticReportService = /** @class */ (function (_super) {
        __extends(DiagnosticReportService, _super);
        function DiagnosticReportService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Возвращает назначение по идентификатору.
         * @param id идентификатор результата записи
         * @param cb callback
         */
        DiagnosticReportService.prototype.getDiagnosticReportById = function (id, cb) {
            var _this = this;
            this.exec(Handlers_4.Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD, { id: id }, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrors_ = payload["validationErrors"];
                return cb(null, payload["diagnosticReport"]);
            });
        };
        DiagnosticReportService.prototype.getDiagnosticReportByIdAsync = function (id) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getDiagnosticReportById(id, function (err, dr) {
                    if (err)
                        return rej(err);
                    // console.log("prescription.id:", appointment.id);
                    res(dr);
                });
            });
        };
        DiagnosticReportService.prototype.getPatientDiagnosticReports = function (patientId, limit, offset, cb) {
            var _this = this;
            var params = { patientId: patientId, limit: limit, offset: offset };
            this.exec(Handlers_4.Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["diagnosticReports"]);
            });
        };
        DiagnosticReportService.prototype.getPatientDiagnosticReportsAsync = function (patientId, limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatientDiagnosticReports(patientId, limit, offset, function (err, reports) {
                    if (err)
                        return rej(err);
                    res(reports);
                });
            });
        };
        DiagnosticReportService.prototype.getDiagnosticReports = function (limit, offset, cb) {
            var _this = this;
            var params = { limit: limit, offset: offset };
            this.exec(Handlers_4.Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["diagnosticReports"]);
            });
        };
        DiagnosticReportService.prototype.getDiagnosticReportsAsync = function (limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getDiagnosticReports(limit, offset, function (err, reports) {
                    if (err)
                        return rej(err);
                    res(reports);
                });
            });
        };
        DiagnosticReportService.prototype.getFilteredDiagnosticReports = function (filters, limit, offset, cb) {
            var _this = this;
            var params = { filters: filters.plain(), limit: limit, offset: offset };
            this.exec(Handlers_4.Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["diagnosticReports"]);
            });
        };
        DiagnosticReportService.prototype.getFilteredDiagnosticReportsAsync = function (filters, limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getFilteredDiagnosticReports(filters, limit, offset, function (err, reports) {
                    if (err)
                        return rej(err);
                    res(reports);
                });
            });
        };
        DiagnosticReportService.prototype.getDiagnosticReportsCount = function (cb) {
            var _this = this;
            this.exec(Handlers_4.Handlers.HANDLER_GET_DIAGNOSTIC_REPORTS_COUNT_METHOD, {}, function (err, payload) {
                if (err)
                    return cb(err, null, false);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["count"], payload["support"]);
            });
        };
        DiagnosticReportService.prototype.getDiagnosticReportsCountAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.getDiagnosticReportsCount(function (err, count, support) {
                    if (err)
                        return rej(err);
                    res({ count: count, support: support });
                });
            });
        };
        DiagnosticReportService.prototype.getPatientDiagnosticReportsCount = function (patientId, cb) {
            var _this = this;
            this.exec(Handlers_4.Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
                if (err)
                    return cb(err, null, false);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["count"], payload["support"]);
            });
        };
        DiagnosticReportService.prototype.getPatientDiagnosticReportsCountAsync = function (patientId) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatientDiagnosticReportsCount(patientId, function (err, count, support) {
                    if (err)
                        return rej(err);
                    res({ count: count, support: support });
                });
            });
        };
        return DiagnosticReportService;
    }(jsonRpcService_4.JsonRPCCredService));
    exports.DiagnosticReportService = DiagnosticReportService;
});
define("services/jsonRPC/AuthService", ["require", "exports", "services/jsonRPC/jsonRpcService", "services/AuthService", "Handlers", "models/PatientModel"], function (require, exports, jsonRpcService_5, AuthService_2, Handlers_5, PatientModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthService = void 0;
    var AuthService = /** @class */ (function (_super) {
        __extends(AuthService, _super);
        /**
         * В конструктор передается endpoint сервера авторизации и endpoint сервера мед данных.
         *
         * @param authServerEndpoint endpoint сервера авторизации
         * @param ehrServerEndpoint endpoint сервера мед данных
         * @param request функция, выполняющая запрос
         * @param authCred параметры доступа к обоим серверам
         */
        function AuthService(ehrServerEndpoint, authServerEndpoint, cred, request, exchangeTokenMethod, exchangeTokenExtra) {
            var _this = _super.call(this, null, request) || this;
            _this.ehrServerEndpoint_ = ehrServerEndpoint;
            _this.authServerEndpoint_ = authServerEndpoint;
            _this.authCred_ = cred;
            _this.authExchangeTokenMethod_ = exchangeTokenMethod;
            _this.authExchangeTokenExtra_ = exchangeTokenExtra;
            return _this;
        }
        /**
         * Метод выполняет запрос к серверу авторизации для генерации и предоставления exchange_token.
         *
         * @param {Function} cb
         */
        AuthService.prototype.getExchangeToken = function (cb) {
            this.exec(this.authExchangeTokenMethod_, this.authExchangeTokenExtra_, function (err, payload) {
                if (err)
                    return cb(err, null);
                var etr = new AuthService_2.ExchangeTokenResponse();
                etr.exchangeToken = payload["exchangeToken"];
                return cb(null, etr);
            }, this.authServerEndpoint_, this.authCred_);
        };
        AuthService.prototype.getExchangeTokenAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.getExchangeToken(function (err, et) {
                    if (err)
                        return rej(err);
                    res(et);
                });
            });
        };
        /**
         * Метод выполняет запрос к EHR серверу для аутентификации пользователя по его данным.
         *
         * Авторизация выполняется через ранее полученный exchangeToken.
         *
         * @param {string} exchangeToken короткоживущий токен обмена
         * @param {string} searchStrategy
         * @param {PatientInputProperties} patientProperties информация о пациенте для сопоставления
         * @param {string} medCardId
         * @param {Function} cb
         */
        AuthService.prototype.authenticate = function (exchangeToken, searchStrategy, patientProperties, medCardId, cb) {
            if (["PHONE", "MEDCARD"].indexOf(searchStrategy) < 0)
                throw Error("Argument searchStrategy is out of range.");
            var requestData = {
                exchangeToken: exchangeToken,
                searchStrategy: searchStrategy,
                patientProperties: patientProperties,
                medCardId: medCardId,
            };
            this.exec(Handlers_5.Handlers.HANDLER_AUTHENTICATE_METHOD, requestData, function (err, payload) {
                if (err)
                    return cb(err, null, null);
                var patient = new PatientModel_1.PatientModel();
                patient.fromJson(payload["patient"]);
                if (!payload["userSign"])
                    throw new Error("expect userSign");
                return cb(null, patient, payload["userSign"]);
            }, this.ehrServerEndpoint_);
        };
        AuthService.prototype.authenticateAsync = function (exchangeToken, searchStrategy, patientProperties, medCardId) {
            var service = this;
            return new Promise(function (res, rej) {
                service.authenticate(exchangeToken, searchStrategy, patientProperties, medCardId, function (err, patient, userSign) {
                    if (err)
                        return rej(err);
                    res({ patient: patient, userSign: userSign });
                });
            });
        };
        /**
         * Удаление сопоставления креденшиалов пользователя и пациента в МИСе.
         * Удаляет так же все активные сессии данного пользователя.
         *
         * @param cb
         */
        AuthService.prototype.removeAuthentication = function (cb) {
            this.exec(Handlers_5.Handlers.HANDLER_REMOVE_AUTHENTICATION_METHOD, {}, cb, this.ehrServerEndpoint_, this.authCred_);
        };
        AuthService.prototype.removeAuthenticationAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.removeAuthentication(function (err) {
                    if (err)
                        return rej(err);
                    res();
                });
            });
        };
        /**
         * Удаление пользовательской сессии.
         *
         * @param cb
         */
        AuthService.prototype.removeAuthInfo = function (cb) {
            this.exec(Handlers_5.Handlers.HANDLER_REMOVE_AUTH_INFO_METHOD, {}, cb, this.ehrServerEndpoint_, this.authCred_);
        };
        AuthService.prototype.removeAuthInfoAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.removeAuthInfo(function (err) {
                    if (err)
                        return rej(err);
                    res();
                });
            });
        };
        return AuthService;
    }(jsonRpcService_5.JsonRPCService));
    exports.AuthService = AuthService;
});
define("services/jsonRPC/PatientService", ["require", "exports", "services/jsonRPC/jsonRpcService", "Handlers", "models/PatientModel"], function (require, exports, jsonRpcService_6, Handlers_6, PatientModel_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PatientService = void 0;
    var PatientService = /** @class */ (function (_super) {
        __extends(PatientService, _super);
        function PatientService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PatientService.prototype.getPatient = function (cb) {
            var _this = this;
            this.exec(Handlers_6.Handlers.HANDLER_GET_PATIENT_METHOD, {}, function (err, payload) {
                if (err)
                    return cb(err);
                if (!payload["userSign"])
                    return cb(new Error("userSign not found"));
                var patient = new PatientModel_2.PatientModel();
                _this.lastValidationErrors_ = payload["validationErrors"];
                patient.fromJson(payload["patient"]);
                return cb(err, patient, payload["userSign"]);
            });
        };
        PatientService.prototype.getPatientAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatient(function (err, patient, userSign) {
                    if (err)
                        return rej(err);
                    res({ patient: patient, userSign: userSign });
                });
            });
        };
        PatientService.prototype.getPatientById = function (id, cb) {
            var _this = this;
            this.exec(Handlers_6.Handlers.HANDLER_GET_PATIENT_BY_ID_METHOD, { id: id }, function (err, payload) {
                if (err)
                    return cb(err);
                _this.lastValidationErrors_ = payload["validationErrors"];
                return cb(err, payload["patient"]);
            });
        };
        PatientService.prototype.getPatientByIdAsync = function (id) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatientById(id, function (err, patient) {
                    if (err)
                        return rej(err);
                    res({ patient: patient });
                });
            });
        };
        PatientService.prototype.getPatients = function (limit, offset, cb) {
            this.exec(Handlers_6.Handlers.HANDLER_GET_PATIENTS_METHOD, { limit: limit, offset: offset }, function (err, payload) {
                if (err)
                    return cb(err, null);
                return cb(err, payload["patients"]);
            });
        };
        PatientService.prototype.getPatientsAsync = function (limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatients(limit, offset, function (err, patients) {
                    if (err)
                        return rej(err);
                    res(patients);
                });
            });
        };
        PatientService.prototype.getFilteredPatients = function (filters, limit, offset, cb) {
            this.exec(Handlers_6.Handlers.HANDLER_GET_PATIENTS_METHOD, { filters: filters.plain(), limit: limit, offset: offset }, function (err, payload) {
                if (err)
                    return cb(err, null);
                return cb(err, payload["patients"]);
            });
        };
        PatientService.prototype.getFilteredPatientsAsync = function (filters, limit, offset) {
            var service = this;
            return new Promise(function (res, rej) {
                service.getFilteredPatients(filters, limit, offset, function (err, patients) {
                    if (err)
                        return rej(err);
                    res(patients);
                });
            });
        };
        PatientService.prototype.getPatientsCount = function (cb) {
            this.exec(Handlers_6.Handlers.HANDLER_GET_PATIENTS_COUNT_METHOD, {}, function (err, payload) {
                if (err)
                    return cb(err, null, false);
                return cb(err, payload["count"], payload["support"]);
            });
        };
        PatientService.prototype.getPatientsCountAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.getPatientsCount(function (err, count, support) {
                    if (err)
                        return rej(err);
                    res({ count: count, support: support });
                });
            });
        };
        return PatientService;
    }(jsonRpcService_6.JsonRPCCredService));
    exports.PatientService = PatientService;
});
define("services/BusinessInfoService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/jsonRPC/BusinessInfoService", ["require", "exports", "Handlers", "services/jsonRPC/jsonRpcService"], function (require, exports, Handlers_7, jsonRpcService_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BusinessInfoService = void 0;
    var BusinessInfoService = /** @class */ (function (_super) {
        __extends(BusinessInfoService, _super);
        function BusinessInfoService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BusinessInfoService.prototype.getBusinessInfo = function (cb) {
            var _this = this;
            var params = {};
            this.exec(Handlers_7.Handlers.HANDLER_GET_BUSINESS_INFO_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload["validationErrors"];
                cb(null, payload["businesses"]);
            });
        };
        BusinessInfoService.prototype.getBusinessInfoAsync = function () {
            var service = this;
            return new Promise(function (res, rej) {
                service.getBusinessInfo(function (err, businesses) {
                    if (err)
                        return rej(err);
                    res(businesses);
                });
            });
        };
        return BusinessInfoService;
    }(jsonRpcService_7.JsonRPCCredService));
    exports.BusinessInfoService = BusinessInfoService;
});
define("services/jsonRPC/index", ["require", "exports", "services/jsonRPC/xhr", "services/jsonRPC/AppointmentService", "services/jsonRPC/AppointmentResultService", "services/jsonRPC/PrescriptionService", "services/jsonRPC/DiagnosticReportService", "services/jsonRPC/AuthService", "services/jsonRPC/PatientService", "services/jsonRPC/BusinessInfoService", "services/jsonRPC/jsonRpcRequest"], function (require, exports, xhr_1, AppointmentService_1, AppointmentResultService_1, PrescriptionService_1, DiagnosticReportService_1, AuthService_3, PatientService_1, BusinessInfoService_1, jsonRpcRequest_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        Transports: {
            xhr: xhr_1.xhr,
        },
        JsonRpcHeader: jsonRpcRequest_2.JsonRpcHeader,
        AppointmentService: AppointmentService_1.AppointmentService,
        AppointmentResultService: AppointmentResultService_1.AppointmentResultService,
        PrescriptionService: PrescriptionService_1.PrescriptionService,
        DiagnosticReportService: DiagnosticReportService_1.DiagnosticReportService,
        AuthService: AuthService_3.AuthService,
        PatientService: PatientService_1.PatientService,
        BusinessInfoService: BusinessInfoService_1.BusinessInfoService,
    };
});
define("services/filters/index", ["require", "exports", "services/filters/PatientFilters", "services/filters/AppointmentFilters", "services/filters/DiagnosticReportFilters", "services/filters/PrescriptionFilters"], function (require, exports, PatientFilters_1, AppointmentFilters_2, DiagnosticReportFilters_1, PrescriptionFilters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        PatientByNameFilter: PatientFilters_1.PatientByNameFilter,
        PatientByMedCardFilter: PatientFilters_1.PatientByMedCardFilter,
        PatientByPhoneFilter: PatientFilters_1.PatientByPhoneFilter,
        PatientFilters: PatientFilters_1.PatientFilters,
        AppointmentByBusinessIdFilter: AppointmentFilters_2.AppointmentByBusinessIdFilter,
        AppointmentByCreatedFilter: AppointmentFilters_2.AppointmentByCreatedFilter,
        AppointmentByStartFilter: AppointmentFilters_2.AppointmentByStartFilter,
        AppointmentByPatientIdFilter: AppointmentFilters_2.AppointmentByPatientIdFilter,
        AppointmentFilters: AppointmentFilters_2.AppointmentFilters,
        DiagnosticReportByBusinessIdFilter: DiagnosticReportFilters_1.DiagnosticReportByBusinessIdFilter,
        DiagnosticReportByCreatedFilter: DiagnosticReportFilters_1.DiagnosticReportByCreatedFilter,
        DiagnosticReportByPatientIdFilter: DiagnosticReportFilters_1.DiagnosticReportByPatientIdFilter,
        DiagnosticReportFilters: DiagnosticReportFilters_1.DiagnosticReportFilters,
        PrescriptionByBusinessIdFilter: PrescriptionFilters_1.PrescriptionByBusinessIdFilter,
        PrescriptionByCreatedFilter: PrescriptionFilters_1.PrescriptionByCreatedFilter,
        PrescriptionByPatientIdFilter: PrescriptionFilters_1.PrescriptionByPatientIdFilter,
        PrescriptionFilters: PrescriptionFilters_1.PrescriptionFilters,
    };
});
define("services/index", ["require", "exports", "services/jsonRPC/index", "services/AuthService", "services/Credentials", "services/RpcErrorCodes", "services/filters/index"], function (require, exports, index_7, AuthService_4, Credentials_1, RpcErrorCodes_3, index_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        // InMemory
        //, BinRPC
        JsonRPC: index_7.default,
        PatientAuthenticationResult: AuthService_4.PatientAuthenticationResult,
        PatientAuthenticationStep: AuthService_4.PatientAuthenticationStep,
        PatientAuthenticationError: AuthService_4.PatientAuthenticationError,
        ConnectionError: AuthService_4.ConnectionError,
        getAuthenticatedPatient: AuthService_4.getAuthenticatedPatient,
        Credentials: Credentials_1.Credentials,
        RpcErrorCodes: RpcErrorCodes_3.RpcErrorCodes,
        Filters: index_8.default,
    };
});
define("formatters/Formatter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trim = exports.paragrathes_nl = exports.paragrathes = exports.dateISOFormat = void 0;
    var dateISOFormat = function (d) {
        return d == null ? "" : typeof d === "string" ? d : d.toISOString();
    };
    exports.dateISOFormat = dateISOFormat;
    function paragrathes(a) {
        if (a.length == 0)
            return "";
        // this is simple string
        if (a.length == 1 && a[0].length < 100 && a[0].indexOf("\n") < 0)
            return a[0];
        return a.join("\n\n");
    }
    exports.paragrathes = paragrathes;
    function paragrathes_nl(a, offset) {
        if (a.length == 0)
            return "";
        return "\n" + offset + a.join("\n\n");
    }
    exports.paragrathes_nl = paragrathes_nl;
    var trim = function (str) { return str.replace(/^\s+/, "").replace(/\s+$/, ""); };
    exports.trim = trim;
});
define("formatters/SimpleTextFormatter", ["require", "exports", "formatters/l10n/index", "formatters/Formatter"], function (require, exports, index_9, Formatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleTextFormatter = void 0;
    function alignStrings(obj, keys) {
        // find max strings length
        var ml = 0;
        for (var i = 0; i < keys.length; ++i)
            if (ml < obj[keys[i]].length)
                ml = obj[keys[i]].length;
        // pad_right all strings
        keys.forEach(function (key) { return (obj[key] = obj[key].padEnd(ml, " ")); });
    }
    function formatObject(obj, keys, notAlignedKeys, propFormats, localize, offset) {
        var ret = "";
        var localizedKeys = keys.reduce(function (ret, key) {
            ret[key] = localize[key];
            return ret;
        }, {});
        alignStrings(localizedKeys, keys.filter(function (key) { return !notAlignedKeys[key]; }));
        keys.forEach(function (key) {
            if (!obj[key] || (Array.isArray(obj[key]) && !obj[key].length))
                return;
            if (propFormats[key])
                ret +=
                    offset +
                        localizedKeys[key] +
                        " " +
                        propFormats[key](obj[key], offset + "    ") +
                        "\n";
            else
                ret += offset + localizedKeys[key] + " " + obj[key] + "\n";
        });
        ret += "\n";
        return ret;
    }
    var SimpleTextFormatter = /** @class */ (function () {
        function SimpleTextFormatter(localize, dateFormat) {
            if (dateFormat === void 0) { dateFormat = Formatter_1.dateISOFormat; }
            this._baseOffset = "";
            this._localize = localize;
            this._dateFormat = dateFormat;
        }
        SimpleTextFormatter.prototype.appointmentResult = function (ar, offset) {
            if (offset === void 0) { offset = ""; }
            var keys = [
                "created",
                "start",
                "doctor",
                "duration",
                "anamnesis",
                "medicalExaminationResult",
                "diagnosis",
                "recommendations",
                "scheduledProcedures",
                "prescriptions",
            ];
            var propFormats = {
                created: this._dateFormat.bind(this),
                start: this._dateFormat.bind(this),
                doctor: this.doctor.bind(this),
                anamnesis: this.anamnesis.bind(this),
                medicalExaminationResult: this.medicalExaminationResult.bind(this),
                diagnosis: this.diagnosisOffset.bind(this),
                recommendations: this.procedures.bind(this),
                scheduledProcedures: this.procedures.bind(this),
                prescriptions: this.prescriptions.bind(this),
            };
            var notAlignedKeys = {
                scheduledProcedures: 1,
                prescriptions: 1,
            };
            return formatObject(ar, keys, notAlignedKeys, propFormats, this._localize["appointmentResult"], offset);
        };
        SimpleTextFormatter.prototype.medicalExaminationResult = function (ar, offset) {
            ar = ar.map(function (line) {
                var m = line.match(/([^:]*):(.*)/);
                if (m) {
                    m[1] = Formatter_1.trim(m[1]);
                    return (m[1] ? m[1] + ": " : "") + Formatter_1.trim(m[2]);
                }
                return line;
            });
            return "\n" + Formatter_1.paragrathes(ar) + "\n\n";
        };
        SimpleTextFormatter.prototype.anamnesis = function (ar, offset) {
            return "\n" + Formatter_1.paragrathes(ar) + "\n";
        };
        SimpleTextFormatter.prototype.duration = function (n) {
            return n.toString() + " " + this._localize["MINUTE_UNIT"];
        };
        SimpleTextFormatter.prototype.doctor = function (d, offset) {
            if (offset === void 0) { offset = ""; }
            return d.name + " " + d.surname;
        };
        SimpleTextFormatter.prototype.diagnosis = function (d) {
            return this.diagnosisOffset(d, this._baseOffset);
        };
        SimpleTextFormatter.prototype.diagnosisOffset = function (d, offset) {
            var itemToString = function (item) {
                return item.description + (item.cd10 ? " (cd10: " + item.cd10 + ")" : "");
            };
            if (d.length === 0)
                return "";
            if (d.length == 1 &&
                d[0].description.length < 100 &&
                d[0].description.indexOf("\n") < 0) {
                var hasKeyValue = typeof d[0].description === "string" &&
                    d[0].description.match(/([^:]*):(.*)/);
                return (hasKeyValue ? "\n" : "") + itemToString(d[0]);
            }
            return "\n" + d.map(itemToString).join("\n\n");
        };
        SimpleTextFormatter.prototype.procedures = function (p, offset) {
            var this_ = this;
            return ("\n" +
                p
                    .map(function (item, i) {
                    return offset + (i + 1).toString() + ".\n" + this_.procedure(item, offset);
                })
                    .join("\n"));
        };
        SimpleTextFormatter.prototype.procedure = function (p, offset) {
            if (offset === void 0) { offset = ""; }
            var keys = [
                "created",
                "title",
                "services",
                "type",
                "required",
                "status",
                "period",
                "strictPeriod",
                "preparations",
                "requiredPreparations",
            ];
            var propFormats = {
                services: this.services.bind(this),
                type: this.procedureType.bind(this),
                required: this.yesNo.bind(this),
                status: this.procedureExecStatus.bind(this),
                period: this.period.bind(this),
                strictPeriod: this.period.bind(this),
                preparations: Formatter_1.paragrathes_nl,
                requiredPreparations: Formatter_1.paragrathes_nl,
            };
            var notAlignedKeys = {
                period: 1,
                strictPeriod: 1,
                preparations: 1,
                requiredPreparations: 1,
            };
            return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["procedure"], offset);
        };
        SimpleTextFormatter.prototype.yesNo = function (b, offset) {
            return b ? this._localize["YES"] : this._localize["NO"];
        };
        SimpleTextFormatter.prototype.prescriptions = function (p, offset) {
            var _this_1 = this;
            return "\n" + p.map(function (item) { return _this_1.prescription(item, offset); }).join("\n");
        };
        SimpleTextFormatter.prototype.prescription = function (p, offset) {
            if (offset === void 0) { offset = ""; }
            var keys = [
                "created",
                "title",
                "recorderDoctor",
                "medications",
                "dosageText",
                "reasonText",
                "validityPeriod",
                "numberOfRepeats",
            ];
            var propFormats = {
                recorderDoctor: this.doctor.bind(this),
                validityPeriod: this.period.bind(this),
                medications: this.medications.bind(this),
                created: this._dateFormat.bind(this),
            };
            var notAlignedKeys = {
                validityPeriod: 1,
            };
            return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["Prescription"], offset);
        };
        SimpleTextFormatter.prototype.medications = function (s, offset) {
            var _this_1 = this;
            return "\n" + s.map(function (item) { return _this_1.medication(item, offset); }).join("\n");
        };
        SimpleTextFormatter.prototype.medication = function (s, offset) {
            if (offset === void 0) { offset = ""; }
            return (this._localize["MedicationForm"][s.form] +
                ". " +
                s.amount +
                " шт. Срок годности:" +
                this._dateFormat(s.expirationDate));
        };
        SimpleTextFormatter.prototype.services = function (s, offset) {
            var _this_1 = this;
            return "\n" + s.map(function (item) { return _this_1.service(item, offset); }).join("\n");
        };
        SimpleTextFormatter.prototype.service = function (s, offset) {
            return "";
        };
        SimpleTextFormatter.prototype.procedureType = function (type) {
            return this._localize["procedureType"][type];
        };
        SimpleTextFormatter.prototype.procedureExecStatus = function (status) {
            return this._localize["ProcedureExecStatus"][status];
        };
        SimpleTextFormatter.prototype.period = function (period, offset) {
            return ("\n" +
                offset +
                this._localize["Period"]["begin"] +
                " " +
                this._dateFormat(period.begin) +
                "\n" +
                offset +
                this._localize["Period"]["end"] +
                " " +
                this._dateFormat(period.end) +
                "\n");
        };
        SimpleTextFormatter.prototype.diagnosticReport = function (dr, offset) {
            if (offset === void 0) { offset = ""; }
            var _this = this;
            return (offset +
                this.diagnosticReportTitle(dr) +
                "\n" +
                "\n" +
                offset +
                this._localize["CREATED"] +
                " " +
                this._dateFormat(dr.issuedDate) +
                "\n" +
                offset +
                this._localize["DiagnosticReport"]["Doctor"] +
                " " +
                dr.resultInterpreter.map(function (d) { return _this.doctor(d); }) +
                "\n" +
                offset +
                this._localize["DiagnosticReport"]["Result"] +
                "\n" +
                offset +
                this.observations(dr.result, offset + "  ") +
                (dr.effectivePeriod && dr.effectivePeriod.begin
                    ? "\n" +
                        offset +
                        this._localize["DiagnosticReport"]["EffectivePeriod"] +
                        this.period(dr.effectivePeriod, offset + "  ")
                    : "") +
                (dr.resultInterpretation && dr.resultInterpretation.length
                    ? "\n" + offset + "\n" + Formatter_1.paragrathes_nl(dr.resultInterpretation, offset)
                    : "") +
                (dr.imagineMedia && dr.imagineMedia.length
                    ? "\n" +
                        offset +
                        "\n" +
                        offset +
                        this._localize["DiagnosticReport"]["Images"] +
                        dr.imagineMedia.map(function (img) { return +"\n" + offset + img; })
                    : "") +
                (dr.attachments && dr.attachments.length
                    ? "\n" +
                        offset +
                        "\n" +
                        offset +
                        this._localize["DiagnosticReport"]["Attachments"] +
                        dr.attachments.map(function (a) { return +"\n" + offset + a; })
                    : ""));
        };
        SimpleTextFormatter.prototype.diagnosticReportTitle = function (dr) {
            return dr.services.map(function (s) { return s.name; }).join(", ");
        };
        SimpleTextFormatter.prototype.observations = function (o, offset) {
            var _this = this;
            return o
                .filter(function (o) { return typeof o.value.value === "string"; })
                .map(function (o) { return _this.observation(o, offset) + "\n"; })
                .join("\n");
        };
        SimpleTextFormatter.prototype.observation = function (o, offset) {
            if (offset === void 0) { offset = ""; }
            var prefix;
            if (o.observationKey)
                prefix = offset + o.observationKey + ": ";
            else
                prefix = offset;
            var text = "";
            if (typeof o.value.value === "string") {
                // multiline text
                if (o.value.value.indexOf("\n") >= 0)
                    text =
                        (prefix !== offset ? prefix + "\n" : "") +
                            Formatter_1.trim(o.value.value)
                                .split("\n")
                                .map(function (line) { return offset + Formatter_1.trim(line); })
                                .join("\n");
                else
                    text = prefix + Formatter_1.trim(o.value.value);
            }
            return text;
        };
        SimpleTextFormatter.LOCALIZE = {
            "ru-ru": index_9.default.ruRU,
            "en-us": index_9.default.enUS,
        };
        return SimpleTextFormatter;
    }());
    exports.SimpleTextFormatter = SimpleTextFormatter;
});
define("formatters/FieldsFormatter", ["require", "exports", "formatters/l10n/index", "formatters/Formatter", "types/index", "types/ObservationType", "types/DiscountType"], function (require, exports, index_10, Formatter_2, index_11, ObservationType_1, DiscountType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FieldsFormatter = exports.buildFieldArray = exports.FieldItemModeMeta = exports.FieldMeta = exports.Field = exports.FieldItemMode = exports.FieldStatusColor = exports.FieldType = void 0;
    var FieldType;
    (function (FieldType) {
        FieldType["Text"] = "text";
        FieldType["Number"] = "number";
        FieldType["List"] = "list";
        FieldType["Object"] = "object";
        FieldType["Date"] = "date";
        FieldType["DateTime"] = "dateTime";
        FieldType["DatePeriod"] = "datePeriod";
        FieldType["Email"] = "email";
        FieldType["Price"] = "price";
        FieldType["Status"] = "status";
        FieldType["Paragraphs"] = "paragraphs";
        FieldType["ObjectList"] = "objectList";
        FieldType["MediaList"] = "mediaList";
        FieldType["AttachmentList"] = "attachmentList";
        FieldType["Hidden"] = "hidden";
    })(FieldType = exports.FieldType || (exports.FieldType = {}));
    var FieldStatusColor;
    (function (FieldStatusColor) {
        FieldStatusColor["Red"] = "red";
        FieldStatusColor["Yellow"] = "yellow";
        FieldStatusColor["Blue"] = "blue";
        FieldStatusColor["Green"] = "green";
    })(FieldStatusColor = exports.FieldStatusColor || (exports.FieldStatusColor = {}));
    var FieldItemMode;
    (function (FieldItemMode) {
        FieldItemMode["FirstLine"] = "firstLine";
        FieldItemMode["SecondLine"] = "secondLine";
        FieldItemMode["ThirdLine"] = "thirdLine";
        FieldItemMode["Hidden"] = "hidden";
        FieldItemMode["Picture"] = "picture";
    })(FieldItemMode = exports.FieldItemMode || (exports.FieldItemMode = {}));
    var Field = /** @class */ (function () {
        function Field() {
        }
        return Field;
    }());
    exports.Field = Field;
    /**
     * Meta data about field representation.
     */
    var FieldMeta = /** @class */ (function () {
        function FieldMeta() {
        }
        return FieldMeta;
    }());
    exports.FieldMeta = FieldMeta;
    var FieldItemModeMeta = /** @class */ (function () {
        function FieldItemModeMeta() {
        }
        return FieldItemModeMeta;
    }());
    exports.FieldItemModeMeta = FieldItemModeMeta;
    function buildFieldArray(data, meta, t, priorKeys, itemModeMeta) {
        var _a, _b, _c;
        if (priorKeys === void 0) { priorKeys = []; }
        if (itemModeMeta === void 0) { itemModeMeta = null; }
        var keys = priorKeys
            .concat(Object.keys(meta))
            .filter(function (k, i, self) { return self.indexOf(k) === i; }); // uniq keys
        if (t == null) {
            t = {};
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var k = keys_1[_i];
                t[k] = k;
            }
        }
        var ans = [];
        for (var _d = 0, keys_2 = keys; _d < keys_2.length; _d++) {
            var key = keys_2[_d];
            if (meta[key].composite)
                ans.push({
                    key: key,
                    title: t[key],
                    type: (_a = meta[key]) === null || _a === void 0 ? void 0 : _a.type,
                    hint: t[key + "Hint"],
                    originValue: data[key],
                    value: meta[key].format(data),
                });
            else
                ans.push({
                    key: key,
                    title: t[key],
                    type: (_b = meta[key]) === null || _b === void 0 ? void 0 : _b.type,
                    hint: t[key + "Hint"],
                    originValue: data[key],
                    value: ((_c = meta[key]) === null || _c === void 0 ? void 0 : _c.format) ? meta[key].format(data[key]) : data[key],
                });
        }
        if (itemModeMeta != null) {
            ans.push({
                key: "__itemModeFirstLine__",
                itemMode: FieldItemMode.FirstLine,
                title: "itemModeFirstLine",
                type: FieldType.Hidden,
                hint: "",
                originValue: data,
                value: itemModeMeta.firstLine(data),
            });
            ans.push({
                key: "__itemModeSecondLine__",
                itemMode: FieldItemMode.SecondLine,
                title: "itemModeSecondLine",
                type: FieldType.Hidden,
                hint: "",
                originValue: data,
                value: itemModeMeta.secondLine(data),
            });
            if (itemModeMeta.thirdLine != null) {
                ans.push({
                    key: "__itemModeThirdLine__",
                    itemMode: FieldItemMode.ThirdLine,
                    title: "itemModeThirdLine",
                    type: FieldType.Hidden,
                    hint: "",
                    originValue: data,
                    value: itemModeMeta.thirdLine(data),
                });
            }
        }
        return ans;
    }
    exports.buildFieldArray = buildFieldArray;
    var FieldsFormatter = /** @class */ (function () {
        function FieldsFormatter(localize, dateFormat) {
            if (dateFormat === void 0) { dateFormat = Formatter_2.dateISOFormat; }
            this._localize = localize;
            this._dateFormat = dateFormat;
        }
        FieldsFormatter.create = function (locale, dateFormat) {
            if (dateFormat === void 0) { dateFormat = Formatter_2.dateISOFormat; }
            return new FieldsFormatter(index_10.default.getByLocaleCode(locale), dateFormat);
        };
        // ----------------------------------
        // Common field definitions
        FieldsFormatter.prototype.dateField = function (opts) {
            var this_ = this;
            var format = function (intl, val) {
                if (typeof val == "string")
                    val = new Date(Date.parse(val));
                var d = val;
                if (d.getFullYear() === 0 || d.getFullYear() === 1)
                    return "не определено";
                return intl.format(d);
            };
            return {
                type: (opts === null || opts === void 0 ? void 0 : opts.dateOnly) ? FieldType.Date : FieldType.DateTime,
                format: (opts === null || opts === void 0 ? void 0 : opts.dateOnly)
                    ? function (val) { return format(new Intl.DateTimeFormat("ru"), val); }
                    : function (val) {
                        return format(new Intl.DateTimeFormat("ru", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        }), val);
                    },
            };
        };
        FieldsFormatter.prototype.textField = function () {
            return {
                type: FieldType.Text,
                format: function (val) { return val; },
            };
        };
        FieldsFormatter.prototype.numberField = function () {
            return {
                type: FieldType.Number,
                format: function (val) { return val; },
            };
        };
        // ----------------------------------
        // Specific field definitions
        FieldsFormatter.prototype.businessField = function () {
            return {
                type: FieldType.Object,
                format: this.business.bind(this),
            };
        };
        FieldsFormatter.prototype.doctorField = function () {
            return { type: FieldType.Text, format: this.doctor.bind(this) };
        };
        FieldsFormatter.prototype.doctorsField = function () {
            return { type: FieldType.List, format: this.doctors.bind(this) };
        };
        FieldsFormatter.prototype.anamnesisField = function () {
            return {
                type: FieldType.List,
                format: this.anamnesis.bind(this),
            };
        };
        FieldsFormatter.prototype.medicalExaminationResultField = function () {
            return {
                type: FieldType.Paragraphs,
                format: this.medicalExaminationResult.bind(this),
            };
        };
        FieldsFormatter.prototype.diagnosisField = function () {
            return {
                type: FieldType.Object,
                format: this.diagnosis.bind(this),
            };
        };
        FieldsFormatter.prototype.FormattedFieldList = function (format) {
            return {
                type: FieldType.Object,
                format: format,
            };
        };
        FieldsFormatter.prototype.idField = function () {
            return {
                type: FieldType.Text,
                format: function (val) { return val; },
            };
        };
        FieldsFormatter.prototype.activeField = function () {
            var _this = this;
            return {
                type: FieldType.Text,
                format: function (val) {
                    return val
                        ? _this._localize["ActiveStatus"]["active"]
                        : _this._localize["ActiveStatus"]["disactive"];
                },
            };
        };
        FieldsFormatter.prototype.statusField = function () {
            return {
                type: FieldType.Status,
                format: function (val) {
                    return ({
                        color: "green",
                        text: "Active",
                    });
                },
            };
        };
        FieldsFormatter.prototype.patientField = function () {
            return {
                type: FieldType.Object,
                format: this.patientInfo.bind(this),
            };
        };
        FieldsFormatter.prototype.phonesField = function () {
            return {
                type: FieldType.List,
                format: function (val) { return val; },
            };
        };
        FieldsFormatter.prototype.emailField = function () {
            return {
                type: FieldType.Email,
                format: function (val) { return val; },
            };
        };
        FieldsFormatter.prototype.genderField = function () {
            var t = this._localize["Gender"];
            return {
                type: FieldType.Text,
                format: function (val) { return t[val]; },
            };
        };
        FieldsFormatter.prototype.paragrathesField = function () {
            return {
                type: FieldType.Paragraphs,
                format: function (val) { return val; },
            };
        };
        FieldsFormatter.prototype.diagnosisTypeField = function () {
            var _this = this;
            return {
                type: FieldType.Text,
                format: function (val) {
                    return val == ObservationType_1.ObservationType.LaboratoryTest
                        ? _this._localize["DiagnosisType"]["laboratoryTest"]
                        : val == ObservationType_1.ObservationType.Observation
                            ? _this._localize["DiagnosisType"]["observation"]
                            : _this._localize["DiagnosisType"]["unknown"] + " (#" + val + ")";
                },
            };
        };
        FieldsFormatter.prototype.diagnosisCategoryField = function () {
            return {
                type: FieldType.Text,
                format: function (val) { return val; },
            };
        };
        FieldsFormatter.prototype.periodField = function (opts) {
            var _this = this;
            return {
                type: FieldType.DatePeriod,
                format: function (val) {
                    var _a, _b;
                    var period = val;
                    var textPeriod = val;
                    return {
                        from: _this.dateField(opts).format(period.begin),
                        fromIsZero: period.begin === null || typeof period.begin == "string"
                            ? textPeriod.begin.substr(0, 1) == "0"
                            : ((_a = period.begin) === null || _a === void 0 ? void 0 : _a.getTime()) === 0,
                        to: _this.dateField(opts).format(period.end),
                        toIsZero: period.end === null || typeof period.end == "string"
                            ? textPeriod.end.substr(0, 1) == "0"
                            : ((_b = period.end) === null || _b === void 0 ? void 0 : _b.getTime()) === 0,
                    };
                },
            };
        };
        FieldsFormatter.prototype.appointmentResultsField = function () {
            var _this = this;
            return {
                type: FieldType.ObjectList,
                format: function (val) {
                    return val.map(_this.appointmentResult.bind(_this));
                },
            };
        };
        FieldsFormatter.prototype.appointmentResultField = function () {
            var this_ = this.textField;
            return {
                type: FieldType.Object,
                format: this.appointmentResult.bind(this_),
            };
        };
        FieldsFormatter.prototype.servicesField = function () {
            var this_ = this;
            return {
                type: FieldType.List,
                format: function (val) {
                    return val.map(function (item) { return item.name; });
                },
            };
        };
        FieldsFormatter.prototype.priceField = function () {
            return {
                type: FieldType.Object,
                format: this.clientPrice.bind(this),
            };
        };
        FieldsFormatter.prototype.currencyField = function () {
            var t = this._localize["Currency"];
            return {
                type: FieldType.Text,
                format: function (val) { return t[val]; },
            };
        };
        FieldsFormatter.prototype.priceFormat = function (val, cur) {
            var cp = this._localize["currencyPosition"];
            var t = this._localize["Currency"];
            return cp == "left" ? t[cur] + "" + val : "" + val + t[cur];
        };
        FieldsFormatter.prototype.plural = function (n, one, many) {
            return n == 1 ? "" + n + " " + one : "" + n + " " + many;
        };
        FieldsFormatter.prototype.durationFormat = function (val) {
            var t = this._localize["Duration"];
            var fm = val;
            if (fm == 0)
                return "";
            var h = this.plural(fm / 60, t["hour"], t["hours"]);
            var m = this.plural(fm % 60, t["minute"], t["minutes"]);
            return h + " " + m;
        };
        FieldsFormatter.prototype.durationField = function () {
            var this_ = this;
            return {
                type: FieldType.Text,
                format: function (val) { return this_.durationFormat(val); },
            };
        };
        FieldsFormatter.prototype.mediasField = function () {
            return {
                type: FieldType.MediaList,
                format: function (val) {
                    if (!val || val.length == 0) {
                        val = [
                            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyM3x8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNHx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNXx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                            "https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNnx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                            "https://images.unsplash.com/photo-1570158268183-d296b2892211?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyN3x8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                            "https://images.unsplash.com/photo-1515023115689-589c33041d3c?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyOHx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyOXx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                            "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwzMHx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        ];
                    }
                    return val;
                },
            };
        };
        FieldsFormatter.prototype.attachmentsField = function () {
            return {
                type: FieldType.AttachmentList,
                format: function (val) {
                    if (!val || val.length == 0) {
                        val = [
                            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyM3x8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNHx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixid=MnwyNDUwMjR8MHwxfHNlYXJjaHwyNXx8cG9ydHJhaXR8ZW58MHx8fHwxNjMxMjg1OTkx&ixlib=rb-1.2.1&cs=tinysrgb&fm=jpg&fit=facearea&facepad=4&q=60&w=256&h=256",
                        ];
                    }
                    return val;
                },
            };
        };
        // --------------------------------
        // public interface methods
        FieldsFormatter.prototype.business = function (b) {
            if (b == null)
                return [];
            var meta = {
                id: this.idField(),
                name: this.textField(),
                location: this.textField(),
            };
            var itemModeMeta = {
                firstLine: function (b) {
                    return b.name;
                },
                secondLine: function (b) {
                    return b.location.split(",")[0];
                },
            };
            return buildFieldArray(b, meta, this._localize["business"], [], itemModeMeta);
        };
        FieldsFormatter.prototype.clientPrice = function (p) {
            if (p == null)
                return [];
            var t = this._localize["Currency"];
            var this_ = this;
            var meta = {
                currency: this.currencyField(),
                originValue: this.numberField(),
                discountValue: this.numberField(),
                value: this.numberField(),
                discount: {
                    type: FieldType.Text,
                    format: function (val) {
                        var d = val;
                        return d.discountType == DiscountType_1.DiscountType.Percent
                            ? d.discountPercent + "%"
                            : this_.priceFormat(d.discountValue, index_11.Currency.Rur);
                    },
                },
            };
            return buildFieldArray(p, meta, this._localize["ClientPrice"]);
        };
        FieldsFormatter.prototype.clientPriceText = function (p) {
            return this.priceFormat(p.value, p.currency);
        };
        FieldsFormatter.prototype.service = function (s) {
            var meta = {
                id: this.idField(),
                name: this.textField(),
                price: this.priceField(),
                duration: this.durationField(),
            };
            var this_ = this;
            var itemModeMeta = {
                firstLine: function (s) { return s.name; },
                secondLine: function (s) {
                    var d = this_.duration(s.duration);
                    return ((d ? d + " " : "") + (s.price ? this_.clientPriceText(s.price) : ""));
                },
            };
            return buildFieldArray(s, meta, this._localize["service"], [], itemModeMeta);
        };
        FieldsFormatter.prototype.fullPatientNameField = function () {
            var this_ = this;
            return {
                type: FieldType.Text,
                composite: true,
                format: function (val) {
                    return (val.name +
                        (val.middleName ? " " + val.middleName : "") +
                        " " +
                        val.surname);
                },
            };
        };
        FieldsFormatter.prototype.patientMessage = function (p) {
            var meta = {
                id: this.idField(),
                fullName: this.fullPatientNameField(),
                phones: this.phonesField(),
                email: this.emailField(),
                gender: this.genderField(),
                birthdate: this.dateField({ dateOnly: true }),
                address: this.textField(),
                medcardNumber: this.textField(),
            };
            var itemModeMeta = {
                firstLine: function (p) {
                    return p.name + " " + p.surname;
                },
                secondLine: function (p) {
                    return p.medcardNumber ? "#" + p.medcardNumber : "";
                },
                thirdLine: function (p) {
                    return "";
                    return p.phones.join(", ");
                },
            };
            return buildFieldArray(p, meta, this._localize["patient"], [], itemModeMeta);
        };
        FieldsFormatter.prototype.patientInfo = function (p) {
            var meta = {
                id: this.idField(),
                surname: this.textField(),
                middleName: this.textField(),
                name: this.textField(),
                phones: this.phonesField(),
                email: this.emailField(),
                gender: this.genderField(),
                birthdate: this.dateField({ dateOnly: true }),
                medcardNumber: this.textField(),
                descriptionText: this.paragrathesField(),
            };
            var itemModeMeta = {
                firstLine: function (p) {
                    return p.name + " " + p.surname;
                },
                secondLine: function (p) {
                    return p.medcardNumber ? "#" + p.medcardNumber : "";
                },
                thirdLine: function (p) {
                    return "";
                    return p.phones.join(", ");
                },
            };
            return buildFieldArray(p, meta, this._localize["patient"], [], itemModeMeta);
        };
        FieldsFormatter.prototype.appointment = function (a) {
            var meta = {
                business: this.businessField(),
                created: this.dateField(),
                start: this.dateField(),
                doctor: this.doctorField(),
            };
            return buildFieldArray(a, meta, this._localize["appointment"]);
        };
        FieldsFormatter.prototype.appointmentResult = function (ar) {
            var meta = {
                business: this.businessField(),
                created: this.dateField(),
                start: this.dateField(),
                doctor: this.doctorField(),
                anamnesis: this.anamnesisField(),
                medicalExaminationResult: this.medicalExaminationResultField(),
                diagnosis: this.diagnosisField(),
                recommendations: this.FormattedFieldList(this.procedures.bind(this)),
                scheduledProcedures: this.FormattedFieldList(this.procedures.bind(this)),
                prescriptions: this.FormattedFieldList(this.prescriptions.bind(this)),
            };
            return buildFieldArray(ar, meta, this._localize["appointmentResult"]);
        };
        FieldsFormatter.prototype.diagnosis = function (d) {
            if (d == null || d.length === 0)
                return [];
            var t = this._localize;
            return d.map(function (v) { return ({
                key: "",
                title: "",
                hint: "",
                type: FieldType.Text,
                originValue: v,
                value: "cd10 " + v.cd10 + "\n" + v.description + "\n\n",
            }); });
        };
        FieldsFormatter.prototype.procedure = function (p) {
            throw new Error("Method not implemented.");
        };
        FieldsFormatter.prototype.procedures = function (p) {
            if (p == null || p.length == 0)
                return [];
            var this_ = this;
            return p.reduce(function (ret, item, i) { return ret.concat(this_.procedure(item)); }, []);
        };
        FieldsFormatter.prototype.prescriptions = function (p) {
            var _this = this;
            if (p == null)
                return "";
            return "\n" + p.map(function (item) { return _this.prescription(item); }).join("\n");
        };
        FieldsFormatter.prototype.medicationsField = function () {
            var this_ = this;
            return {
                type: FieldType.ObjectList,
                format: function (val) {
                    var meds = val;
                    return meds.map(function (m) { return this_.medication(m); });
                },
            };
        };
        FieldsFormatter.prototype.prescription = function (p) {
            var meta = {
                created: this.dateField(),
                recorderDoctor: this.doctorField(),
                validityPeriod: this.periodField(),
                dosageText: {
                    type: FieldType.Paragraphs,
                    format: function (val) {
                        if (!val)
                            return [];
                        var str = val;
                        return str.split("\r\n");
                    },
                },
                medications: this.medicationsField(),
                reasonText: this.textField(),
                numberOfRepeats: this.numberField(),
            };
            return buildFieldArray(p, meta, this._localize["Prescription"]);
        };
        FieldsFormatter.prototype.medication = function (m) {
            var this_ = this;
            var meta = {};
            var itemModeMeta = {
                firstLine: function (m) {
                    return m.name + " " + m.itemSize;
                },
                secondLine: function (m) {
                    return m.code + " " + m.codeTable;
                },
            };
            return buildFieldArray(m, meta, this._localize["Medication"], [], itemModeMeta);
        };
        FieldsFormatter.prototype.observation = function (o) {
            var meta = {};
            var this_ = this;
            var itemModeMeta = {
                firstLine: function (o) {
                    return o.observationKey;
                },
                secondLine: function (o) {
                    return (
                    // this_._dateFormat(o.issuedDate) +
                    " "
                    // + this_.doctor(o.performerDoctor)
                    );
                },
                thirdLine: function (o) {
                    return Formatter_2.paragrathes(o.interpretation);
                },
            };
            return buildFieldArray(o, meta, this._localize["Observation"], [], itemModeMeta);
        };
        FieldsFormatter.prototype.observationsField = function () {
            var this_ = this;
            return {
                type: FieldType.ObjectList,
                format: function (val) {
                    var obs = val;
                    return obs.map(function (o) { return this_.observation(o); });
                },
            };
        };
        FieldsFormatter.prototype.diagnosticReport = function (dr) {
            var meta = {
                id: this.idField(),
                active: this.activeField(),
                business: this.businessField(),
                patient: this.patientField(),
                status: this.statusField(),
                type: this.diagnosisTypeField(),
                category: this.diagnosisCategoryField(),
                effectivePeriod: this.periodField({ dateOnly: true }),
                issuedDate: this.dateField({ dateOnly: true }),
                result: this.observationsField(),
                services: this.servicesField(),
                resultInterpreter: this.doctorsField(),
                resultInterpretation: this.paragrathesField(),
                imagineMedia: this.mediasField(),
                attachments: this.attachmentsField(),
            };
            return buildFieldArray(dr, meta, this._localize["DiagnosticReport"]);
        };
        // --------------------------------
        // private utility methods
        FieldsFormatter.prototype.anamnesis = function (a) {
            return a;
        };
        FieldsFormatter.prototype.duration = function (n) {
            return this.durationFormat(n);
        };
        FieldsFormatter.prototype.doctor = function (d) {
            if (d == null)
                return "";
            return d.name + " " + d.surname;
        };
        FieldsFormatter.prototype.doctors = function (doctors) {
            var this_ = this;
            return doctors.map(function (d) { return this_.doctor(d); });
        };
        FieldsFormatter.prototype.yesNo = function (b) {
            return b ? this._localize["YES"] : this._localize["NO"];
        };
        FieldsFormatter.prototype.medicalExaminationResult = function (ar) {
            if (ar == null)
                return [];
            ar = ar.map(function (line) {
                var m = line.match(/([^:]*):(.*)/);
                if (m) {
                    m[1] = Formatter_2.trim(m[1]);
                    return (m[1] ? m[1] + ": " : "") + Formatter_2.trim(m[2]);
                }
                return line;
            });
            return ar;
        };
        FieldsFormatter.prototype.period = function (period, offset) {
            return ("\n" +
                offset +
                this._localize["Period"]["begin"] +
                " " +
                this._dateFormat(period.begin) +
                "\n" +
                offset +
                this._localize["Period"]["end"] +
                " " +
                this._dateFormat(period.end) +
                "\n");
        };
        return FieldsFormatter;
    }());
    exports.FieldsFormatter = FieldsFormatter;
});
define("formatters/index", ["require", "exports", "formatters/LocaleCode", "formatters/SimpleTextFormatter", "formatters/FieldsFormatter"], function (require, exports, LocaleCode_1, SimpleTextFormatter_1, FieldsFormatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        LocaleCode: LocaleCode_1.LocaleCode,
        SimpleTextFormatter: SimpleTextFormatter_1.SimpleTextFormatter,
        FieldsFormatter: FieldsFormatter_1.FieldsFormatter,
    };
});
define("messages/index", ["require", "exports", "messages/AppointmentMessage"], function (require, exports, AppointmentMessage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        AppointmentMessage: AppointmentMessage_1.AppointmentMessage,
    };
});
define("MedMe", ["require", "exports", "types/index", "models/index", "services/index", "formatters/index", "Handlers", "messages/index"], function (require, exports, Types, index_12, index_13, index_14, Handlers_8, index_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EHR = void 0;
    exports.EHR = {
        SDK_VERSION: "1.8.13",
        Types: Types,
        Models: index_12.default,
        Services: index_13.default,
        Formatters: index_14.default,
        Handlers: Handlers_8.Handlers,
        Messages: index_15.default,
    };
});
