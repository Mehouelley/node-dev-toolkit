import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TokenBucket } from '../rate-limiter/token-bucket';

describe('TokenBucket', () => {
  let limiter: TokenBucket;

  beforeEach(() => {
    vi.useFakeTimers();
    limiter = new TokenBucket(10, 1); // 10 tokens, 1 per second
  });

  it('should allow requests within capacity', async () => {
    const result = await limiter.consume(5);
    expect(result).toBe(true);
  });

  it('should reject requests exceeding capacity', async () => {
    await limiter.consume(8);
    const result = await limiter.consume(3);
    expect(result).toBe(false);
  });

  it('should refill tokens over time', async () => {
    await limiter.consume(10); // Use all tokens
    vi.advanceTimersByTime(5000); // Wait 5 seconds
    const result = await limiter.consume(5);
    expect(result).toBe(true);
  });
});