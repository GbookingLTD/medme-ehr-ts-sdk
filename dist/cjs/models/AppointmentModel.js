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
        get: function () { return this._id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "patientId", {
        get: function () { return this._patientId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "business", {
        get: function () { return this._business; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "created", {
        get: function () { return this._created; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "start", {
        get: function () { return this._start; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "doctor", {
        get: function () { return this._doctor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "services", {
        get: function () { return this._services; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "duration", {
        get: function () { return this._duration; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "confirmationStatus", {
        get: function () { return this._confirmationStatus; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "clientAppear", {
        get: function () { return this._clientAppear; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "resultId", {
        get: function () { return this._resultId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "clientPrice", {
        get: function () { return this._clientPrice; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "source", {
        get: function () { return this._source; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentModel.prototype, "history", {
        get: function () { return this._history; },
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
