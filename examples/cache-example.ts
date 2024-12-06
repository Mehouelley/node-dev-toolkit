import { MemoryCache } from '../src/cache/memory-cache';

async function cacheExample() {
  // Créer un cache
  const cache = new MemoryCache<string>();

  // Stocker des valeurs
  cache.set('user:1', JSON.stringify({ name: 'John' }), 3600);
  cache.set('user:2', JSON.stringify({ name: 'Jane' }), 3600);

  // Récupérer des valeurs
  const user1 = cache.get('user:1');
  console.log('User 1:', user1 ? JSON.parse(user1) : null);

  // Attendre que la valeur expire
  await new Promise(resolve => setTimeout(resolve, 2000));

  // La valeur est toujours là
  const stillThere = cache.get('user:1');
  console.log('Still there:', stillThere ? JSON.parse(stillThere) : null);
}

cacheExample().catch(console.error);