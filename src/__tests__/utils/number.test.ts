import { describe, it, expect } from 'vitest';
import { NumberUtils } from '../../utils/number';

describe('NumberUtils', () => {
  it('should format numbers correctly', () => {
    expect(NumberUtils.format(1234.56)).toBe('1,234.56');
    expect(NumberUtils.formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
  });

  it('should clamp numbers correctly', () => {
    expect(NumberUtils.clamp(5, 0, 10)).toBe(5);
    expect(NumberUtils.clamp(-5, 0, 10)).toBe(0);
    expect(NumberUtils.clamp(15, 0, 10)).toBe(10);
  });

  it('should generate random numbers within range', () => {
    const num = NumberUtils.random(1, 10);
    expect(num).toBeGreaterThanOrEqual(1);
    expect(num).toBeLessThanOrEqual(10);
  });
});