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
Object.defineProperty(exports, "__esModule", { value: true });
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrescriptionByBusinessIdFilter.prototype, "kind", {
        get: function () {
            return FilterTypes_1.FilterTypeEnum.PrescriptionByBusiness;
        },
        enumerable: true,
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
}(Filters_1.Filter));
exports.PrescriptionByBusinessIdFilter = PrescriptionByBusinessIdFilter;
var PrescriptionByCreatedFilter = /** @class */ (function (_super) {
    __extends(PrescriptionByCreatedFilter, _super);
    function PrescriptionByCreatedFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PrescriptionByCreatedFilter.prototype, "kind", {
        get: function () {
            return FilterTypes_1.FilterTypeEnum.PrescriptionByCreated;
        },
        enumerable: true,
        configurable: true
    });
    return PrescriptionByCreatedFilter;
}(DatePeriodFilter_1.DatePeriodFilter));
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrescriptionByPatientIdFilter.prototype, "kind", {
        get: function () {
            return FilterTypes_1.FilterTypeEnum.PrescriptionByPatient;
        },
        enumerable: true,
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
}(Filters_1.Filter));
exports.PrescriptionByPatientIdFilter = PrescriptionByPatientIdFilter;
function limitText(n, text) {
    if (n < text.length) {
        return text.substring(0, n) + "...";
    }
    return text;
}
var PrescriptionByDiagnosisCd10Filter = /** @class */ (function (_super) {
    __extends(PrescriptionByDiagnosisCd10Filter, _super);
    function PrescriptionByDiagnosisCd10Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cd10 = [];
        return _this;
    }
    Object.defineProperty(PrescriptionByDiagnosisCd10Filter.prototype, "prettyValue", {
        get: function () {
            return limitText(80, this.cd10.join(", "));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrescriptionByDiagnosisCd10Filter.prototype, "kind", {
        get: function () {
            return FilterTypes_1.FilterTypeEnum.PrescriptionByDiagnosisCd10;
        },
        enumerable: true,
        configurable: true
    });
    PrescriptionByDiagnosisCd10Filter.prototype.isEmpty = function () {
        return !this.cd10 || this.cd10.length == 0;
    };
    PrescriptionByDiagnosisCd10Filter.prototype.setup = function (val) {
        this.cd10 = (val === null || val === void 0 ? void 0 : val.cd10) || [];
    };
    PrescriptionByDiagnosisCd10Filter.prototype.plain = function () {
        return {
            cd10: this.cd10 || [],
        };
    };
    return PrescriptionByDiagnosisCd10Filter;
}(Filters_1.Filter));
exports.PrescriptionByDiagnosisCd10Filter = PrescriptionByDiagnosisCd10Filter;
var PrescriptionFilters = /** @class */ (function (_super) {
    __extends(PrescriptionFilters, _super);
    function PrescriptionFilters(localize) {
        var _this = _super.call(this) || this;
        _this.byBusinessId = new PrescriptionByBusinessIdFilter(localize);
        _this.byCreated = new PrescriptionByCreatedFilter(localize);
        _this.byPatientId = new PrescriptionByPatientIdFilter(localize);
        _this.byDiagnosisCd10 = new PrescriptionByDiagnosisCd10Filter(localize);
        return _this;
    }
    PrescriptionFilters.createWithLocale = function (locale) {
        return new PrescriptionFilters(index_1.default.getByLocaleCode(locale)["filters"]);
    };
    PrescriptionFilters.prototype.setup = function (val) {
        if (isNullUndef(val))
            return;
        this.byBusinessId.setup(val["byBusines"]);
        this.byCreated.setup(val["byCreated"]);
        this.byPatientId.setup(val["byPatient"]);
        this.byDiagnosisCd10.setup(val["byDiagnosis"]);
    };
    PrescriptionFilters.prototype.plain = function () {
        return {
            byBusiness: this.byBusinessId.plain(),
            byCreated: this.byCreated.plain(),
            byPatient: this.byPatientId.plain(),
            byDiagnosisCd10: this.byDiagnosisCd10.plain(),
        };
    };
    PrescriptionFilters.prototype.getFilters = function () {
        return [this.byBusinessId, this.byCreated, this.byPatientId, this.byDiagnosisCd10];
    };
    return PrescriptionFilters;
}(Filters_1.FilterList));
exports.PrescriptionFilters = PrescriptionFilters;
