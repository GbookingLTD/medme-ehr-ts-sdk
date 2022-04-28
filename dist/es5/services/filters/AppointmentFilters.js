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
import l10n from "../../formatters/l10n/index";
import { DatePeriodFilter } from "./DatePeriodFilter";
import { Filter, FilterList } from "./Filters";
import { FilterKeys, FilterTypeEnum } from "./FilterTypes";
function isNullUndefEmpty(val) {
    return typeof val === "undefined" || val === null || val === "";
}
function isNullUndef(val) {
    return val === null || typeof val === "undefined";
}
function isNullUndefZero(val) {
    return val === null || typeof val === "undefined" || val.getTime() === 0;
}
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
            return FilterTypeEnum.AppointmentByBusiness;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppointmentByBusinessIdFilter.prototype, "key", {
        get: function () {
            return FilterKeys[this.kind];
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
}(Filter));
export { AppointmentByBusinessIdFilter };
var AppointmentByCreatedFilter = /** @class */ (function (_super) {
    __extends(AppointmentByCreatedFilter, _super);
    function AppointmentByCreatedFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AppointmentByCreatedFilter.prototype, "kind", {
        get: function () {
            return FilterTypeEnum.AppointmentByCreated;
        },
        enumerable: false,
        configurable: true
    });
    return AppointmentByCreatedFilter;
}(DatePeriodFilter));
export { AppointmentByCreatedFilter };
var AppointmentByStartFilter = /** @class */ (function (_super) {
    __extends(AppointmentByStartFilter, _super);
    function AppointmentByStartFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AppointmentByStartFilter.prototype, "kind", {
        get: function () {
            return FilterTypeEnum.AppointmentByStarted;
        },
        enumerable: false,
        configurable: true
    });
    return AppointmentByStartFilter;
}(DatePeriodFilter));
export { AppointmentByStartFilter };
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
            return FilterTypeEnum.AppointmentByPatientId;
        },
        enumerable: false,
        configurable: true
    });
    AppointmentByPatientIdFilter.prototype.isEmpty = function () {
        return isNullUndefEmpty(this.patientId);
    };
    return AppointmentByPatientIdFilter;
}(Filter));
export { AppointmentByPatientIdFilter };
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
        return new AppointmentFilters(l10n.getByLocaleCode(locale)["filters"]);
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
}(FilterList));
export { AppointmentFilters };
