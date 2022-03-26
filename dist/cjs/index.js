"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EHR = void 0;
///<amd-module name='MedMe'/>
var Types = require("./types/index");
var index_1 = require("./services/index");
var index_2 = require("./formatters/index");
var Handlers_1 = require("./Handlers");
var index_3 = require("./messages/index");
exports.EHR = {
    SDK_VERSION: "1.8.13",
    Types: Types,
    Services: index_1.default,
    Formatters: index_2.default,
    Handlers: Handlers_1.Handlers,
    Messages: index_3.default,
};
