self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith('http')) return; // ignorar requests internos
  e.respondWith(
    fetch(e.request).catch(() => {
      return new Response('Offline or blocked request', {
        status: 503,
        statusText: 'Service Worker'
      });
    })
  );
});

