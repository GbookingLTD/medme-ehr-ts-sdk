"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPatientEhrResultItem = exports.SearchPatientEhrFilters = exports.SearchPatientEhrKeywords = exports.SearchEntityKeywords = void 0;
var SearchEntityKeywords = /** @class */ (function () {
    function SearchEntityKeywords() {
    }
    SearchEntityKeywords.createWithValues = function (i, e) {
        var kw = new SearchEntityKeywords();
        kw.includes = i;
        kw.excludes = e;
        return kw;
    };
    return SearchEntityKeywords;
}());
exports.SearchEntityKeywords = SearchEntityKeywords;
var SearchPatientEhrKeywords = /** @class */ (function () {
    function SearchPatientEhrKeywords() {
    }
    return SearchPatientEhrKeywords;
}());
exports.SearchPatientEhrKeywords = SearchPatientEhrKeywords;
var SearchPatientEhrFilters = /** @class */ (function () {
    function SearchPatientEhrFilters() {
    }
    return SearchPatientEhrFilters;
}());
exports.SearchPatientEhrFilters = SearchPatientEhrFilters;
var SearchPatientEhrResultItem = /** @class */ (function () {
    function SearchPatientEhrResultItem() {
    }
    return SearchPatientEhrResultItem;
}());
exports.SearchPatientEhrResultItem = SearchPatientEhrResultItem;
