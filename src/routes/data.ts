import { Router } from 'express';
import { MemoryCache } from '../cache/memory-cache';
import { retry } from '../async/retry';
import { Logger } from '../logger';
import { SafeFileSystem } from '../fs/safe-operations';

const router = Router();
const cache = new MemoryCache<string>();
const logger = Logger.getInstance();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `data:${id}`;

  // Check cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    logger.info('Cache hit', { id });
    return res.json(JSON.parse(cachedData));
  }

  try {
    // Simulate a request with retry
    const data = await retry(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (Math.random() < 0.3) {
          throw new Error('Simulated error');
        }
        return { id, timestamp: new Date(), value: Math.random() };
      },
      {
        maxAttempts: 3,
        delay: 1000,
        onRetry: (error, attempt) => {
          logger.warn('Retry attempt', { attempt, error: error.message });
        }
      }
    );

    // Save to cache (TTL: 60 seconds)
    cache.set(cacheKey, JSON.stringify(data), 60);
    
    // Save to file for persistence
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

export const dataRouter = router;