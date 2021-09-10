"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EHR = void 0;
///<amd-module name='MedMe'/>
var Types = require("./types/index");
var index_1 = require("./models/index");
var index_2 = require("./services/index");
var index_3 = require("./formatters/index");
var Handlers_1 = require("./Handlers");
var index_4 = require("./messages/index");
exports.EHR = {
    SDK_VERSION: "1.8.13",
    Types: Types,
    Models: index_1.default,
    Services: index_2.default,
    Formatters: index_3.default,
    Handlers: Handlers_1.Handlers,
    Messages: index_4.default,
};
