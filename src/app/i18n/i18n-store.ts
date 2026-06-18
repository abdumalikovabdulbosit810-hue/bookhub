import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language, TranslationKey, translations } from "@/app/i18n/translations";

type I18nState = {
  language: Language;
  direction: "ltr" | "rtl";
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

export const useI18n = create<I18nState>()(
  persist(
    (set, get) => ({
      language: "uz",
      direction: "ltr",
      setLanguage: (language) => {
        if (typeof document !== "undefined") {
          document.documentElement.lang = language;
          document.documentElement.dir = "ltr";
        }
        set({ language, direction: "ltr" });
      },
      t: (key) => translations[get().language][key] ?? translations.en[key]
    }),
    { name: "kitob-i18n" }
  )
);
