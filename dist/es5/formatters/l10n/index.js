import ruRU from "./ru-ru";
import enUS from "./en-us";
export default {
    ruRU: ruRU,
    enUS: enUS,
    getByLocaleCode: function (locale) {
        return {
            "ru-ru": ruRU,
            "en-us": enUS,
        }[locale];
    },
};
//# sourceMappingURL=index.js.map