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
import { CursorType } from "../../types/CursorType";
import { JsonRPCCredService } from "./jsonRpcService";
import { Handlers } from "../../Handlers";
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
        var _this_1 = this;
        this.exec(Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD, { id: id }, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.lastValidationErrors_ = payload["validationErrors"];
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
        var _this_1 = this;
        var params = { patientId: patientId, limit: limit, offset: offset };
        this.exec(Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
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
    PrescriptionService.prototype.getPrescriptions = function (limit, offset, lastId, prevCreated, cb) {
        var _this_1 = this;
        var params = prevCreated
            ? { limit: limit, lastItemCreated: prevCreated }
            : lastId
                ? { limit: limit, lastItemId: lastId }
                : { limit: limit, offset: offset };
        this.exec(Handlers.HANDLER_GET_PRESCRIPTIONS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            return cb(null, payload["prescriptions"]);
        });
    };
    PrescriptionService.prototype.getPrescriptionsAsync = function (limit, offset, lastId, prevCreated) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPrescriptions(limit, offset, lastId, prevCreated, function (err, values) {
                if (err)
                    return rej(err);
                res(values);
            });
        });
    };
    PrescriptionService.prototype.getFilteredPrescriptions = function (filters, limit, offset, cb) {
        var _this_1 = this;
        var params = { filters: filters.plain(), limit: limit, offset: offset };
        this.exec(Handlers.HANDLER_GET_PRESCRIPTIONS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
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
        var _this_1 = this;
        this.exec(Handlers.HANDLER_GET_PRESCRIPTIONS_COUNT_METHOD, {}, function (err, payload) {
            if (err)
                return cb(err, null, false, CursorType.None);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["count"], payload["support"], payload["cursorType"]);
        });
    };
    PrescriptionService.prototype.getPrescriptionsCountAsync = function () {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPrescriptionsCount(function (err, count, support, cursorType) {
                if (err)
                    return rej(err);
                res({ count: count, support: support, cursorType: cursorType });
            });
        });
    };
    PrescriptionService.prototype.getPatientPrescriptionsCount = function (patientId, cb) {
        var _this_1 = this;
        this.exec(Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
            if (err)
                return cb(err, null, false, CursorType.None);
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["count"], payload["support"], payload["cursorType"]);
        });
    };
    PrescriptionService.prototype.getPatientPrescriptionsCountAsync = function (patientId) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatientPrescriptionsCount(patientId, function (err, count, support, cursorType) {
                if (err)
                    return rej(err);
                res({ count: count, support: support, cursorType: cursorType });
            });
        });
    };
    PrescriptionService.prototype.searchPrescriptions = function (includes, excludes, filters, limit, offset, cb) {
        var _this = this;
        this.exec(Handlers.HANDLER_SEARCH_PRESCRIPTIONS_METHOD, { includes: includes, excludes: excludes, filters: filters.plain(), limit: limit, offset: offset }, function (err, payload) {
            if (err)
                return cb(err, []);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["prescriptions"]);
        });
    };
    PrescriptionService.prototype.searchPrescriptionsAsync = function (includes, excludes, filters, limit, offset) {
        var service = this;
        return new Promise(function (res, rej) {
            service.searchPrescriptions(includes, excludes, filters, limit, offset, function (err, reports) {
                if (err)
                    return rej(err);
                res(reports);
            });
        });
    };
    PrescriptionService.prototype.searchPrescriptionsCount = function (includes, excludes, filters, cb) {
        var _this = this;
        this.exec(Handlers.HANDLER_SEARCH_PRESCRIPTIONS_COUNT_METHOD, { includes: includes, excludes: excludes, filters: filters.plain() }, function (err, payload) {
            if (err)
                return cb(err, 0, false);
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["count"], payload["support"]);
        });
    };
    PrescriptionService.prototype.searchPrescriptionsCountAsync = function (includes, excludes, filters) {
        var service = this;
        return new Promise(function (res, rej) {
            service.searchPrescriptionsCount(includes, excludes, filters, function (err, count, support) {
                if (err)
                    return rej(err);
                res({ count: count, support: support });
            });
        });
    };
    return PrescriptionService;
}(JsonRPCCredService));
export { PrescriptionService };
