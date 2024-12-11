import jwt from 'jsonwebtoken';

export interface TokenOptions {
  expiresIn?: string | number;
  audience?: string | string[];
  issuer?: string;
}

export class TokenManager {
  constructor(private readonly secretKey: string) {}

  generate(payload: object, options: TokenOptions = {}): string {
    return jwt.sign(payload, this.secretKey, options);
  }

  verify<T extends object>(token: string): T {
    return jwt.verify(token, this.secretKey) as T;
  }

  decode<T extends object>(token: string): T | null {
    return jwt.decode(token) as T | null;
  }
}