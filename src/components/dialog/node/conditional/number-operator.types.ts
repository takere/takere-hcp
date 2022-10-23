/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleService from "../../../../services/locale.service";


// ----------------------------------------------------------------------------
//         Constants
// ----------------------------------------------------------------------------
const localeService = new LocaleService();

const numberOperators = [
  {
    "value": "==",
    "label": localeService.translate("EQUALS_TO")
  },
  {
    "value": "!=",
    "label": localeService.translate("NOT_EQUALS_TO")
  },
  {
    "value": ">=",
    "label": localeService.translate("GREATER_EQUALS")
  },
  {
    "value": ">",
    "label": localeService.translate("GREATER")
  },
  {
    "value": "<=",
    "label": localeService.translate("LESS_EQUALS")
  },
  {
    "value": "<",
    "label": localeService.translate("LESS")
  }
];

export default numberOperators;
