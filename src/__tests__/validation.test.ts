import { describe, it, expect } from 'vitest';
import { Validateur } from '../validation';

describe('Validateur', () => {
  describe('email', () => {
    it('valide un email correct', () => {
      const result = Validateur.email('test@example.com');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('invalide un email incorrect', () => {
      const result = Validateur.email('test@invalid');
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
    });
  });

  describe('telephone', () => {
    it('valide un numéro français correct', () => {
      const result = Validateur.telephone('0612345678');
      expect(result.isValid).toBe(true);
    });

    it('invalide un numéro incorrect', () => {
      const result = Validateur.telephone('123');
      expect(result.isValid).toBe(false);
    });
  });
});