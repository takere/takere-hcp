import LocaleService from "../../../services/locale.service";

const localeService = new LocaleService();

export default [
  {
    "value": "==",
    "label": localeService.translate("IS")
  },
  {
    "value": "!=",
    "label": localeService.translate("IS_NOT")
  }
]
