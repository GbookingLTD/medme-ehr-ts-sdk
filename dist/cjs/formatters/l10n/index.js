"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ru_ru_1 = require("./ru-ru");
var en_us_1 = require("./en-us");
exports.default = {
    ruRU: ru_ru_1.default,
    enUS: en_us_1.default,
    getByLocaleCode: function (locale) {
        return {
            "ru-ru": ru_ru_1.default,
            "en-us": en_us_1.default,
        }[locale];
    },
};
