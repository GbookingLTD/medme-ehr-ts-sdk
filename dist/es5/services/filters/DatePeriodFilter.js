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
import { Filter } from "./Filters";
function isNullUndefZero(val) {
    return val === null || typeof val === "undefined" || val.getTime() === 0;
}
var DatePeriodFilter = /** @class */ (function (_super) {
    __extends(DatePeriodFilter, _super);
    function DatePeriodFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DatePeriodFilter.prototype, "prettyValue", {
        get: function () {
            return (new Intl.DateTimeFormat("ru").format(this.from) +
                " — " +
                new Intl.DateTimeFormat("ru").format(this.to));
        },
        enumerable: true,
        configurable: true
    });
    DatePeriodFilter.prototype.setup = function (val) {
        this.from = (val === null || val === void 0 ? void 0 : val.from) ? new Date(Date.parse(val.from)) : null;
        this.to = (val === null || val === void 0 ? void 0 : val.to) ? new Date(Date.parse(val.to)) : null;
    };
    DatePeriodFilter.prototype.plain = function () {
        return {
            from: this.from ? this.from.toISOString() : "",
            to: this.to ? this.to.toISOString() : "",
        };
    };
    DatePeriodFilter.prototype.isEmpty = function () {
        return isNullUndefZero(this.from) && isNullUndefZero(this.to);
    };
    return DatePeriodFilter;
}(Filter));
export { DatePeriodFilter };
