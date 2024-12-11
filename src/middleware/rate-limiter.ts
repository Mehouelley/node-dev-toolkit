import { Request, Response, NextFunction } from 'express';
import { TokenBucket } from '../rate-limiter/token-bucket';

export const createRateLimiter = (capacity: number, refillRate: number) => {
  const rateLimiter = new TokenBucket(capacity, refillRate);
  
  return async (req: Request, res: Response, next: NextFunction) => {
    const allowed = await rateLimiter.consume();
    if (!allowed) {
      return res.status(429).json({ error: 'Too Many Requests' });
    }
    next();
  };
};