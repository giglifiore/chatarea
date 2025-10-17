self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      // En caso de error, devolver algo por defecto
      return new Response('Offline or blocked request', { status: 503, statusText: 'Service Worker' });
    })
  );
});
