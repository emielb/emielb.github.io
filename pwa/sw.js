const currentCacheVersion = 'v1';

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            let cleanUp = false;
            return Promise.all(keyList.map((key) => {
                if (key !== currentCacheVersion) {
                    cleanUp = true
                    return caches.delete(key);
                }
            }))
                .then(() => cleanUp && console.log('Old caches deleted!'))
                .catch((err) => console.error('Deleting old caches failed:', err));
        }),
    );
    console.log('Service worker is active!');
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(currentCacheVersion).then((cache) => {
            return cache.addAll([
                './images/dino-xxxhdpi.png',
                './',
                './index.html',
            ]);
        })
            .then(() => console.log('Cache set up!'))
            .catch((err) => console.error('Caching failed:', err)),
    );
    console.log('Service worker has been installed!')
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResp) => {
            return cachedResp || fetch(event.request).then((response) => {
                return caches.open(currentCacheVersion).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        }),
    );
});
