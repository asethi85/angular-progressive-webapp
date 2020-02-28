const CACHE_NAME = 'angular-pwa-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/polyfills.js',
  '/favicon.ico',
  '/main.js',
  '/manifest.json',
  '/vendor.js',
  '/runtime.js',
  '/styles.js',
];

self.addEventListener('install', () => {
  console.log('Installing ServiceWorker');
  caches.open(CACHE_NAME).then((cache) => {
    console.info('Caching offline pages');
    return cache.addAll(FILES_TO_CACHE);
  }).catch(e => console.warn(e));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Activating ServiceWorker');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Refreshing Cache', key);
          return caches.delete(key);
        }
      })).catch(e => console.warn(e));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.info(event.request.url);
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        });
    }).catch(e => console.warn(e))
  );
});
