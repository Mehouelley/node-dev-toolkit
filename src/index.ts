import express, { Request, Response, NextFunction } from 'express';
import { MemoryCache } from './cache/memory-cache';
import { TokenBucket } from './rate-limiter/token-bucket';
import { retry } from './async/retry';
import { Logger } from './logger';
import { SafeFileSystem } from './fs/safe-operations';

const app = express();
const port = 3000;

// Initialiser les utilitaires
const cache = new MemoryCache<string>();
const rateLimiter = new TokenBucket(100, 10); // 100 requêtes, 10 par seconde
const logger = Logger.getInstance();

// Middleware de rate limiting
app.use(async (req: Request, res: Response, next: NextFunction) => {
  const allowed = await rateLimiter.consume();
  if (!allowed) {
    return res.status(429).json({ error: 'Too Many Requests' });
  }
  next();
});

// Route de démonstration
app.get('/api/data/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const cacheKey = `data:${id}`;

  // Vérifier le cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    logger.info('Cache hit', { id });
    return res.json(JSON.parse(cachedData));
  }

  try {
    // Simuler une requête avec retry
    const data = await retry(
      async () => {
        // Simuler un délai et une possible erreur
        await new Promise(resolve => setTimeout(resolve, 100));
        if (Math.random() < 0.3) {
          throw new Error('Simulated error');
        }
        return { id, timestamp: new Date(), value: Math.random() };
      },
      {
        maxAttempts: 3,
        delay: 1000,
        onRetry: (error: Error, attempt: number) => {
          logger.warn('Retry attempt', { attempt, error: error.message });
        }
      }
    );

    // Sauvegarder dans le cache (TTL: 60 secondes)
    cache.set(cacheKey, JSON.stringify(data), 60);
    
    // Sauvegarder dans un fichier pour la persistance
    await SafeFileSystem.writeFileSafe(
      `./data/${id}.json`,
      JSON.stringify(data, null, 2)
    );

    logger.info('Data processed successfully', { id });
    res.json(data);
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to process request', { id, error: err.message });
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});

export * from './cache/memory-cache';
export * from './rate-limiter/token-bucket';
export * from './async/retry';
export * from './fs/safe-operations';
export * from './logger';