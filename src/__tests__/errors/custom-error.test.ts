import { describe, it, expect } from 'vitest';
import { ValidationError, NotFoundError, UnauthorizedError } from '../../errors/custom-error';

describe('Custom Errors', () => {
  it('should create ValidationError with correct properties', () => {
    const error = new ValidationError('Invalid input', { field: 'email' });
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.statusCode).toBe(400);
    expect(error.details).toEqual({ field: 'email' });
  });

  it('should create NotFoundError with correct properties', () => {
    const error = new NotFoundError('User not found');
    expect(error.code).toBe('NOT_FOUND');
    expect(error.statusCode).toBe(404);
  });

  it('should create UnauthorizedError with correct properties', () => {
    const error = new UnauthorizedError();
    expect(error.code).toBe('UNAUTHORIZED');
    expect(error.statusCode).toBe(401);
  });

  it('should serialize to JSON correctly', () => {
    const error = new ValidationError('Invalid input');
    const json = error.toJSON();
    expect(json.error.code).toBe('VALIDATION_ERROR');
    expect(json.error.message).toBe('Invalid input');
  });
});