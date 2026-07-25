import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "ar", label: "العربية", dir: "rtl" as const },
];

const STORAGE_KEY = "eveforce_lang";

const getStoredLanguage = () => {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(STORAGE_KEY) || "en";
};

export const applyDocumentDirection = (lng: string) => {
  if (typeof document === "undefined") return;
  const meta = SUPPORTED_LANGUAGES.find((l) => l.code === lng);
  document.documentElement.dir = meta?.dir ?? "ltr";
  document.documentElement.lang = lng;
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: getStoredLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lng);
  }
  applyDocumentDirection(lng);
});

applyDocumentDirection(i18n.language);

export default i18n;
