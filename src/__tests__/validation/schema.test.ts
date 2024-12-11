import { describe, it, expect } from 'vitest';
import { SchemaValidator } from '../../validation/schema';

describe('SchemaValidator', () => {
  it('should validate object schema', () => {
    const userSchema = SchemaValidator.object({
      name: SchemaValidator.string(),
      age: SchemaValidator.number(),
      email: SchemaValidator.email()
    });

    const validUser = {
      name: 'John',
      age: 30,
      email: 'john@example.com'
    };

    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it('should reject invalid data', () => {
    const userSchema = SchemaValidator.object({
      name: SchemaValidator.string(),
      age: SchemaValidator.number(),
      email: SchemaValidator.email()
    });

    const invalidUser = {
      name: 'John',
      age: '30', // Should be number
      email: 'invalid-email'
    };

    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });
});