import i18nConfig from "../config/i18n.config";

class LocaleService {
  i18nProvider: any;

  /**
   *
   * @param i18nProvider The i18n provider
   */

  constructor() {
    this.i18nProvider = new i18nConfig();
  }

  /**
   *
   * @returns {string} The current locale code
   */

  getCurrentLocale() {
    return this.i18nProvider.getLocale();
  }

  /**
   *
   * @returns string[] The list of available locale codes
   */

  getLocales() {
    return this.i18nProvider.getLocales();
  }

  /**
   *
   * @param locale The locale to set. Must be from the list of available locales.
   */

  setLocale(locale: any) {

    if (this.getLocales().indexOf(locale) !== -1) {
      this.i18nProvider.setLocale(locale)
    }

  }

  /**
   *
   * @param string String to translate
   * @param args Extra parameters
   * @returns {string} Translated string
 
   */

  translate(string: any, args = undefined) {
    if (!args) {
      return this.i18nProvider.translate(string, args);
    }

    const text = this.i18nProvider.translate(string, args);
    const parsedArgs = Array.isArray(args) ? args : [args];

    return text
      .split("%s")
      .map((term: string, index: number) => parsedArgs[index] ? term + parsedArgs[index] : term)
      .join('');
  }
}

export default LocaleService