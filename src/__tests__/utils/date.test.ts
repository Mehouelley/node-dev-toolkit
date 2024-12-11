import { describe, it, expect } from 'vitest';
import { DateUtils } from '../../utils/date';

describe('DateUtils', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-01');
    expect(DateUtils.format(date)).toBe('2024-01-01');
  });

  it('should parse date string correctly', () => {
    const date = DateUtils.parse('2024-01-01');
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
  });

  it('should detect weekend correctly', () => {
    const saturday = new Date('2024-01-06');
    const monday = new Date('2024-01-08');
    expect(DateUtils.isWeekend(saturday)).toBe(true);
    expect(DateUtils.isWeekend(monday)).toBe(false);
  });
});