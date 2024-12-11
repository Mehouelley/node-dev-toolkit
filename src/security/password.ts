import * as bcrypt from 'bcryptjs';

export class PasswordManager {
  static async hash(password: string, rounds: number = 10): Promise<string> {
    return bcrypt.hash(password, rounds);
  }

  static async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateSalt(rounds: number = 10): Promise<string> {
    return bcrypt.genSalt(rounds);
  }
}