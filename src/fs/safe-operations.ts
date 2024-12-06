import { promises as fs } from 'fs';
import { dirname } from 'path';

export class SafeFileSystem {
  static async writeFileSafe(
    path: string,
    data: string | Buffer,
    options?: Parameters<typeof fs.writeFile>[2]
  ): Promise<void> {
    await this.ensureDir(dirname(path));
    await fs.writeFile(path, data, options);
  }

  static async readFileSafe(
    path: string,
    options?: { encoding?: BufferEncoding }
  ): Promise<string | Buffer> {
    try {
      return await fs.readFile(path, options);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return options?.encoding ? '' : Buffer.from('');
      }
      throw error;
    }
  }

  static async ensureDir(path: string): Promise<void> {
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error;
      }
    }
  }

  static async removeIfExists(path: string): Promise<void> {
    try {
      await fs.unlink(path);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }
  }
}