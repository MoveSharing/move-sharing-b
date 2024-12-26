import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { langs } from '@/locales';
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { LanguageDetectorAsyncModule } from 'i18next';

const STORE_LANGUAGE_KEY = "lang";

const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  init: () => { },
  detect: (callback: (lang: string) => void) => {
    AsyncStorage.getItem(STORE_LANGUAGE_KEY)
      .then((language) => {
        if (language) {
          callback(language); // Pass the detected language
        } else {
          callback("en"); // Default language
        }
      })
      .catch((error) => {
        console.error("Error reading language", error);
        callback("en"); // Fallback to default on error
      });
  },
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem(STORE_LANGUAGE_KEY, language).catch((error) =>
      console.error("Error caching language", error)
    );
  },
};

const resources = {
  en: {
    translation: langs.en.text,
  },
  it: {
    translation: langs.it.text,
  },
};

i18n
  .use(languageDetectorPlugin)
  .use(initReactI18next)
  .init({
    resources,
    compatibilityJSON: 'v4',
    fallbackLng: "it",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
