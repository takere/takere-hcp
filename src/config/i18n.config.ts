import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import enTranslation from '../assets/locales/en.json';


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
const resources = {
  en: {
    translation: enTranslation,
  }
};


// ----------------------------------------------------------------------------
//         Setup
// ----------------------------------------------------------------------------
i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false
    }
  });


class I18nConfig {
  getLocale() {
    return i18n.language;
  }

  getLocales() {
    return i18n.languages;
  }

  setLocale(locale: any) {
    i18n.changeLanguage(locale)
  }

  translate(text: string, args = undefined) {
    return i18n.t(text, args)
  }
}

export default I18nConfig;
