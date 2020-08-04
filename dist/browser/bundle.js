var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("types/BusinessInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var Doctor = /** @class */ (function () {
        function Doctor() {
        }
        Doctor.prototype.fromJson = function (json) {
            this.id = json.id;
            this.surname = json.surname;
            this.name = json.name;
            this.specialization = json.specialization ? (new Specialization_1.Specialization()).fromJson(json.specialization) : new Specialization_1.Specialization();
            return this;
        };
        Doctor.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.surname = this.surname;
            payload.name = this.name;
            payload.specialization = this.specialization ? this.specialization.toJson() : null;
            return payload;
        };
        return Doctor;
    }());
    exports.Doctor = Doctor;
});
define("types/Currency", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Currency;
    (function (Currency) {
        Currency[Currency["Rur"] = 0] = "Rur";
        Currency[Currency["Usd"] = 1] = "Usd";
    })(Currency = exports.Currency || (exports.Currency = {}));
    ;
});
define("types/DiscountType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DiscountType;
    (function (DiscountType) {
        DiscountType[DiscountType["Percent"] = 0] = "Percent";
        DiscountType[DiscountType["Absolute"] = 1] = "Absolute";
    })(DiscountType = exports.DiscountType || (exports.DiscountType = {}));
    ;
});
define("types/Discount", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var AppointmentConfirmationStatus;
    (function (AppointmentConfirmationStatus) {
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["Tentative"] = 0] = "Tentative";
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["ConfirmedByClient"] = 1] = "ConfirmedByClient";
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["ConfirmedByBusiness"] = 2] = "ConfirmedByBusiness";
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["CancelledByClient"] = 3] = "CancelledByClient";
        AppointmentConfirmationStatus[AppointmentConfirmationStatus["CancelledByBusiness"] = 4] = "CancelledByBusiness";
    })(AppointmentConfirmationStatus = exports.AppointmentConfirmationStatus || (exports.AppointmentConfirmationStatus = {}));
    ;
});
define("types/AppointmentSource", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/AppointmentHistoryItem", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var ProcedureType;
    (function (ProcedureType) {
        ProcedureType[ProcedureType["Recomendation"] = 0] = "Recomendation";
        ProcedureType[ProcedureType["Precedure"] = 1] = "Precedure";
        ProcedureType[ProcedureType["Analisys"] = 2] = "Analisys";
    })(ProcedureType = exports.ProcedureType || (exports.ProcedureType = {}));
    ;
});
define("types/ProcedureInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            payload.begin = this.begin;
            payload.end = this.end;
            return payload;
        };
        return Period;
    }());
    exports.Period = Period;
});
define("types/Procedure", ["require", "exports", "types/Service", "types/Period"], function (require, exports, Service_1, Period_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.services = json.services ? json.services.map(function (s) { return (new Service_1.Service).fromJson(s); }) : [];
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
            var payload;
            payload.id = this.id;
            payload.created = this.created;
            payload.title = this.title;
            payload.services = this.services ? this.services.map(function (s) { return s.toJson(); }) : [];
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
    var Gender;
    (function (Gender) {
        Gender[Gender["Male"] = 1] = "Male";
        Gender[Gender["Fename"] = 2] = "Fename";
        Gender[Gender["Other"] = 3] = "Other";
        Gender[Gender["Unknown"] = 4] = "Unknown";
    })(Gender = exports.Gender || (exports.Gender = {}));
    ;
});
define("types/PatientInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            payload.date = this.date;
            return payload;
        };
        return PatientInfo;
    }());
    exports.PatientInfo = PatientInfo;
});
define("types/MedicationForm", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MedicationForm;
    (function (MedicationForm) {
        MedicationForm[MedicationForm["Powder"] = 0] = "Powder";
        MedicationForm[MedicationForm["Tablets"] = 1] = "Tablets";
        MedicationForm[MedicationForm["Capsule"] = 2] = "Capsule";
    })(MedicationForm = exports.MedicationForm || (exports.MedicationForm = {}));
    ;
});
define("types/Medication", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Medication = /** @class */ (function () {
        function Medication() {
        }
        Medication.prototype.fromJson = function (json) {
            this.form = json.from;
            this.amount = json.amount;
            this.expirationDate = json.expirationDate;
        };
        Medication.prototype.toJson = function () {
            var payload;
            payload.form = this.form;
            payload.amount = this.amount;
            payload.expirationDate = this.expirationDate;
            return payload;
        };
        return Medication;
    }());
    exports.Medication = Medication;
});
define("types/PrescriptionInfo", ["require", "exports", "types/Doctor", "types/Medication", "types/Period"], function (require, exports, Doctor_1, Medication_1, Period_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PrescriptionInfo = /** @class */ (function () {
        function PrescriptionInfo() {
        }
        PrescriptionInfo.prototype.fromJson = function (json) {
            this.id = json.id;
            this.created = new Date(json.created);
            if (json.recorderDoctor)
                this.recorderDoctor = (new Doctor_1.Doctor()).fromJson(json.recorderDoctor);
            this.medications = json.medications ? json.medications.map(function (m) { return (new Medication_1.Medication()).fromJson(m); }) : [];
            this.dosageText = json.dosageText;
            this.reasonText = json.reasonText;
            this.validityPeriod = json.validityPeriod ? (new Period_2.Period()).fromJson(json.validityPeriod) : new Period_2.Period();
            this.numberOfRepeats = json.numberOfRepeats;
            this.title = json.title;
            return this;
        };
        PrescriptionInfo.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.created = this.created;
            payload.recorderDoctor = this.recorderDoctor.toJson();
            payload.medications = this.medications ? this.medications.map(function (m) { return m.toJson(); }) : [];
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
define("types/index", ["require", "exports", "types/BusinessInfo", "types/Doctor", "types/Service", "types/AppointmentConfirmationStatus", "types/ClientPrice", "types/AppointmentHistoryItem", "types/AppointmentInputProperties", "types/Currency", "types/Diagnosis", "types/ProcedureExecStatus", "types/ProcedureType", "types/ProcedureInfo", "types/Procedure", "types/PrescriptionInfo", "types/PatientInfo", "types/PatientInputProperties"], function (require, exports, BusinessInfo_1, Doctor_2, Service_2, AppointmentConfirmationStatus_1, ClientPrice_2, AppointmentHistoryItem_1, AppointmentInputProperties_1, Currency_1, Diagnosis_1, ProcedureExecStatus_1, ProcedureType_1, ProcedureInfo_1, Procedure_1, PrescriptionInfo_1, PatientInfo_1, PatientInputProperties_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BusinessInfo = BusinessInfo_1.BusinessInfo;
    exports.Doctor = Doctor_2.Doctor;
    exports.Service = Service_2.Service;
    exports.AppointmentConfirmationStatus = AppointmentConfirmationStatus_1.AppointmentConfirmationStatus;
    exports.ClientPrice = ClientPrice_2.ClientPrice;
    exports.AppointmentHistoryItem = AppointmentHistoryItem_1.AppointmentHistoryItem;
    exports.AppointmentInputProperties = AppointmentInputProperties_1.AppointmentInputProperties;
    exports.Currency = Currency_1.Currency;
    exports.Diagnosis = Diagnosis_1.Diagnosis;
    exports.ProcedureExecStatus = ProcedureExecStatus_1.ProcedureExecStatus;
    exports.ProcedureType = ProcedureType_1.ProcedureType;
    exports.ProcedureInfo = ProcedureInfo_1.ProcedureInfo;
    exports.Procedure = Procedure_1.Procedure;
    exports.PrescriptionInfo = PrescriptionInfo_1.PrescriptionInfo;
    exports.PatientInfo = PatientInfo_1.PatientInfo;
    exports.PatientInputProperties = PatientInputProperties_1.PatientInputProperties;
});
define("services/ResourceService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "patientId", {
            get: function () { return this._patientId; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "business", {
            get: function () { return this._business; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "created", {
            get: function () { return this._created; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "start", {
            get: function () { return this._start; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "doctor", {
            get: function () { return this._doctor; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "services", {
            get: function () { return this._services; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "duration", {
            get: function () { return this._duration; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "confirmationStatus", {
            get: function () { return this._confirmationStatus; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "clientAppear", {
            get: function () { return this._clientAppear; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "resultId", {
            get: function () { return this._resultId; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "clientPrice", {
            get: function () { return this._clientPrice; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "source", {
            get: function () { return this._source; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentModel.prototype, "history", {
            get: function () { return this._history; },
            enumerable: true,
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
                patientId: this._patientId
            };
            payload.business = this._business;
            payload.created = this._created;
            payload.start = this._start;
            payload.doctor = this._doctor;
            payload.services = this._services;
            payload.duration = this._duration;
            payload.status = this._confirmationStatus;
            payload.clientAppear = this._clientAppear;
            payload.resultId = this._resultId;
            payload.clientPrice = this._clientPrice;
            payload.source = this._source;
            payload.history = this._history;
            return payload;
        };
        return AppointmentModel;
    }());
    exports.AppointmentModel = AppointmentModel;
});
define("models/index", ["require", "exports", "models/AppointmentModel"], function (require, exports, AppointmentModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        AppointmentModel: AppointmentModel_1.AppointmentModel
    };
});
define("types/MaritalStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var Insurance = /** @class */ (function () {
        function Insurance() {
        }
        return Insurance;
    }());
    exports.Insurance = Insurance;
});
define("models/PatientModel", ["require", "exports", "types/FamilyMember", "types/Insurance", "types/Period"], function (require, exports, FamilyMember_1, Insurance_1, Period_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                    insurance.period = new Period_3.Period();
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
define("services/PatientService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/RpcErrorCodes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        return err.code === RpcErrorCodes.NotAuthorized ||
            err.code === RpcErrorCodes.AuthExpired ||
            err.code === RpcErrorCodes.UnknownAuthError;
    }
    exports.isAuthorizationError = isAuthorizationError;
});
define("services/AuthService", ["require", "exports", "services/RpcErrorCodes"], function (require, exports, RpcErrorCodes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    ;
    /**
     * Ошибка сценария аутентификации пациента.
     * Инкапсулирует внутри себя ошибку запроса, предоставляет информацию о типе ошибки и
     * информацию о шаге сценария аутентификации, на котором произошла ошибка.
     */
    var PatientAuthenticationError = /** @class */ (function (_super) {
        __extends(PatientAuthenticationError, _super);
        function PatientAuthenticationError(aStep, anInternalError) {
            var _this = _super.call(this, 'Patient authentication error') || this;
            _this.step = aStep;
            _this.internalError = anInternalError;
            return _this;
        }
        PatientAuthenticationError.isAuthorizationError = function (err) {
            return err.internalError && RpcErrorCodes_1.isAuthorizationError(err.internalError);
        };
        PatientAuthenticationError.isAuthenticationError = function (err) {
            return err.step === PatientAuthenticationStep.authenticate &&
                err.internalError.code === RpcErrorCodes_1.RpcErrorCodes.PatientNotAuthenticated;
        };
        PatientAuthenticationError.isConnectionError = function (err) {
            return err.internalError && err.internalError instanceof ConnectionError;
        };
        PatientAuthenticationError.isEhrServerDisabled = function (err) {
            return err.step === PatientAuthenticationStep.patient && this.isConnectionError(err);
        };
        PatientAuthenticationError.patientAlreadyMatched = function (err) {
            return err.step === PatientAuthenticationStep.authenticate &&
                err.internalError.code === RpcErrorCodes_1.RpcErrorCodes.PatientAlreadyMatched;
        };
        PatientAuthenticationError.patientAlreadyLinked = function (err) {
            return err.step === PatientAuthenticationStep.authenticate &&
                err.internalError.code === RpcErrorCodes_1.RpcErrorCodes.PatientAlreadyLinked;
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
});
define("services/Credentials", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var JsonRpcHeader = /** @class */ (function () {
        function JsonRpcHeader(id, method, cred) {
            if (cred === void 0) { cred = null; }
            this._id = id;
            this._method = method;
            this._cred = cred;
        }
        Object.defineProperty(JsonRpcHeader.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsonRpcHeader.prototype, "method", {
            get: function () {
                return this._method;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsonRpcHeader.prototype, "cred", {
            get: function () {
                return this._cred;
            },
            enumerable: true,
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
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var isInteger = typeof Number.isSafeInteger === 'function'
        ? Number.isSafeInteger // ECMAScript 2015
        : function (num) {
            return typeof num === 'number' && isFinite(num) && num === Math.floor(num) && Math.abs(num) <= 9007199254740991;
        };
    var JsonRpc = /** @class */ (function () {
        function JsonRpc() {
            this.jsonrpc = '2.0';
        }
        JsonRpc.prototype.serialize = function () {
            return JSON.stringify(this);
        };
        JsonRpc.VERSION = '2.0';
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
            return new JsonRpcError('Invalid request', -32600, data);
        };
        JsonRpcError.methodNotFound = function (data) {
            return new JsonRpcError('Method not found', -32601, data);
        };
        JsonRpcError.invalidParams = function (data) {
            return new JsonRpcError('Invalid params', -32602, data);
        };
        JsonRpcError.internalError = function (data) {
            return new JsonRpcError('Internal error', -32603, data);
        };
        JsonRpcError.parseError = function (data) {
            return new JsonRpcError('Parse error', -32700, data);
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
        else if (!hasOwnProperty.call(obj, 'id')) {
            var tmp = obj;
            payload = new NotificationObject(tmp.method, tmp.params);
            err = validateMessage(payload);
            payloadType = RpcStatusType.notification;
        }
        else if (hasOwnProperty.call(obj, 'method')) {
            var tmp = obj;
            payload = new RequestObject(tmp.id, tmp.method, tmp.params);
            err = validateMessage(payload);
            payloadType = RpcStatusType.request;
        }
        else if (hasOwnProperty.call(obj, 'result')) {
            var tmp = obj;
            payload = new SuccessObject(tmp.id, tmp.result);
            err = validateMessage(payload);
            payloadType = RpcStatusType.success;
        }
        else if (hasOwnProperty.call(obj, 'error')) {
            var tmp = obj;
            payloadType = RpcStatusType.error;
            if (tmp.error == null) {
                err = JsonRpcError.internalError(tmp);
            }
            else {
                var errorObj = new JsonRpcError(tmp.error.message, tmp.error.code, tmp.error.data);
                if (errorObj.message !== tmp.error.message || errorObj.code !== tmp.error.code) {
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
            ? JsonRpcError.internalError('Result must exist for success Response objects')
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
            return JsonRpcError.internalError('Error must be an instance of JsonRpcError');
        }
        if (!isInteger(err.code)) {
            return JsonRpcError.internalError('Invalid error code. It must be an integer.');
        }
        if (!isString(err.message)) {
            return JsonRpcError.internalError('Message must exist or must be a string.');
        }
        return null;
    }
    function isString(obj) {
        return obj !== '' && typeof obj === 'string';
    }
    function isObject(obj) {
        return obj != null && typeof obj === 'object' && !Array.isArray(obj);
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
    var RequestCredObject = /** @class */ (function (_super) {
        __extends(RequestCredObject, _super);
        function RequestCredObject(id, method, cred, params) {
            var _this = _super.call(this, id, method, params) || this;
            _this.cred = cred;
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
    function requestCred(id, method, cred, params) {
        // call "standart" request function for validate message
        jsonrpc.request(id, method, params);
        return new RequestCredObject(id, method, cred, params);
    }
    exports.requestCred = requestCred;
});
define("services/jsonRPC/xhr", ["require", "exports", "services/AuthService", "services/jsonRPC/jsonrpc_cred"], function (require, exports, AuthService_1, jsonrpc_cred_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    if (typeof window === "undefined") {
        var XMLHttpRequest = require('xhr2');
    }
    else {
        var XMLHttpRequest = window.XMLHttpRequest;
    }
    exports.xhr = function (endpoint, header, requestPayload, cb) {
        var _this = this;
        var req = new XMLHttpRequest();
        req.responseType = 'json';
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
            console.info('onerror ' + _this.status + "\n" + target.response);
            if (target.status === 0)
                return cb(new AuthService_1.ConnectionError(), null);
            cb(new Error("error request " + endpoint + " method #" + header.method), null);
        };
        req.open('POST', endpoint, true);
        //req.overrideMimeType('application/json;charset=UTF-8');
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.log(header.method + " " + JSON.stringify(header.cred) + "\n" + JSON.stringify(requestPayload));
        var jsonRpcRequest = jsonrpc_cred_1.requestCred(header.id, header.method, header.cred, requestPayload);
        //console.log('jsonRpcRequest.serialize()', jsonRpcRequest.serialize());
        req.send(jsonRpcRequest.serialize());
    };
});
define("services/jsonRPC/jsonRpcService", ["require", "exports", "services/jsonRPC/jsonRpcRequest", "services/RpcErrorCodes"], function (require, exports, jsonRpcRequest_1, RpcErrorCodes_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonRPCService = /** @class */ (function () {
        function JsonRPCService(endpoint, request) {
            this._endpoint = endpoint;
            this._request = request;
        }
        Object.defineProperty(JsonRPCService.prototype, "endpoint", {
            get: function () {
                return this._endpoint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsonRPCService.prototype, "request", {
            get: function () {
                return this._request;
            },
            enumerable: true,
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
        function JsonRPCCredService(endpoint, cred, request) {
            var _this = _super.call(this, endpoint, request) || this;
            _this.cred_ = cred;
            return _this;
        }
        Object.defineProperty(JsonRPCCredService.prototype, "cred", {
            get: function () {
                return this.cred_;
            },
            set: function (value) {
                this.cred_ = value;
            },
            enumerable: true,
            configurable: true
        });
        JsonRPCCredService.prototype.exec = function (rpcMethod, payload, cb, optionalEndpoint) {
            if (optionalEndpoint === void 0) { optionalEndpoint = undefined; }
            var service = this;
            function auth(cb) {
                var this_ = this;
                return function () {
                    var args = arguments;
                    if (args[0] && args[0].code === RpcErrorCodes_2.RpcErrorCodes.NotAuthorized && service.onAuthNotAuthorized)
                        service.onAuthNotAuthorized();
                    else if (args[0] && args[0].code === RpcErrorCodes_2.RpcErrorCodes.AuthExpired && service.onAuthExpired)
                        service.onAuthExpired();
                    else if (args[0] && args[0].code === RpcErrorCodes_2.RpcErrorCodes.UnknownAuthError && service.onAuthUnknownAuthError)
                        service.onAuthUnknownAuthError();
                    cb.apply(this_, args);
                };
            }
            this.request(optionalEndpoint || this.endpoint, new jsonRpcRequest_1.JsonRpcHeader((JsonRPCService.id++).toString(), rpcMethod, this.cred), payload, auth(cb));
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
    var Handlers = /** @class */ (function () {
        function Handlers() {
        }
        Handlers.HANDLER_GET_APPOINTMENT_BY_ID = 100;
        Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD = "appointment.get_appointment_by_id";
        Handlers.HANDLER_SAVE_APPOINTMENT = 101;
        Handlers.HANDLER_SAVE_APPOINTMENT_METHOD = "appointment.save_appointment";
        Handlers.HANDLER_GET_PATIENT_APPOINTMENTS = 102;
        Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD = "appointment.get_patient_appointments";
        Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID = 200;
        Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD = "appointment_result.get_appointment_result_by_id";
        Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS = 201;
        Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD = "appointment_result.get_patient_appointment_results";
        Handlers.HANDLER_GET_PRESCRIPTION_BY_ID = 300;
        Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD = "prescription.get_prescription_by_id";
        Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS = 301;
        Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD = "prescription.get_patient_prescriptions";
        Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID = 400;
        Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD = "diagnostic_report.get_diagnostic_report_by_id";
        Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS = 401;
        Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD = "diagnostic_report.get_patient_diagnostic_reports";
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
        Handlers.HANDLER_GET_PATIENT = 600;
        Handlers.HANDLER_GET_PATIENT_METHOD = "patient.get_patient";
        return Handlers;
    }());
    exports.Handlers = Handlers;
});
define("services/jsonRPC/AppointmentService", ["require", "exports", "models/AppointmentModel", "services/jsonRPC/jsonRpcService", "Handlers"], function (require, exports, AppointmentModel_2, jsonRpcService_1, Handlers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppointmentService = /** @class */ (function (_super) {
        __extends(AppointmentService, _super);
        function AppointmentService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AppointmentService.prototype.getAppointmentModelById = function (id, cb) {
            this.exec(Handlers_1.Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD, { id: id }, function (err, payload) {
                if (err)
                    return cb(err, null);
                var app = new AppointmentModel_2.AppointmentModel();
                app.fromJson(payload['appointment']);
                return cb(null, app);
            });
        };
        AppointmentService.prototype.saveAppointment = function (appointmentProperties, cb) {
            var _this = this;
            this.exec(Handlers_1.Handlers.HANDLER_SAVE_APPOINTMENT_METHOD, { appointmentProperties: appointmentProperties }, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrors_ = payload['validationErrors'];
                return cb(null, payload["id"]);
            });
        };
        AppointmentService.prototype.getPatientAppointments = function (patientId, limit, offset, cb) {
            var _this = this;
            var params = { patientId: patientId, limit: limit, offset: offset };
            this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload['validationErrors'];
                var appointments = payload['appointments'].map(function (jsonApp) {
                    var app = new AppointmentModel_2.AppointmentModel();
                    app.fromJson(jsonApp);
                    return app;
                });
                return cb(null, appointments);
            });
        };
        return AppointmentService;
    }(jsonRpcService_1.JsonRPCCredService));
    exports.AppointmentService = AppointmentService;
});
define("models/AppointmentResultModel", ["require", "exports", "types/index", "models/AppointmentModel"], function (require, exports, index_1, AppointmentModel_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Класс модели записи.
     * Обеспечивает доступ к методам создания, редактирования, загружки данных из сервера.
     */
    var AppointmentResultModel = /** @class */ (function () {
        function AppointmentResultModel() {
        }
        Object.defineProperty(AppointmentResultModel.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "patientId", {
            get: function () { return this._patientId; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "business", {
            get: function () { return this._business; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "created", {
            get: function () { return this._created; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "start", {
            get: function () { return this._start; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "doctor", {
            get: function () { return this._doctor; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "duration", {
            get: function () { return this._duration; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "anamnesis", {
            get: function () { return this._anamnesis; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "medicalExaminationResult", {
            get: function () { return this._medicalExaminationResult; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "diagnosis", {
            get: function () { return this._diagnosis; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "recommendations", {
            get: function () { return this._recommendations; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "scheduledProcedures", {
            get: function () { return this._scheduledProcedures; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "prescriptions", {
            get: function () { return this._prescriptions; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppointmentResultModel.prototype, "diagnosticReportIds", {
            get: function () { return this._diagnosticReportIds; },
            enumerable: true,
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
            this._diagnosis = json.diagnosis ? json.diagnosis.map(function (d) { return new index_1.Diagnosis(d); }) : [];
            this._recommendations = json.recommendations ? json.recommendations.map(function (r) { return (new index_1.Procedure).fromJson(r); }) : [];
            this._scheduledProcedures = json.scheduledProcedures ? json.scheduledProcedures.map(function (p) { return (new index_1.Procedure).fromJson(p); }) : [];
            this._prescriptions = json.prescriptions ? json.prescriptions.map(function (p) { return (new index_1.PrescriptionInfo).fromJson(p); }) : [];
            this._diagnosticReportIds = json.diagnosticReportIds || [];
            return this;
        };
        /**
         *
         */
        AppointmentResultModel.prototype.toJson = function () {
            var payload = {
                id: this._id,
                patientId: this._patientId
            };
            payload.business = this._business;
            payload.created = this._created;
            payload.start = this._start;
            payload.doctor = this._doctor;
            payload.duration = this._duration;
            payload.anamnesis = this._anamnesis;
            payload.medicalExaminationResult = this._medicalExaminationResult;
            payload.diagnosis = this._diagnosis ? this._diagnosis.map(function (d) { return d.toJson(); }) : [];
            payload.recommendations = this._recommendations ? this._recommendations.map(function (r) { return r.toJson(); }) : [];
            payload.scheduledProcedures = this._scheduledProcedures ? this._scheduledProcedures.map(function (r) { return r.toJson(); }) : [];
            payload.prescriptions = this._prescriptions ? this._prescriptions.map(function (p) { return p.toJson(); }) : [];
            payload.diagnosticReportIds = this._diagnosticReportIds;
            return payload;
        };
        return AppointmentResultModel;
    }());
    exports.AppointmentResultModel = AppointmentResultModel;
});
define("services/AppointmentResultService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/jsonRPC/AppointmentResultService", ["require", "exports", "models/AppointmentResultModel", "services/jsonRPC/jsonRpcService", "Handlers"], function (require, exports, AppointmentResultModel_1, jsonRpcService_2, Handlers_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        AppointmentResultService.prototype.getAppointmentResultModelById = function (id, cb) {
            var _this = this;
            this.exec(Handlers_2.Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD, { id: id }, function (err, payload) {
                if (err)
                    return cb(err, null);
                var app = new AppointmentResultModel_1.AppointmentResultModel();
                _this.lastValidationErrors_ = payload['validationErrors'];
                app.fromJson(payload['appointmentResult']);
                return cb(null, app);
            });
        };
        AppointmentResultService.prototype.getPatientAppointmentResults = function (patientId, limit, offset, cb) {
            var _this = this;
            var params = { patientId: patientId, limit: limit, offset: offset };
            this.exec(Handlers_2.Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                _this.lastValidationErrorsOfList_ = payload['validationErrors'];
                var appointmentResults = payload['appointmentResults'].map(function (jsonApp) {
                    var app = new AppointmentResultModel_1.AppointmentResultModel();
                    app.fromJson(jsonApp);
                    return app;
                });
                return cb(null, appointmentResults);
            });
        };
        return AppointmentResultService;
    }(jsonRpcService_2.JsonRPCCredService));
    exports.AppointmentResultService = AppointmentResultService;
});
define("models/PrescriptionModel", ["require", "exports", "types/index", "types/PatientInfo"], function (require, exports, index_2, PatientInfo_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    }(index_2.PrescriptionInfo));
    exports.PrescriptionModel = PrescriptionModel;
});
define("services/PrescriptionService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/jsonRPC/PrescriptionService", ["require", "exports", "services/jsonRPC/jsonRpcService", "Handlers", "models/PrescriptionModel"], function (require, exports, jsonRpcService_3, Handlers_3, PrescriptionModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        PrescriptionService.prototype.getPrescriptionModelById = function (id, cb) {
            var _this = this;
            this.exec(Handlers_3.Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD, { id: id }, function (err, payload) {
                if (err)
                    return cb(err, null);
                var app = new PrescriptionModel_1.PrescriptionModel();
                _this.lastValidationErrors_ = payload['validationErrors'];
                app.fromJson(payload['prescription']);
                cb(null, app);
            });
        };
        PrescriptionService.prototype.getPatientPrescriptions = function (patientId, limit, offset, cb) {
            var _this = this;
            var params = { patientId: patientId, limit: limit, offset: offset };
            this.exec(Handlers_3.Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                var prescriptions = payload['prescriptions'].map(function (jsonApp) {
                    var app = new PrescriptionModel_1.PrescriptionModel();
                    _this.lastValidationErrorsOfList_ = payload['validationErrors'];
                    app.fromJson(jsonApp);
                    return app;
                });
                return cb(null, prescriptions);
            });
        };
        return PrescriptionService;
    }(jsonRpcService_3.JsonRPCCredService));
    exports.PrescriptionService = PrescriptionService;
});
define("types/DiagnosticReportStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DiagnosticReportStatus;
    (function (DiagnosticReportStatus) {
    })(DiagnosticReportStatus = exports.DiagnosticReportStatus || (exports.DiagnosticReportStatus = {}));
});
define("types/ObservationType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObservationType;
    (function (ObservationType) {
        ObservationType[ObservationType["Observation"] = 1] = "Observation";
        ObservationType[ObservationType["LaboratoryTest"] = 2] = "LaboratoryTest";
    })(ObservationType = exports.ObservationType || (exports.ObservationType = {}));
});
define("types/ObservationStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObservationStatus;
    (function (ObservationStatus) {
    })(ObservationStatus = exports.ObservationStatus || (exports.ObservationStatus = {}));
    ;
});
define("types/ObservationUnit", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObservationUnit;
    (function (ObservationUnit) {
    })(ObservationUnit = exports.ObservationUnit || (exports.ObservationUnit = {}));
});
define("types/ObservationValue", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("types/ObservationRange", ["require", "exports", "types/Period"], function (require, exports, Period_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObservationRange = /** @class */ (function () {
        function ObservationRange() {
            this.age = new Period_4.Period();
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
    var ObservationComponent = /** @class */ (function () {
        function ObservationComponent() {
        }
        ObservationComponent.prototype.fromJson = function (json) {
            this.type = json.type;
            this.value = json.value;
            this.interpretation = json.interpretation;
            this.ranges = json.ranges ? new ObservationRange_1.ObservationRange[json.ranges.length] : [];
            if (json.ranges)
                for (var i = 0; i < json.ranges.length; ++i)
                    this.ranges[i] = (new ObservationRange_1.ObservationRange).fromJson(json.ranges[i]);
            return this;
        };
        ObservationComponent.prototype.toJson = function () {
            var payload = {};
            payload.type = this.type;
            payload.value = this.value;
            payload.interpretation = this.interpretation;
            payload.ranges = this.ranges ? this.ranges.map(function (r) { return r.toJson(); }) : null;
            return payload;
        };
        return ObservationComponent;
    }());
    exports.ObservationComponent = ObservationComponent;
});
define("types/Observation", ["require", "exports", "types/BusinessInfo", "types/Doctor", "types/PatientInfo", "types/Period", "types/ObservationValue", "types/ObservationRange", "types/ObservationComponent"], function (require, exports, BusinessInfo_2, Doctor_3, PatientInfo_3, Period_5, ObservationValue_1, ObservationRange_2, ObservationComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observation = /** @class */ (function () {
        function Observation() {
            this.patientInfo = new PatientInfo_3.PatientInfo();
            this.effectivePeriod = new Period_5.Period();
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
                    this.ranges.push((new ObservationRange_2.ObservationRange).fromJson(json.ranges[i]));
            this.components = [];
            if (json.components)
                for (var i = 0; i < json.components.length; ++i)
                    this.components.push((new ObservationComponent_1.ObservationComponent).fromJson(json.components[i]));
            return this;
        };
        Observation.prototype.toJson = function () {
            var payload = {};
            payload.id = this.id;
            payload.createdDate = this.createdDate;
            payload.patientInfo = this.patientInfo ? this.patientInfo.toJson() : null;
            payload.type = this.type;
            payload.observationKey = this.observationKey;
            payload.status = this.status;
            payload.effectivePeriod = this.effectivePeriod ? this.effectivePeriod.toJson() : null;
            payload.issuedDate = this.issuedDate;
            payload.performerDoctor = this.performerDoctor ? this.performerDoctor.toJson() : null;
            payload.performerBusiness = this.performerBusiness ? this.performerBusiness.toJson() : null;
            payload.value = this.value ? this.value.toJson() : null;
            payload.note = this.note;
            payload.interpretation = this.interpretation;
            payload.ranges = this.ranges ? this.ranges.map(function (r) { return r.toJson(); }) : null;
            payload.components = this.components ? this.components.map(function (c) { return c.toJson(); }) : null;
            return payload;
        };
        return Observation;
    }());
    exports.Observation = Observation;
});
define("models/DiagnosticReportModel", ["require", "exports", "types/Doctor", "types/Period", "types/Observation", "types/Service"], function (require, exports, Doctor_4, Period_6, Observation_1, Service_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Класс модели медикаментозного назначения.
     */
    var DiagnosticReportModel = /** @class */ (function () {
        function DiagnosticReportModel() {
            this._issuedDate = new Date();
            this._effectivePeriod = new Period_6.Period();
            this._result = [];
            this._resultInterpreter = [];
            this._resultInterpretation = [];
            this._imagineMedia = [];
            this._attachments = [];
            this._services = [];
        }
        Object.defineProperty(DiagnosticReportModel.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "status", {
            /**
             * Статус диагностического отчета.
             */
            get: function () { return this._status; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "type", {
            /**
             * Тип обследования.
             */
            get: function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "services", {
            /**
             * Список оказанных на исследовании услуг.
             */
            get: function () { return this._services; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "category", {
            /**
             * Категория сервисов диагностики (код).
             * @see http://hl7.org/fhir/valueset-diagnostic-service-sections.html
             */
            get: function () { return this._category; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "effectivePeriod", {
            /**
             * Период дат, в течение которых результаты теста считать действительными.
             */
            get: function () { return this._effectivePeriod; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "issuedDate", {
            /**
             * Дата публикации обследования пациенту.
             */
            get: function () { return this._issuedDate; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "result", {
            /**
             * Результаты обследования в нормализованном виде.
             */
            get: function () { return this._result; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "resultInterpreter", {
            /**
             * Врач, который интерпретировал результаты.
             */
            get: function () { return this._resultInterpreter; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "resultInterpretation", {
            /**
             * Интерпретация результатов обследования/анализов.
             */
            get: function () { return this._resultInterpretation; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "imagineMedia", {
            /**
             * Список ссылок на флюорографии, ЭКГ и т.п.
             */
            get: function () { return this._imagineMedia; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiagnosticReportModel.prototype, "attachments", {
            /**
             * Весь отчет, как документ ворд, pdf  т.п.
             */
            get: function () { return this._attachments; },
            enumerable: true,
            configurable: true
        });
        DiagnosticReportModel.prototype.fromJson = function (json) {
            this._id = json.id;
            this._status = json.status;
            this._type = json.type;
            this._effectivePeriod = (new Period_6.Period).fromJson(json.effectivePeriod);
            this._issuedDate = new Date(json.issuedDate);
            this._result = [];
            if (json.result)
                for (var i = 0; i < json.result.length; ++i)
                    this._result.push((new Observation_1.Observation).fromJson(json.result[i]));
            this._resultInterpreter = json.resultInterpreter ? json.resultInterpreter.map(function (d) { return (new Doctor_4.Doctor).fromJson(d); }) : [];
            this._resultInterpretation = json.resultInterpretation || [];
            this._imagineMedia = json.imagineMedia || [];
            this._attachments = json.attachments || [];
            this._services = [];
            if (json.services)
                for (var i = 0; i < json.services.length; ++i)
                    this._services.push((new Service_3.Service).fromJson(json.services[i]));
            this._category = json.category;
            return this;
        };
        DiagnosticReportModel.prototype.toJson = function () {
            var payload = {};
            payload.id = this._id;
            payload.status = this._status;
            payload.type = this._type;
            payload.effectivePeriod = this._effectivePeriod ? this._effectivePeriod.toJson() : null;
            payload.issuedDate = this._issuedDate;
            payload.result = this._result ? this._result.map(function (value) { return value.toJson(); }) : null;
            payload.resultInterpreter = this._resultInterpreter ? this._resultInterpreter.map(function (i) { return i.toJson(); }) : null;
            payload.resultInterpretation = this._resultInterpretation;
            payload.imagineMedia = this._imagineMedia;
            payload.attachments = this._attachments;
            payload.services = this._services ? this._services.map(function (s) { return s.toJson(); }) : null;
            payload.category = this._category;
            return payload;
        };
        return DiagnosticReportModel;
    }());
    exports.DiagnosticReportModel = DiagnosticReportModel;
});
define("services/DiagnosticReportService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/jsonRPC/DiagnosticReportService", ["require", "exports", "services/jsonRPC/jsonRpcService", "Handlers", "models/DiagnosticReportModel"], function (require, exports, jsonRpcService_4, Handlers_4, DiagnosticReportModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        DiagnosticReportService.prototype.getDiagnosticReportModelById = function (id, cb) {
            var _this = this;
            this.exec(Handlers_4.Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD, { id: id }, function (err, payload) {
                if (err)
                    return cb(err, null);
                var app = new DiagnosticReportModel_1.DiagnosticReportModel();
                _this.lastValidationErrors_ = payload['validationErrors'];
                app.fromJson(payload['diagnosticReport']);
                return cb(null, app);
            });
        };
        DiagnosticReportService.prototype.getPatientDiagnosticReports = function (patientId, limit, offset, cb) {
            var _this = this;
            var params = { patientId: patientId, limit: limit, offset: offset };
            this.exec(Handlers_4.Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD, params, function (err, payload) {
                if (err)
                    return cb(err, null);
                var diagnosticReports = payload['diagnosticReports'].map(function (jsonApp) {
                    var app = new DiagnosticReportModel_1.DiagnosticReportModel();
                    _this.lastValidationErrorsOfList_ = payload['validationErrors'];
                    app.fromJson(jsonApp);
                    return app;
                });
                cb(null, diagnosticReports);
            });
        };
        return DiagnosticReportService;
    }(jsonRpcService_4.JsonRPCCredService));
    exports.DiagnosticReportService = DiagnosticReportService;
});
define("services/jsonRPC/AuthService", ["require", "exports", "services/jsonRPC/jsonRpcService", "services/AuthService", "Handlers", "models/PatientModel"], function (require, exports, jsonRpcService_5, AuthService_2, Handlers_5, PatientModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                etr.exchangeToken = payload['exchangeToken'];
                return cb(null, etr);
            }, this.authServerEndpoint_, this.authCred_);
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
                medCardId: medCardId
            };
            this.exec(Handlers_5.Handlers.HANDLER_AUTHENTICATE_METHOD, requestData, function (err, payload) {
                if (err)
                    return cb(err, null, null);
                var patient = new PatientModel_1.PatientModel();
                patient.fromJson(payload['patient']);
                if (!payload['userSign'])
                    throw new Error("expect userSign");
                return cb(null, patient, payload['userSign']);
            }, this.ehrServerEndpoint_);
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
        /**
         * Удаление пользовательской сессии.
         *
         * @param cb
         */
        AuthService.prototype.removeAuthInfo = function (cb) {
            this.exec(Handlers_5.Handlers.HANDLER_REMOVE_AUTH_INFO_METHOD, {}, cb, this.ehrServerEndpoint_, this.authCred_);
        };
        return AuthService;
    }(jsonRpcService_5.JsonRPCService));
    exports.AuthService = AuthService;
});
define("services/jsonRPC/PatientService", ["require", "exports", "services/jsonRPC/jsonRpcService", "Handlers", "models/PatientModel"], function (require, exports, jsonRpcService_6, Handlers_6, PatientModel_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                if (!payload['userSign'])
                    return cb(new Error("userSign not found"));
                var patient = new PatientModel_2.PatientModel();
                _this.lastValidationErrors_ = payload['validationErrors'];
                patient.fromJson(payload['patient']);
                return cb(err, patient, payload['userSign']);
            });
        };
        return PatientService;
    }(jsonRpcService_6.JsonRPCCredService));
    exports.PatientService = PatientService;
});
define("services/jsonRPC/index", ["require", "exports", "services/jsonRPC/xhr", "services/jsonRPC/AppointmentService", "services/jsonRPC/AppointmentResultService", "services/jsonRPC/PrescriptionService", "services/jsonRPC/DiagnosticReportService", "services/jsonRPC/AuthService", "services/jsonRPC/PatientService", "services/jsonRPC/jsonRpcRequest"], function (require, exports, xhr_1, AppointmentService_1, AppointmentResultService_1, PrescriptionService_1, DiagnosticReportService_1, AuthService_3, PatientService_1, jsonRpcRequest_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        Transports: {
            xhr: xhr_1.xhr
        },
        JsonRpcHeader: jsonRpcRequest_2.JsonRpcHeader,
        AppointmentService: AppointmentService_1.AppointmentService,
        AppointmentResultService: AppointmentResultService_1.AppointmentResultService,
        PrescriptionService: PrescriptionService_1.PrescriptionService,
        DiagnosticReportService: DiagnosticReportService_1.DiagnosticReportService,
        AuthService: AuthService_3.AuthService,
        PatientService: PatientService_1.PatientService
    };
});
define("services/index", ["require", "exports", "services/jsonRPC/index", "services/AuthService", "services/Credentials", "services/RpcErrorCodes"], function (require, exports, index_3, AuthService_4, Credentials_1, RpcErrorCodes_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        // InMemory
        //, BinRPC
        JsonRPC: index_3.default,
        PatientAuthenticationResult: AuthService_4.PatientAuthenticationResult,
        PatientAuthenticationStep: AuthService_4.PatientAuthenticationStep,
        PatientAuthenticationError: AuthService_4.PatientAuthenticationError,
        ConnectionError: AuthService_4.ConnectionError,
        getAuthenticatedPatient: AuthService_4.getAuthenticatedPatient,
        Credentials: Credentials_1.Credentials,
        RpcErrorCodes: RpcErrorCodes_3.RpcErrorCodes
    };
});
define("formatters/l10n/ru-ru", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        "MINUTE_UNIT": "мин.",
        "YES": "Да",
        "NO": "Нет",
        "CREATED": "Дата создания",
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
        },
        "DiagnosticReport": {
            "Doctor": "Врач",
            "EffectivePeriod": "Период, в течение которого данные пригодны",
            "Result": "Результаты",
            "Images": "Изображения",
            "Attachments": "Документы"
        },
        "Prescription": {
            "title": "Название",
            "created": "Дата создания",
            "recorderDoctor": "Врач, выписавший рецепт",
            "medications": "Список лекарств",
            "dosageText": "Дозировка",
            "reasonText": "Причина назначения",
            "validityPeriod": "Время, в течение которого рецепт действует",
            "numberOfRepeats": "Сколько раз по этому рецепту можно получить лекарства",
        },
        "MedicationForm": {
            0: "Порошок",
            1: "Таблетки",
            2: "Капсулы"
        }
    };
});
define("formatters/l10n/en-us", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        "MINUTE_UNIT": "min",
        "YES": "Yes",
        "NO": "No",
        "CREATED": "Creation date",
        "appointmentResult": {
            "created": "Created",
            "start": "Date and time of creation",
            "doctor": "Doctor",
            "duration": "Duration",
            "anamnesis": "Anamnesis",
            "medicalExaminationResult": "Examination results",
            "diagnosis": "Diagnosis",
            "recommendations": "Recommendations",
            "scheduledProcedures": "Procedures, medical examinations and lab tests prescribed during the doctor visit",
            "prescriptions": "Medicines (prescription drugs)",
        },
        "procedure": {
            "created": "Created",
            "title": "Title",
            "services": "Services",
            "type": "Type",
            "required": "Required",
            "status": "Status",
            "period": "Expected period of service execution",
            "strictPeriod": "Strict service execution period",
            "preparations": "Desired preparations for the procedure",
            "requiredPreparations": "Required preparations for the procedure",
        },
        "procedureType": [
            "Recommendation",
            "Procedure",
            "Lab tests"
        ],
        "ProcedureExecStatus": [
            "Planned",
            "In progress",
            "Cancelled",
            "Complete"
        ],
        "Period": {
            "begin": "Start date",
            "end": "End date"
        },
        "DiagnosticReport": {
            "Doctor": "Doctor",
            "EffectivePeriod": "Medical data effective period",
            "Result": "Results",
            "Images": "Images",
            "Attachments": "Documents"
        },
        "Prescription": {
            "title": "Drug name",
            "created": "Date created",
            "recorderDoctor": "The doctor who wrote out this prescription",
            "medications": "Drug list",
            "dosageText": "Dosage",
            "reasonText": "Prescription reason",
            "validityPeriod": "Prescription validity period",
            "numberOfRepeats": "How many times can you get your prescription drugs",
        },
        "MedicationForm": {
            0: "Powder",
            1: "Pills",
            2: "Capsules"
        }
    };
});
define("formatters/l10n/index", ["require", "exports", "formatters/l10n/ru-ru", "formatters/l10n/en-us"], function (require, exports, ru_ru_1, en_us_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        ruRU: ru_ru_1.default,
        enUS: en_us_1.default
    };
});
define("formatters/SimpleTextFormatter", ["require", "exports", "formatters/l10n/index"], function (require, exports, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function alignStrings(obj, keys) {
        // find max strings length
        var ml = 0;
        for (var i = 0; i < keys.length; ++i)
            if (ml < obj[keys[i]].length)
                ml = obj[keys[i]].length;
        // pad_right all strings
        keys.forEach(function (key) { return obj[key] = obj[key].padEnd(ml, " "); });
    }
    function formatObject(obj, keys, notAlignedKeys, propFormats, localize, offset) {
        var ret = "";
        var localizedKeys = keys.reduce(function (ret, key) {
            ret[key] = localize[key];
            return ret;
        }, {});
        alignStrings(localizedKeys, keys.filter(function (key) { return !notAlignedKeys[key]; }));
        keys.forEach(function (key) {
            if (!obj[key] || Array.isArray(obj[key]) && !obj[key].length)
                return;
            if (propFormats[key])
                ret += offset + localizedKeys[key] + " " + propFormats[key](obj[key], offset + "    ") + "\n";
            else
                ret += offset + localizedKeys[key] + " " + obj[key] + "\n";
        });
        ret += "\n";
        return ret;
    }
    function paragrathes(a, offset) {
        if (a.length == 0)
            return "";
        // this is simple string
        if (a.length == 1 && a[0].length < 100 && a[0].indexOf("\n") < 0)
            return a[0];
        return a.join("\n\n");
    }
    function paragrathes_nl(a, offset) {
        if (a.length == 0)
            return "";
        return "\n" + offset + a.join("\n\n");
    }
    var dateISOFormat = function (d) {
        return typeof d === "string" ? d : d.toISOString();
    };
    var trim = function (str) {
        return str.replace(/^\s+/, "").replace(/\s+$/, "");
    };
    var SimpleTextFormatter = /** @class */ (function () {
        function SimpleTextFormatter(localize, dateFormat) {
            if (dateFormat === void 0) { dateFormat = dateISOFormat; }
            this._localize = localize;
            this._dateFormat = dateFormat;
        }
        SimpleTextFormatter.prototype.appointmentResult = function (ar, offset) {
            if (offset === void 0) { offset = ""; }
            var keys = ["created", "start", "doctor", "duration", "anamnesis",
                "medicalExaminationResult", "diagnosis", "recommendations", "scheduledProcedures", "prescriptions"];
            var propFormats = {
                created: this._dateFormat.bind(this),
                start: this._dateFormat.bind(this),
                doctor: this.doctor.bind(this),
                anamnesis: this.anamnesis.bind(this),
                medicalExaminationResult: this.medicalExaminationResult.bind(this),
                diagnosis: this.diagnosis.bind(this),
                recommendations: this.procedures.bind(this),
                scheduledProcedures: this.procedures.bind(this),
                prescriptions: this.prescriptions.bind(this),
            };
            var notAlignedKeys = {
                "scheduledProcedures": 1,
                "prescriptions": 1
            };
            return formatObject(ar, keys, notAlignedKeys, propFormats, this._localize["appointmentResult"], offset);
        };
        SimpleTextFormatter.prototype.medicalExaminationResult = function (ar, offset) {
            ar = ar.map(function (line) {
                var m = line.match(/([^:]*):(.*)/);
                if (m) {
                    m[1] = trim(m[1]);
                    return (m[1] ? m[1] + ": " : "") + trim(m[2]);
                }
                return line;
            });
            return "\n" + paragrathes(ar, offset) + "\n\n";
        };
        SimpleTextFormatter.prototype.anamnesis = function (ar, offset) {
            return "\n" + paragrathes(ar, offset) + "\n";
        };
        SimpleTextFormatter.prototype.duration = function (n) {
            return n.toString() + " " + this._localize["MINUTE_UNIT"];
        };
        SimpleTextFormatter.prototype.doctor = function (d, offset) {
            if (offset === void 0) { offset = ""; }
            return d.name + " " + d.surname;
        };
        SimpleTextFormatter.prototype.diagnosis = function (d, offset) {
            var itemToString = function (item) {
                return item.description + (item.cd10 ? " (cd10: " + item.cd10 + ")" : "");
            };
            if (d.length === 0)
                return "";
            if (d.length == 1 && d[0].description.length < 100 && d[0].description.indexOf("\n") < 0) {
                var hasKeyValue = typeof d[0].description === "string" && d[0].description.match(/([^:]*):(.*)/);
                return (hasKeyValue ? "\n" : "") + itemToString(d[0]);
            }
            return "\n" + d.map(itemToString).join("\n\n");
        };
        SimpleTextFormatter.prototype.procedures = function (p, offset) {
            var this_ = this;
            return "\n" + p.map(function (item, i) { return offset + (i + 1).toString() + ".\n" + this_.procedure(item, offset); }).join("\n");
        };
        SimpleTextFormatter.prototype.procedure = function (p, offset) {
            var keys = ["created", "title", "services", "type", "required", "status", "period", "strictPeriod",
                "preparations", "requiredPreparations"];
            var propFormats = {
                services: this.services.bind(this),
                type: this.procedureType.bind(this),
                required: this.yesNo.bind(this),
                status: this.procedureExecStatus.bind(this),
                period: this.period.bind(this),
                strictPeriod: this.period.bind(this),
                preparations: paragrathes_nl,
                requiredPreparations: paragrathes_nl,
            };
            var notAlignedKeys = {
                period: 1,
                strictPeriod: 1,
                preparations: 1,
                requiredPreparations: 1
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
            var keys = ["created", "title", "recorderDoctor", "medications", "dosageText", "reasonText", "validityPeriod",
                "numberOfRepeats"];
            var propFormats = {
                recorderDoctor: this.doctor.bind(this),
                validityPeriod: this.period.bind(this),
                medications: this.medications.bind(this),
                created: this._dateFormat.bind(this)
            };
            var notAlignedKeys = {
                validityPeriod: 1
            };
            return formatObject(p, keys, notAlignedKeys, propFormats, this._localize["Prescription"], offset);
        };
        SimpleTextFormatter.prototype.medications = function (s, offset) {
            var _this_1 = this;
            return "\n" + s.map(function (item) { return _this_1.medication(item, offset); }).join("\n");
        };
        SimpleTextFormatter.prototype.medication = function (s, offset) {
            return this._localize["MedicationForm"][s.form] + ". " + s.amount
                + " шт. Срок годности:" + this._dateFormat(s.expirationDate);
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
            return "\n" + offset + this._localize["Period"]["begin"] + " " + this._dateFormat(period.begin) + "\n" +
                offset + this._localize["Period"]["end"] + " " + this._dateFormat(period.end) + "\n";
        };
        SimpleTextFormatter.prototype.diagnosticReport = function (dr, offset) {
            if (offset === void 0) { offset = ""; }
            var _this = this;
            return offset + this.diagnosticReportTitle(dr)
                + "\n"
                + "\n" + offset + this._localize["CREATED"] + " " + this._dateFormat(dr.issuedDate)
                + "\n" + offset + this._localize["DiagnosticReport"]["Doctor"] + " " +
                dr.resultInterpreter.map(function (d) { return _this.doctor(d); })
                + "\n" + offset + this._localize["DiagnosticReport"]["Result"]
                + "\n" + offset + this.observations(dr.result, offset + "  ")
                + (dr.effectivePeriod && dr.effectivePeriod.begin ?
                    "\n" + offset + this._localize["DiagnosticReport"]["EffectivePeriod"]
                        + this.period(dr.effectivePeriod, offset + "  ") : "")
                + (dr.resultInterpretation && dr.resultInterpretation.length ?
                    "\n" + offset
                        + "\n" + paragrathes_nl(dr.resultInterpretation, offset) : "")
                + (dr.imagineMedia && dr.imagineMedia.length ?
                    "\n" + offset
                        + "\n" + offset + this._localize["DiagnosticReport"]["Images"]
                        + dr.imagineMedia.map(function (img) { return +"\n" + offset + img; }) : "")
                + (dr.attachments && dr.attachments.length ?
                    "\n" + offset
                        + "\n" + offset + this._localize["DiagnosticReport"]["Attachments"]
                        + dr.attachments.map(function (a) { return +"\n" + offset + a; }) : "");
        };
        SimpleTextFormatter.prototype.diagnosticReportTitle = function (dr) {
            return dr.services.map(function (s) { return s.name; }).join(", ");
        };
        SimpleTextFormatter.prototype.observations = function (o, offset) {
            var _this = this;
            return o.filter(function (o) { return typeof o.value.value === "string"; }).map(function (o) { return _this.observation(o, offset) + "\n"; }).join("\n");
        };
        SimpleTextFormatter.prototype.observation = function (o, offset) {
            var prefix;
            if (o.observationKey)
                prefix = offset + o.observationKey + ": ";
            else
                prefix = offset;
            var text = "";
            if (typeof o.value.value === "string") {
                // multiline text
                if (o.value.value.indexOf("\n") >= 0)
                    text = (prefix !== offset ? prefix + "\n" : "") + trim(o.value.value).split("\n")
                        .map(function (line) { return offset + trim(line); })
                        .join("\n");
                else
                    text = prefix + trim(o.value.value);
            }
            return text;
        };
        SimpleTextFormatter.LOCALIZE = {
            "ru-ru": index_4.default.ruRU,
            "en-us": index_4.default.enUS
        };
        return SimpleTextFormatter;
    }());
    exports.SimpleTextFormatter = SimpleTextFormatter;
});
define("formatters/index", ["require", "exports", "formatters/SimpleTextFormatter"], function (require, exports, SimpleTextFormatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        SimpleTextFormatter: SimpleTextFormatter_1.SimpleTextFormatter
    };
});
define("MedMe", ["require", "exports", "types/index", "models/index", "services/index", "formatters/index", "Handlers"], function (require, exports, Types, index_5, index_6, index_7, Handlers_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EHR = {
        SDK_VERSION: '1.7.6',
        Types: Types,
        Models: index_5.default,
        Services: index_6.default,
        Formatters: index_7.default,
        Handlers: Handlers_7.Handlers
    };
});
