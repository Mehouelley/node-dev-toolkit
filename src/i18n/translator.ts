export type TranslationDictionary = {
  [key: string]: string | TranslationDictionary;
};

export class Translator {
  private translations: Map<string, TranslationDictionary> = new Map();
  private currentLocale: string = 'en';

  constructor(defaultLocale: string = 'en') {
    this.currentLocale = defaultLocale;
  }

  addTranslations(locale: string, dictionary: TranslationDictionary): void {
    this.translations.set(locale, dictionary);
  }

  setLocale(locale: string): void {
    if (!this.translations.has(locale)) {
      throw new Error(`Translations for locale "${locale}" not found`);
    }
    this.currentLocale = locale;
  }

  translate(key: string, params: Record<string, string | number> = {}): string {
    const dictionary = this.translations.get(this.currentLocale);
    if (!dictionary) {
      throw new Error(`No translations found for locale "${this.currentLocale}"`);
    }

    const value = this.getNestedValue(dictionary, key);
    if (typeof value !== 'string') {
      return key;
    }

    return this.interpolate(value, params);
  }

  private getNestedValue(obj: TranslationDictionary, path: string): string | TranslationDictionary | undefined {
    return path.split('.').reduce((current: any, key) => current?.[key], obj);
  }

  private interpolate(text: string, params: Record<string, string | number>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key] ?? `{{${key}}}`));
  }
}