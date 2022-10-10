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
]
