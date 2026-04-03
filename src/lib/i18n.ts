import enDict from "@/dictionaries/en.json";
import zhDict from "@/dictionaries/zh.json";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries = {
  en: enDict,
  zh: zhDict,
};

export type Dictionary = typeof enDict;

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
