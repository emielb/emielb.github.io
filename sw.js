self.addEventListener('activate', () => {
    console.log('Service worker is active!');
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                './images/xxxhdpi.png',
                './',
                './index.html',
            ]);
        })
            .then(() => console.log('Cache set up!'))
            .catch((err) => console.error('Caching failed:', err)),
    );
    console.log('Service worker has been installed!')
});
