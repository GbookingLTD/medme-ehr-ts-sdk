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
import { Filter, FilterList, } from "./Filters";
import { FilterTypeEnum } from "./FilterTypes";
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
            return FilterTypeEnum.PatientByName;
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
}(Filter));
export { PatientByNameFilter };
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
            return FilterTypeEnum.PatientByMedCard;
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
}(Filter));
export { PatientByMedCardFilter };
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
            return FilterTypeEnum.PatientByPhone;
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
}(Filter));
export { PatientByPhoneFilter };
var PatientByDoctorSpecialityIdFilter = /** @class */ (function (_super) {
    __extends(PatientByDoctorSpecialityIdFilter, _super);
    function PatientByDoctorSpecialityIdFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.specialityId = "";
        return _this;
    }
    Object.defineProperty(PatientByDoctorSpecialityIdFilter.prototype, "prettyValue", {
        get: function () {
            return this.specialityId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PatientByDoctorSpecialityIdFilter.prototype, "kind", {
        get: function () {
            return FilterTypeEnum.PatientByDoctorSpecialityId;
        },
        enumerable: false,
        configurable: true
    });
    PatientByDoctorSpecialityIdFilter.prototype.isEmpty = function () {
        return isNullUndefEmpty(this.specialityId);
    };
    PatientByDoctorSpecialityIdFilter.prototype.setup = function (val) {
        this.specialityId = val.id;
    };
    PatientByDoctorSpecialityIdFilter.prototype.plain = function () {
        return { id: this.specialityId };
    };
    return PatientByDoctorSpecialityIdFilter;
}(Filter));
export { PatientByDoctorSpecialityIdFilter };
var PatientByDoctorSpecialityIdsFilter = /** @class */ (function (_super) {
    __extends(PatientByDoctorSpecialityIdsFilter, _super);
    function PatientByDoctorSpecialityIdsFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.specialityIds = [];
        return _this;
    }
    Object.defineProperty(PatientByDoctorSpecialityIdsFilter.prototype, "prettyValue", {
        get: function () {
            return this.specialityIds.join(", ");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PatientByDoctorSpecialityIdsFilter.prototype, "kind", {
        get: function () {
            return FilterTypeEnum.PatientByDoctorSpecialityIds;
        },
        enumerable: false,
        configurable: true
    });
    PatientByDoctorSpecialityIdsFilter.prototype.isEmpty = function () {
        return this.specialityIds.length == 0;
    };
    PatientByDoctorSpecialityIdsFilter.prototype.setup = function (val) {
        this.specialityIds = val.ids;
    };
    PatientByDoctorSpecialityIdsFilter.prototype.plain = function () {
        return { ids: this.specialityIds };
    };
    return PatientByDoctorSpecialityIdsFilter;
}(Filter));
export { PatientByDoctorSpecialityIdsFilter };
var PatientByBirthdateFilter = /** @class */ (function (_super) {
    __extends(PatientByBirthdateFilter, _super);
    function PatientByBirthdateFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PatientByBirthdateFilter.prototype, "kind", {
        get: function () {
            return FilterTypeEnum.PatientByBirthdate;
        },
        enumerable: false,
        configurable: true
    });
    return PatientByBirthdateFilter;
}(DatePeriodFilter));
export { PatientByBirthdateFilter };
var PatientFilters = /** @class */ (function (_super) {
    __extends(PatientFilters, _super);
    function PatientFilters(localize) {
        var _this = _super.call(this) || this;
        _this.byMedCard = new PatientByMedCardFilter(localize);
        _this.byName = new PatientByNameFilter(localize);
        _this.byPhone = new PatientByPhoneFilter(localize);
        _this.byBirthdate = new PatientByBirthdateFilter(localize);
        _this.byDoctorSpecialityId = new PatientByDoctorSpecialityIdFilter(localize);
        _this.byDoctorSpecialityIds = new PatientByDoctorSpecialityIdsFilter(localize);
        return _this;
    }
    PatientFilters.createWithLocale = function (locale) {
        return new PatientFilters(l10n.getByLocaleCode(locale)["filters"]);
    };
    PatientFilters.prototype.getFilters = function () {
        return [
            this.byName,
            this.byMedCard,
            this.byPhone,
            this.byBirthdate,
            this.byDoctorSpecialityId,
            this.byDoctorSpecialityIds,
        ];
    };
    PatientFilters.prototype.setup = function (val) {
        if (isNullUndef(val))
            return;
        this.byName.setup(val["byName"]);
        this.byMedCard.setup(val["byMedCard"]);
        this.byPhone.setup(val["byPhone"]);
        this.byBirthdate.setup(val["byBirthdate"]);
        if (val["byDoctorSpecialityId"])
            this.byDoctorSpecialityId.setup(val["byDoctorSpecialityId"]);
        if (val["byDoctorSpecialityIds"])
            this.byDoctorSpecialityIds.setup(val["byDoctorSpecialityIds"]);
    };
    PatientFilters.prototype.plain = function () {
        return {
            byName: this.byName.plain(),
            byMedCard: this.byMedCard.plain(),
            byPhone: this.byPhone.plain(),
            byBirthdate: this.byBirthdate.plain(),
            byDoctorSpecialityId: this.byDoctorSpecialityId.plain(),
            byDoctorSpecialityIds: this.byDoctorSpecialityIds.plain(),
        };
    };
    return PatientFilters;
}(FilterList));
export { PatientFilters };
