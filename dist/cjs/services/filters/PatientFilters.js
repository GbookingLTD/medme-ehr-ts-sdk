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
exports.PatientFilters = exports.PatientByPhoneFilter = exports.PatientByMedCardFilter = exports.PatientByNameFilter = void 0;
var index_1 = require("../../formatters/l10n/index");
var Filters_1 = require("./Filters");
var FilterTypes_1 = require("./FilterTypes");
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
            return FilterTypes_1.FilterTypeEnum.PatientByName;
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
}(Filters_1.Filter));
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
            return FilterTypes_1.FilterTypeEnum.PatientByMedCard;
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
}(Filters_1.Filter));
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
            return FilterTypes_1.FilterTypeEnum.PatientByPhone;
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
}(Filters_1.Filter));
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
        return new PatientFilters(index_1.default.getByLocaleCode(locale)["filters"]);
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
}(Filters_1.FilterList));
exports.PatientFilters = PatientFilters;
