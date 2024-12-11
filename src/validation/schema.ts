import { z } from 'zod';

export class SchemaValidator {
  static object<T extends z.ZodRawShape>(shape: T) {
    return z.object(shape);
  }

  static string() {
    return z.string();
  }

  static number() {
    return z.number();
  }

  static boolean() {
    return z.boolean();
  }

  static email() {
    return z.string().email();
  }

  static date() {
    return z.date();
  }

  static array<T extends z.ZodTypeAny>(type: T) {
    return z.array(type);
  }
}