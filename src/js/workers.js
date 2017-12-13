const STATICS = [
  '/',
  '/main.js',
  '/css/bundle.css',
  '/font/KGSecondChancesSketch.ttf',
  '/img/chalkboard.jpg',
  '/img/configuration.svg',
  '/img/exclamation.svg',
  '/img/speaker.svg',
  '/img/chalkboard_green_1280.jpg',
  '/img/chalkboard_green_1600.jpg',
  '/img/chalkboard_green_1920.jpg',
  '/img/chalkboard_green_2048.jpg',
  '/img/chalkboard_green_2560.jpg',
  '/img/chalkboard_green_3840.jpg',
  '/img/chalkboard_green_4096.jpg',
  '/img/vkontakte-draw.svg',
  '/img/chalk_input_border.png',
  '/img/chalk-background-filled.png',
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(STATICS)
        .catch((resp) => {
        console.log(resp);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fromNetwork(event.request, 1000)
      .catch(() => fromCache(event.request)));
});

const fromNetwork = (request, timeout) => {
  return new Promise((fulfill, reject) => {
    let timeoutId = setTimeout(reject, timeout);
    return fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
};

const fromCache = (request) => {
  return caches.open('v1')
    .then((cache) => cache.match(request))
    .then((matching) => matching || Promise.reject('no-match'));
};
