const cacheName = "cache-v208";
const staticAssets = [
    '/',
    '/static/js/bundle.js',
    '/static/js/vendors~main.chunk.js',
    '/static/js/main.chunk.js',
    '/index.html',
    '/favicon.ico',
    '/manifest.webmanifest',
    '/logo.v2.192.png',
    '/logo.v2.512.png',
    '/masked_logo.v2.192.png',
    '/masked_logo.v2.512.png',

]

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', event => {
    self.clients.claim();
});

self.addEventListener('fetch', async event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin || url.pathname.split("/")[1] === "media") {
        event.respondWith(cacheFirst(req));
    }
});



async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        return cached;
    }
}