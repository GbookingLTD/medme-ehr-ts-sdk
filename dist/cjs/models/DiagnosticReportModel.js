"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticReportModel = void 0;
var Doctor_1 = require("../types/Doctor");
var Period_1 = require("../types/Period");
var Observation_1 = require("../types/Observation");
var Service_1 = require("../types/Service");
/**
 * Класс модели медикаментозного назначения.
 */
var DiagnosticReportModel = /** @class */ (function () {
    function DiagnosticReportModel() {
        this._issuedDate = new Date();
        this._effectivePeriod = new Period_1.Period();
        this._result = [];
        this._resultInterpreter = [];
        this._resultInterpretation = [];
        this._imagineMedia = [];
        this._attachments = [];
        this._services = [];
    }
    Object.defineProperty(DiagnosticReportModel.prototype, "id", {
        get: function () { return this._id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "status", {
        /**
         * Статус диагностического отчета.
         */
        get: function () { return this._status; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "type", {
        /**
         * Тип обследования.
         */
        get: function () { return this._type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "services", {
        /**
         * Список оказанных на исследовании услуг.
         */
        get: function () { return this._services; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "category", {
        /**
         * Категория сервисов диагностики (код).
         * @see http://hl7.org/fhir/valueset-diagnostic-service-sections.html
         */
        get: function () { return this._category; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "effectivePeriod", {
        /**
         * Период дат, в течение которых результаты теста считать действительными.
         */
        get: function () { return this._effectivePeriod; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "issuedDate", {
        /**
         * Дата публикации обследования пациенту.
         */
        get: function () { return this._issuedDate; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "result", {
        /**
         * Результаты обследования в нормализованном виде.
         */
        get: function () { return this._result; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "resultInterpreter", {
        /**
         * Врач, который интерпретировал результаты.
         */
        get: function () { return this._resultInterpreter; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "resultInterpretation", {
        /**
         * Интерпретация результатов обследования/анализов.
         */
        get: function () { return this._resultInterpretation; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "imagineMedia", {
        /**
         * Список ссылок на флюорографии, ЭКГ и т.п.
         */
        get: function () { return this._imagineMedia; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagnosticReportModel.prototype, "attachments", {
        /**
         * Весь отчет, как документ ворд, pdf  т.п.
         */
        get: function () { return this._attachments; },
        enumerable: false,
        configurable: true
    });
    DiagnosticReportModel.prototype.fromJson = function (json) {
        this._id = json.id;
        this._status = json.status;
        this._type = json.type;
        this._effectivePeriod = (new Period_1.Period).fromJson(json.effectivePeriod);
        this._issuedDate = new Date(json.issuedDate);
        this._result = [];
        if (json.result)
            for (var i = 0; i < json.result.length; ++i)
                this._result.push((new Observation_1.Observation).fromJson(json.result[i]));
        this._resultInterpreter = json.resultInterpreter ? json.resultInterpreter.map(function (d) { return (new Doctor_1.Doctor).fromJson(d); }) : [];
        this._resultInterpretation = json.resultInterpretation || [];
        this._imagineMedia = json.imagineMedia || [];
        this._attachments = json.attachments || [];
        this._services = [];
        if (json.services)
            for (var i = 0; i < json.services.length; ++i)
                this._services.push((new Service_1.Service).fromJson(json.services[i]));
        this._category = json.category;
        return this;
    };
    DiagnosticReportModel.prototype.toJson = function () {
        var payload = {};
        payload.id = this._id;
        payload.status = this._status;
        payload.type = this._type;
        payload.effectivePeriod = this._effectivePeriod ? this._effectivePeriod.toJson() : null;
        payload.issuedDate = this._issuedDate.toJSON();
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
