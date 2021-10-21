self.addEventListener('activate', () => {
    console.log('Service worker is actief!');
});

self.addEventListener('install', (ev) => {
    self.skipWaiting();
    console.log('Service worker is geïnstalleerd!')
});
