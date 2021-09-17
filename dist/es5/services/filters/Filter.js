import { FilterKeys } from "./FilterTypes";
var Filter = /** @class */ (function () {
    function Filter(localize) {
        this.localize = localize;
    }
    Object.defineProperty(Filter.prototype, "key", {
        get: function () {
            return FilterKeys[this.kind];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "name", {
        get: function () {
            return this.localize[this.key];
        },
        enumerable: false,
        configurable: true
    });
    return Filter;
}());
export { Filter };
