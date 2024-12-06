import { retry } from '../src/async/retry';

async function retryExample() {
  let attempts = 0;

  try {
    const result = await retry(
      async () => {
        attempts++;
        if (attempts < 3) {
          throw new Error('Simulated failure');
        }
        return 'Success!';
      },
      {
        maxAttempts: 3,
        delay: 1000,
        backoff: 'exponential',
        onRetry: (error, attempt) => {
          console.log(`Retry ${attempt} after error: ${error.message}`);
        }
      }
    );

    console.log('Final result:', result);
  } catch (error) {
    console.error('All retries failed:', error);
  }
}

retryExample().catch(console.error);