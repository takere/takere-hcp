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

const selectionOperators = [
  {
    "value": "==",
    "label": localeService.translate("IS")
  },
  {
    "value": "!=",
    "label": localeService.translate("IS_NOT")
  }
];

export default selectionOperators;
