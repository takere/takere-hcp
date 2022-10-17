/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import i18nConfig from "../config/i18n.config";
import Service from "./service";


/**
 * Responsible for providing translations according to some language.
 */
class LocaleService extends Service {
  
  // --------------------------------------------------------------------------
  //     Attributes
  // --------------------------------------------------------------------------
  private i18nProvider: any;


  // --------------------------------------------------------------------------
  //     Constructor
  // --------------------------------------------------------------------------
  public constructor() {
    super();
    this.i18nProvider = new i18nConfig();
  }


  // --------------------------------------------------------------------------
  //     Methods
  // --------------------------------------------------------------------------
  /**
   * Translates a text according to the language set.
   * 
   * @param      text Text to translate
   * @param      args Extra parameters (text must contain '%s' indicating
   * a parameter placeholder)
   * 
   * @returns    {string} Translated text
   */
  public translate(text: any, args = undefined): string {
    if (!args) {
      return this.i18nProvider.translate(text, args);
    }

    const translatedText = this.i18nProvider.translate(text, args);
    const parsedArgs = Array.isArray(args) ? args : [args];

    return this.fillParametersPlaceholder(translatedText, parsedArgs);
  }

  private fillParametersPlaceholder(text: string, parameters: string[]): string {
    return text
      .split("%s")
      .map((term: string, index: number) => parameters[index] 
        ? term + parameters[index] 
        : term
      )
      .join('');
  }


  // --------------------------------------------------------------------------
  //     Getters & Setters
  // --------------------------------------------------------------------------
  /**
   * Get current locale.
   * 
   * @returns    {string} The current locale code
   */
  public getCurrentLocale(): string {
    return this.i18nProvider.getLocale();
  }

  /**
   * Get all available locales.
   * 
   * @returns    {string[]} The list of available locale codes
   */
  public getLocales(): string[] {
    return this.i18nProvider.getLocales();
  }

  /**
   * Changes current locale.
   * 
   * @param      locale The locale to set. Must be from the list of available 
   * locales.
   */
  public setLocale(locale: any): void {
    if (this.getLocales().indexOf(locale) !== -1) {
      this.i18nProvider.setLocale(locale)
    }
  }
}

export default LocaleService