"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticReportFilters = exports.DiagnosticReportByPatientIdFilter = exports.DiagnosticReportByCreatedFilter = exports.DiagnosticReportByBusinessIdFilter = void 0;
var index_1 = require("../../formatters/l10n/index");
var DatePeriodFilter_1 = require("./DatePeriodFilter");
var Filters_1 = require("./Filters");
var FilterTypes_1 = require("./FilterTypes");
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
            return FilterTypes_1.FilterTypeEnum.DiagnosticReportByBusiness;
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
}(Filters_1.Filter));
exports.DiagnosticReportByBusinessIdFilter = DiagnosticReportByBusinessIdFilter;
var DiagnosticReportByCreatedFilter = /** @class */ (function (_super) {
    __extends(DiagnosticReportByCreatedFilter, _super);
    function DiagnosticReportByCreatedFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiagnosticReportByCreatedFilter.prototype, "kind", {
        get: function () {
            return FilterTypes_1.FilterTypeEnum.DiagnosticReportByCreated;
        },
        enumerable: false,
        configurable: true
    });
    return DiagnosticReportByCreatedFilter;
}(DatePeriodFilter_1.DatePeriodFilter));
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
            return FilterTypes_1.FilterTypeEnum.DiagnosticReportByPatientId;
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
}(Filters_1.Filter));
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
        return new DiagnosticReportFilters(index_1.default.getByLocaleCode(locale)["filters"]);
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
}(Filters_1.FilterList));
exports.DiagnosticReportFilters = DiagnosticReportFilters;
