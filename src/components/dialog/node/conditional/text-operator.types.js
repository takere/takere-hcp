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
