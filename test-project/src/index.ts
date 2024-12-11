import express from 'express';
import {
  Logger,
  MemoryCache,
  TokenBucket,
  StringUtils,
  DateUtils,
  ValidationError
} from 'node-dev-toolkit';

const app = express();
const port = 3000;

// Initialize utilities
const logger = Logger.getInstance();
const cache = new MemoryCache<string>();
const rateLimiter = new TokenBucket(100, 10);

// Middleware
app.use(express.json());

// Rate limiting middleware
app.use(async (req, res, next) => {
  const allowed = await rateLimiter.consume();
  if (!allowed) {
    return res.status(429).json({ error: 'Too Many Requests' });
  }
  next();
});

// Test routes
app.get('/api/utils/string/:text', (req, res) => {
  const { text } = req.params;
  res.json({
    original: text,
    capitalized: StringUtils.capitalize(text),
    slug: StringUtils.slugify(text),
    truncated: StringUtils.truncate(text, 10)
  });
});

app.get('/api/utils/date', (req, res) => {
  const now = new Date();
  res.json({
    formatted: DateUtils.format(now),
    isWeekend: DateUtils.isWeekend(now),
    plusOneWeek: DateUtils.addDays(now, 7)
  });
});

app.post('/api/cache/set', (req, res) => {
  const { key, value } = req.body;
  
  if (!key || !value) {
    throw new ValidationError('Key and value are required');
  }

  cache.set(key, JSON.stringify(value), 60);
  res.json({ message: 'Value cached successfully' });
});

app.get('/api/cache/get/:key', (req, res) => {
  const { key } = req.params;
  const value = cache.get(key);
  
  if (!value) {
    return res.status(404).json({ error: 'Cache key not found' });
  }

  res.json({ value: JSON.parse(value) });
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Error occurred:', { error: err.message });
  
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
  logger.info(`Test server running at http://localhost:${port}`);
  logger.info('Available endpoints:');
  logger.info('- GET /api/utils/string/:text');
  logger.info('- GET /api/utils/date');
  logger.info('- POST /api/cache/set');
  logger.info('- GET /api/cache/get/:key');
});