import express from 'express';
import { Logger } from '../src/logger';
import { createRateLimiter } from '../src/middleware/rate-limiter';
import { dataRouter } from '../src/routes/data';

const app = express();
const port = 3000;
const logger = Logger.getInstance();

// Apply rate limiting middleware
app.use(createRateLimiter(100, 10)); // 100 requests, 10 per second

// Mount routes
app.use('/api/data', dataRouter);

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});