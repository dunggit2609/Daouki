import { listLocalStorage } from "constant/config";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../assets/translations/en.json";
import vi from "../../assets/translations/vi.json";

const allowedLanguages = ["en", "vi"];

const defaultLng = "en";
let lng = defaultLng;

const storageLanguage = localStorage.getItem(listLocalStorage.language);
if (!storageLanguage) {
  localStorage.setItem(listLocalStorage.language, "en");
}
if (storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
  lng = storageLanguage;
}

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: lng, // language to use
  resources: {
    en: {
      translation: en, // 'common' is our custom namespace
    },
    vi: {
      translation: vi,
    },
  },
});

export default i18n;
