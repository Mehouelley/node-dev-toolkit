import { describe, it, expect } from 'vitest';
import { Translator } from '../../i18n/translator';

describe('Translator', () => {
  it('should translate simple strings', () => {
    const translator = new Translator('en');
    translator.addTranslations('en', {
      hello: 'Hello {{name}}!'
    });

    expect(translator.translate('hello', { name: 'John' })).toBe('Hello John!');
  });

  it('should handle nested translations', () => {
    const translator = new Translator('fr');
    translator.addTranslations('fr', {
      messages: {
        welcome: 'Bienvenue {{name}}!',
        goodbye: 'Au revoir {{name}}!'
      }
    });

    expect(translator.translate('messages.welcome', { name: 'Marie' })).toBe('Bienvenue Marie!');
  });

  it('should throw error for missing locale', () => {
    const translator = new Translator('en');
    expect(() => translator.setLocale('es')).toThrow();
  });
});