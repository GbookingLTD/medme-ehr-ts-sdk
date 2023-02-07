"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilterTypes_1 = require("./FilterTypes");
var FilterList = /** @class */ (function () {
    function FilterList() {
    }
    FilterList.prototype.isEmpty = function () {
        return this.getFilters().find(function (item) { return !item.isEmpty(); }) == null;
    };
    FilterList.prototype.getFilledFilters = function () {
        return this.getFilters().filter(function (item) { return !item.isEmpty(); });
    };
    return FilterList;
}());
exports.FilterList = FilterList;
var Filter = /** @class */ (function () {
    function Filter(localize) {
        this.localize = localize;
    }
    Object.defineProperty(Filter.prototype, "key", {
        get: function () {
            return FilterTypes_1.FilterKeys[this.kind];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "title", {
        get: function () {
            return this.localize[this.key];
        },
        enumerable: true,
        configurable: true
    });
    return Filter;
}());
exports.Filter = Filter;
