import { describe, it, expect } from 'vitest';
import { StringUtils } from '../../utils/string';

describe('StringUtils', () => {
  it('should capitalize string correctly', () => {
    expect(StringUtils.capitalize('hello')).toBe('Hello');
    expect(StringUtils.capitalize('WORLD')).toBe('World');
  });

  it('should create valid slug', () => {
    expect(StringUtils.slugify('Hello World!')).toBe('hello-world');
    expect(StringUtils.slugify('Café & Restaurant')).toBe('cafe-restaurant');
  });

  it('should truncate string correctly', () => {
    expect(StringUtils.truncate('Hello World', 5)).toBe('He...');
    expect(StringUtils.truncate('Short', 10)).toBe('Short');
  });
});