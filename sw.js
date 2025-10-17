const CACHE_NAME = 'la-chismosa-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html'
];

// Instalación: cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activación: limpiar caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

// Fetch: servir de cache o fetch normal
self.addEventListener('fetch', event => {
  const req = event.request;
  if (!req.url.startsWith('http')) return; // ignorar requests internos
  event.respondWith(
    caches.match(req).then(cachedResp => {
      return cachedResp || fetch(req).catch(() => {
        return new Response('Offline or blocked request', {
          status: 503,
          statusText: 'Service Worker'
        });
      });
    })
  );
});

