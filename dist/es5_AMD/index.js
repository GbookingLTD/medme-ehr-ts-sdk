define("MedMe", ["require", "exports", "./types/index", "./models/index", "./services/index", "./formatters/index", "./Handlers"], function (require, exports, Types, index_1, index_2, index_3, Handlers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EHR = void 0;
    exports.EHR = {
        SDK_VERSION: '1.7.6',
        Types: Types,
        Models: index_1.default,
        Services: index_2.default,
        Formatters: index_3.default,
        Handlers: Handlers_1.Handlers
    };
});
