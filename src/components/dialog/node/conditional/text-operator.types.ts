/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleService from "../../../services/locale.service";

const localeService = new LocaleService();

export default [
  {
    "value": "==",
    "label": localeService.translate("EQUALS_TO")
  },
  {
    "value": "!=",
    "label": localeService.translate("NOT_EQUALS_TO")
  },
  {
    "value": "contains",
    "label": localeService.translate("CONTAINS")
  }
]
