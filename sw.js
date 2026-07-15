// Service worker for Cave Explorer 3D (PWA).
// Bump CACHE_VERSION whenever index.html or assets change so clients update.
const CACHE_VERSION = 'cave3d-v1';
const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

// Relative paths resolve against this file's folder → works on GitHub Pages subpaths.
const LOCAL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(LOCAL);
    // best-effort cache the Three.js engine so the game runs offline after the first online visit
    try { await cache.add(new Request(THREE_URL, { mode: 'cors' })); } catch (e) {}
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    event.respondWith(caches.match('./index.html').then((c) => c || fetch(req)));
    return;
  }
  // cache-first, fall back to network (and cache what we fetch, incl. the CDN)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => cached);
    })
  );
});
