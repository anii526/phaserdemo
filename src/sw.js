// Внимание: ваши данные могут отличаться!
const CACHE_NAME = 'your-super-game-name-v1.0.3';
const cacheList = [
    'https://yandex.ru/games/sdk/v2',
    'index.html',
    'bundle.js'
];

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(cacheList);
        })
    );
});

// Внимание: ваши данные могут отличаться!
const CACHE_PREFIX = 'your-super-game-name';

this.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Внимание: ваши данные могут отличаться!
this.addEventListener('fetch', function(event) {
    if (
        event.request.method !== 'GET' ||
        event.request.url.indexOf('http://') === 0 ||
        event.request.url.indexOf('an.yandex.ru') !== -1
    ) {
        return;
    }

    event.respondWith(
        caches.match(event.request, {
            ignoreSearch: true
        }).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
