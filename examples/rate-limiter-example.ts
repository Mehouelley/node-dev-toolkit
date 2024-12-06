import { TokenBucket } from '../src/rate-limiter/token-bucket';

async function rateLimiterExample() {
  // Créer un rate limiter (5 requêtes par seconde)
  const limiter = new TokenBucket(5, 5);

  // Simuler 10 requêtes rapides
  for (let i = 0; i < 10; i++) {
    const allowed = await limiter.consume();
    console.log(`Request ${i + 1}: ${allowed ? 'allowed' : 'rate limited'}`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

rateLimiterExample().catch(console.error);