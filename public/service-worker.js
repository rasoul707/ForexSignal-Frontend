const cacheName = "cache-v280";
const staticAssets = [
    '/',
    '/news',
    '/support',
    '/profile',

    '/auth/signin',
    '/auth/signup',

    '/static/js/bundle.js',
    '/static/js/vendors~main.chunk.js',
    '/static/js/main.chunk.js',

    '/static/css/main.96e32a7a.chunk.css',
    '/static/js/2.60f9ce7e.chunk.js',
    '/static/js/main.e3e96284.chunk.js',

    '/index.html',
    '/favicon.ico',

    '/manifest.webmanifest',

    '/logo.v2.192.png',
    '/logo.v2.512.png',
    '/masked_logo.v2.192.png',
    '/masked_logo.v2.512.png',

    '/static/media/logo.e49f7f96.png'
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