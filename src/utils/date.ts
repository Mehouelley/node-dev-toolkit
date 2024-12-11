import { format, addDays, isWeekend, parse, isValid } from 'date-fns';

export class DateUtils {
  static format(date: Date, pattern: string = 'yyyy-MM-dd'): string {
    return format(date, pattern);
  }

  static parse(dateString: string, pattern: string = 'yyyy-MM-dd'): Date {
    const parsed = parse(dateString, pattern, new Date());
    if (!isValid(parsed)) {
      throw new Error('Invalid date string');
    }
    return parsed;
  }

  static addDays(date: Date, amount: number): Date {
    return addDays(date, amount);
  }

  static isWeekend(date: Date): boolean {
    return isWeekend(date);
  }

  static isValid(date: Date | string): boolean {
    return isValid(typeof date === 'string' ? new Date(date) : date);
  }
}