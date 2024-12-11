import { describe, it, expect } from 'vitest';
import { PasswordManager } from '../../security/password';

describe('PasswordManager', () => {
  it('should hash and verify password', async () => {
    const password = 'mySecurePassword123';
    const hash = await PasswordManager.hash(password);
    
    const isValid = await PasswordManager.verify(password, hash);
    expect(isValid).toBe(true);
  });

  it('should reject incorrect password', async () => {
    const hash = await PasswordManager.hash('correctPassword');
    const isValid = await PasswordManager.verify('wrongPassword', hash);
    expect(isValid).toBe(false);
  });

  it('should generate different salts', async () => {
    const salt1 = await PasswordManager.generateSalt();
    const salt2 = await PasswordManager.generateSalt();
    expect(salt1).not.toBe(salt2);
  });
});