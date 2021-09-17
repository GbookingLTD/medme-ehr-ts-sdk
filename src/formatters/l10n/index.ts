import ruRU from "./ru-ru";
import enUS from "./en-us";
import { LocaleCode } from "../LocaleCode";

export default {
  ruRU,
  enUS,
  getByLocaleCode(locale: LocaleCode) {
    return {
      "ru-ru": ruRU,
      "en-us": enUS,
    }[locale];
  },
};
