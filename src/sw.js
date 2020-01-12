// Внимание: ваши данные могут отличаться!
const CACHE_NAME = 'hop-hop-v1.0.3';
const cacheList = [
    'https://yandex.ru/games/sdk/v2',
    'index.html',
    'bundle.js',
    'styles.css',
    'assets/ball.png',
    'assets/ground.png',
    'assets/obstacle.png',
    'assets/particle.png',
    'assets/particle2.png',
    'assets/sounds/back.mp3',
    'assets/sounds/back.ogg',
    'assets/sounds/gameover.mp3',
    'assets/sounds/gameover.ogg',
    'assets/sounds/hit.mp3',
    'assets/sounds/hit.ogg',
    'assets/fonts/aire_exteriorregular/stylesheet.css',
    'assets/fonts/aire_exteriorregular/18685-webfont.eot',
    'assets/fonts/aire_exteriorregular/18685-webfont.ttf',
    'assets/fonts/aire_exteriorregular/18685-webfont.woff',
    'assets/fonts/aire_exteriorregular/18685-webfont.woff2',
];

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(cacheList);
        })
    );
});

// Внимание: ваши данные могут отличаться!
const CACHE_PREFIX = 'hop-hop';

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
