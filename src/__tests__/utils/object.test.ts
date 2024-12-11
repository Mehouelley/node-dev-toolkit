import { describe, it, expect } from 'vitest';
import { ObjectUtils } from '../../utils/object';

describe('ObjectUtils', () => {
  it('should pick specified properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(ObjectUtils.pick(obj, ['a', 'b'])).toEqual({ a: 1, b: 2 });
  });

  it('should omit specified properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(ObjectUtils.omit(obj, ['a'])).toEqual({ b: 2, c: 3 });
  });

  it('should deep clone objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const clone = ObjectUtils.deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
  });
});