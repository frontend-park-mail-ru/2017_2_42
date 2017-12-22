const STATICS = [
  '/',
  '/main.js',
  // '/offline/lobby',
  // '/offline/game',
  // '/online/login',
  '/css/bundle.css',
  '/font/KGSecondChancesSketch.woff2',
  '/img/configuration.svg',
  '/img/exclamation.svg',
  '/img/speaker.svg',
  '/img/vkontakte-draw.svg',
  '/img/Ball.svg',
  '/img/chalk_input_border.png',
  '/img/chalk-background-filled.png',
  '/api/game/maps?sort=rating&offline=true',
  '/api/game/map/53',
  // '/api/game/map/54',
  // '/api/game/map/55',
  // '/api/game/map/56',
  // '/api/game/map/58',
];


const version = 'v4';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll(STATICS);
    })
  );
});


self.addEventListener('fetch', function(event) {
  const path = event.request.url.replace(event.request.referrer, '/');

  if (path.startsWith('/online') ||
    path.startsWith('/offline')) {
    console.log(path);
    event.request.url = event.request.referrer + '/';
  }

  event.respondWith(caches.match(event.request)
    .then(function(response) {
      if (response !== undefined) {
        return response;
      }
      return fetch(event.request).then(function(response) {
        if (path !== '/backend/api/auth/me' &&
          path !== 'https://physicsio.tech/backend/api/auth/me') {
          let responseClone = response.clone();

          caches.open(version).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(function() {
        return Promise.reject('No-match');
      });
    }));
});
