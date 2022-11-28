"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionService = void 0;
var CursorType_1 = require("../../types/CursorType");
var jsonRpcService_1 = require("./jsonRpcService");
var Handlers_1 = require("../../Handlers");
var PrescriptionService = /** @class */ (function (_super) {
    __extends(PrescriptionService, _super);
    function PrescriptionService() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.recognitionResults = [];
        return _this_1;
    }
    /**
     * Возвращает назначение по идентификатору.
     * @param id идентификатор результата записи
     * @param cb callback
     */
    PrescriptionService.prototype.getPrescriptionById = function (id, opts, cb) {
        var _this_1 = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD, __assign({ id: id }, opts), function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.recognitionResults = payload["recognitionResults"];
            _this_1.lastValidationErrors_ = payload["validationErrors"];
            cb(null, payload["prescription"]);
        });
    };
    PrescriptionService.prototype.getPrescriptionByIdAsync = function (id, opts) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPrescriptionById(id, opts, function (err, pm) {
                if (err)
                    return rej(err);
                res(pm);
            });
        });
    };
    PrescriptionService.prototype.getPatientPrescriptions = function (patientId, limit, offset, opts, cb) {
        var _this_1 = this;
        var params = __assign({ patientId: patientId, limit: limit, offset: offset }, opts);
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.recognitionResults = payload["recognitionResults"];
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            return cb(null, payload["prescriptions"]);
        });
    };
    PrescriptionService.prototype.getPatientPrescriptionsAsync = function (patientId, limit, offset, opts) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPatientPrescriptions(patientId, limit, offset, opts, function (err, values) {
                if (err)
                    return rej(err);
                res(values);
            });
        });
    };
    PrescriptionService.prototype.getPrescriptions = function (limit, offset, lastId, prevCreated, opts, cb) {
        var _this_1 = this;
        var params = prevCreated
            ? { limit: limit, lastItemCreated: prevCreated }
            : lastId
                ? { limit: limit, lastItemId: lastId }
                : { limit: limit, offset: offset };
        this.exec(Handlers_1.Handlers.HANDLER_GET_PRESCRIPTIONS_METHOD, Object.assign(params, opts), function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.recognitionResults = payload["recognitionResults"];
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            return cb(null, payload["prescriptions"]);
        });
    };
    PrescriptionService.prototype.getPrescriptionsAsync = function (limit, offset, lastId, prevCreated, opts) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getPrescriptions(limit, offset, lastId, prevCreated, opts, function (err, values) {
                if (err)
                    return rej(err);
                res(values);
            });
        });
    };
    PrescriptionService.prototype.getFilteredPrescriptions = function (filters, limit, offset, opts, cb) {
        var _this_1 = this;
        var params = __assign({ filters: filters.plain(), limit: limit, offset: offset }, opts);
        this.exec(Handlers_1.Handlers.HANDLER_GET_PRESCRIPTIONS_METHOD, params, function (err, payload) {
            if (err)
                return cb(err, null);
            _this_1.recognitionResults = payload["recognitionResults"];
            _this_1.lastValidationErrorsOfList_ = payload["validationErrors"];
            return cb(null, payload["prescriptions"]);
        });
    };
    PrescriptionService.prototype.getFilteredPrescriptionsAsync = function (filters, limit, offset, opts) {
        var service = this;
        return new Promise(function (res, rej) {
            service.getFilteredPrescriptions(filters, limit, offset, opts, function (err, values) {
                if (err)
                    return rej(err);
                res(values);
            });
        });
    };
    PrescriptionService.prototype.getPrescriptionsCount = function (cb) {
        var _this_1 = this;
        this.exec(Handlers_1.Handlers.HANDLER_GET_PRESCRIPTIONS_COUNT_METHOD, {}, function (err, payload) {
            if (err)
                return cb(err, null, false, CursorType_1.CursorType.None);
            _this_1.recognitionResults = payload["recognitionResults"];
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
        this.exec(Handlers_1.Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_COUNT_METHOD, { patientId: patientId }, function (err, payload) {
            if (err)
                return cb(err, null, false, CursorType_1.CursorType.None);
            _this_1.recognitionResults = payload["recognitionResults"];
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
    PrescriptionService.prototype.searchPrescriptions = function (includes, excludes, filters, limit, offset, opts, cb) {
        var _this_1 = this;
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_SEARCH_PRESCRIPTIONS_METHOD, __assign({ includes: includes, excludes: excludes, filters: filters.plain(), limit: limit, offset: offset }, opts), function (err, payload) {
            if (err)
                return cb(err, []);
            _this_1.recognitionResults = payload["recognitionResults"];
            _this.lastValidationErrorsOfList_ = payload["validationErrors"];
            cb(null, payload["prescriptions"]);
        });
    };
    PrescriptionService.prototype.searchPrescriptionsAsync = function (includes, excludes, filters, limit, offset, opts) {
        var service = this;
        return new Promise(function (res, rej) {
            service.searchPrescriptions(includes, excludes, filters, limit, offset, opts, function (err, reports) {
                if (err)
                    return rej(err);
                res(reports);
            });
        });
    };
    PrescriptionService.prototype.searchPrescriptionsCount = function (includes, excludes, filters, cb) {
        var _this_1 = this;
        var _this = this;
        this.exec(Handlers_1.Handlers.HANDLER_SEARCH_PRESCRIPTIONS_COUNT_METHOD, { includes: includes, excludes: excludes, filters: filters.plain() }, function (err, payload) {
            if (err)
                return cb(err, 0, false);
            _this_1.recognitionResults = payload["recognitionResults"];
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
}(jsonRpcService_1.JsonRPCCredService));
exports.PrescriptionService = PrescriptionService;
