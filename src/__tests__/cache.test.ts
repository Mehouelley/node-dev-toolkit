import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryCache } from '../cache/memory-cache';

describe('MemoryCache', () => {
  let cache: MemoryCache<string>;

  beforeEach(() => {
    cache = new MemoryCache<string>();
    vi.useFakeTimers();
  });

  it('should store and retrieve values', () => {
    cache.set('key1', 'value1', 60);
    expect(cache.get('key1')).toBe('value1');
  });

  it('should expire values after TTL', () => {
    cache.set('key1', 'value1', 60);
    vi.advanceTimersByTime(61 * 1000);
    expect(cache.get('key1')).toBeNull();
  });

  it('should delete values', () => {
    cache.set('key1', 'value1', 60);
    cache.delete('key1');
    expect(cache.get('key1')).toBeNull();
  });
});