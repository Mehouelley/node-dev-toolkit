# Node Dev Toolkit

Un ensemble d'outils essentiels pour les développeurs Node.js.

## Installation

```bash
npm install node-dev-toolkit
```

## Fonctionnalités

### 1. Cache System
```typescript
import { MemoryCache } from 'node-dev-toolkit';

// Créer un cache
const cache = new MemoryCache<string>();

// Stocker une valeur (expire dans 1 heure)
cache.set('key', 'value', 3600);

// Récupérer une valeur
const value = cache.get('key');

// Supprimer une valeur
cache.delete('key');

// Vider le cache
cache.clear();
```

### 2. Rate Limiter
```typescript
import { TokenBucket } from 'node-dev-toolkit';

// Créer un rate limiter (100 tokens, 10 par seconde)
const limiter = new TokenBucket(100, 10);

// Utiliser le rate limiter
async function handleRequest() {
  if (await limiter.consume()) {
    // Traiter la requête
  } else {
    // Limite atteinte
  }
}
```

### 3. Retry Mechanism
```typescript
import { retry } from 'node-dev-toolkit';

async function fetchData() {
  return retry(
    async () => {
      // Opération qui peut échouer
      return await fetch('https://api.example.com/data');
    },
    {
      maxAttempts: 3,
      delay: 1000,
      backoff: 'exponential',
      onRetry: (error, attempt) => {
        console.log(`Retry attempt ${attempt} after error: ${error.message}`);
      }
    }
  );
}
```

### 4. Safe File System Operations
```typescript
import { SafeFileSystem } from 'node-dev-toolkit';

// Écrire un fichier (crée les dossiers si nécessaire)
await SafeFileSystem.writeFileSafe('/path/to/file.txt', 'content');

// Lire un fichier (retourne une chaîne vide si le fichier n'existe pas)
const content = await SafeFileSystem.readFileSafe('/path/to/file.txt', { encoding: 'utf-8' });

// Supprimer un fichier s'il existe
await SafeFileSystem.removeIfExists('/path/to/file.txt');
```

### 5. Logger
```typescript
import { Logger } from 'node-dev-toolkit';

const logger = Logger.getInstance();

// Logging basique
logger.info('Operation completed', { details: 'some data' });
logger.error('Error occurred', { error: 'details' });

// Configuration personnalisée
Logger.configure({
  level: 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});
```

## Tests

Pour exécuter les tests :

```bash
npm test
```