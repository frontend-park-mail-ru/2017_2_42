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
  '/img/chalk_input_border.png',
  '/img/chalk-background-filled.png',
  '/api/game/maps',
  '/api/game/map/53',
  // '/api/game/map/54',
  // '/api/game/map/55',
  // '/api/game/map/56',
  // '/api/game/map/58',
];

//
// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open('v1').then(function(cache) {
//       return cache.addAll(STATICS)
//         .catch((resp) => {
//         console.log('Hello', resp);
//       });
//     })
//   );
// });
//
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     fromNetwork(event.request.clone(), 5000)
//       .catch(() => fromCache(event.request.clone())));
// });
//
// const fromNetwork = (request, timeout) => {
//   return new Promise((fulfill, reject) => {
//     let timeoutId = setTimeout(reject, timeout);
//     return fetch(request).then((response) => {
//       clearTimeout(timeoutId);
//       fulfill(response);
//     });
//   });
// };
//
// self.addEventListener('activate', (event) => {
//   console.log('V1 now ready to handle fetches!');
// });
//
// const fromCache = (request) => {
//   return caches.open('v1')
//     .then((cache) => cache.match(request))
//     .then((matching) => matching || Promise.reject('no-match'));
// };


const version = 'v2';

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
        let responseClone = response.clone();

        caches.open(version).then(function(cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function() {
        return Promise.reject('No-match');
      });
    }));
});
