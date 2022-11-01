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
import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
var AppointmentService = /** @class */ (function (_super) {
    __extends(AppointmentService, _super);
    function AppointmentService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppointmentService.prototype.getAppointmentById = function (id, cb) {
        this.exec(Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD, { id: id }, function (err, payload) {
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
        this.exec(Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            return cb(null, payload["appointments"]);
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
    AppointmentService.prototype.getAppointments = function (limit, offset, lastId, prevCreated, cb) {
        var _this = this;
        var params = prevCreated
            ? { limit: limit, lastItemCreated: prevCreated }
            : (lastId
                ? { limit: limit, lastItemId: lastId }
                : { limit: limit, offset: offset });
        this.exec(Handlers.HANDLER_GET_APPOINTMENTS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["appointments"]);
        });
    };
    AppointmentService.prototype.getAppointmentsAsync = function (limit, offset, lastId, prevCreated) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getAppointments(limit, offset, lastId, prevCreated, function (err, appointments) {
                if (err)
                    return rej(err);
                res(appointments);
            });
        });
    };
    AppointmentService.prototype.getFilteredAppointments = function (filters, limit, offset, cb) {
        var _this = this;
        var params = { filters: filters.plain(), limit: limit, offset: offset };
        this.exec(Handlers.HANDLER_GET_APPOINTMENTS_METHOD, params, function (err, payload) {
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
        this.exec(Handlers.HANDLER_GET_APPOINTMENTS_COUNT_METHOD, {}, function (err, payload) {
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
        this.exec(Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
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
}(JsonRPCCredService));
export { AppointmentService };
