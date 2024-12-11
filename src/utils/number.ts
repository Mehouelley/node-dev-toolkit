export class NumberUtils {
  static format(num: number, locale: string = 'en-US', options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(locale, options).format(num);
  }

  static formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(amount);
  }

  static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  static random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}