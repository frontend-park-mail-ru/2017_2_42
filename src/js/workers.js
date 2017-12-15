const STATICS = [
  '/',
  '/kjhkjhkjh',
  '/main.js',
  '/css/bundle.css',
  '/font/KGSecondChancesSketch.ttf',
  '/img/configuration.svg',
  '/img/exclamation.svg',
  '/img/speaker.svg',
  '/img/vkontakte-draw.svg',
  '/img/chalk_input_border.png',
  '/img/chalk-background-filled.png',
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(STATICS)
        .catch((resp) => {
        console.log('Hello', resp);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fromNetwork(event.request.clone(), 5000)
      .catch(() => fromCache(event.request.clone())));
});

const fromNetwork = (request, timeout) => {
  return new Promise((fulfill, reject) => {
    let timeoutId = setTimeout(reject, timeout);
    return fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
    });
  });
};

const fromCache = (request) => {
  return caches.open('v1')
    .then((cache) => cache.match(request))
    .then((matching) => matching || Promise.reject('no-match'));
};
