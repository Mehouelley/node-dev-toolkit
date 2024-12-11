import { describe, it, expect } from 'vitest';
import { TokenManager } from '../../security/token';

describe('TokenManager', () => {
  const secretKey = 'test-secret-key';
  const tokenManager = new TokenManager(secretKey);

  it('should generate and verify tokens', () => {
    const payload = { userId: 123 };
    const token = tokenManager.generate(payload);
    const decoded = tokenManager.verify<typeof payload>(token);
    
    expect(decoded.userId).toBe(payload.userId);
  });

  it('should handle token expiration', () => {
    const payload = { userId: 123 };
    const token = tokenManager.generate(payload, { expiresIn: '1ms' });
    
    setTimeout(() => {
      expect(() => tokenManager.verify(token)).toThrow();
    }, 2);
  });

  it('should decode tokens without verification', () => {
    const payload = { userId: 123 };
    const token = tokenManager.generate(payload);
    const decoded = tokenManager.decode<typeof payload>(token);
    
    expect(decoded?.userId).toBe(payload.userId);
  });
});