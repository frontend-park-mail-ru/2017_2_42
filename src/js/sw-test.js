/**
 * Created by zwirec on 07.12.2017.
 */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        '/worker.js',
        '/main.js',
        '/css/bundle.css',
        '/font/KGSecondChancesSketch.ttf',
        '/img/chalkboard.jpg',
      ]).catch((resp) => {
        'use strict';
        console.log(resp);
      });
    })
  );
});


// self.addEventListener('fetch', (event) =>
//   event.respondWith(
//     caches.match(event.request)
//       .then((resp) => resp || fetch(event.request))
//       .then((response) => caches.open('v1'))
//       .then((cache) => cache.put(event.request, response.clone()))
//       .then((resp) => response)
//       .catch((data) => console.log(data))
// ));

self.addEventListener('fetch', (event) => {
  event.respondWith(fromNetwork(event.request, 1000).catch(() => fromCache(event.request)));
});


function fromNetwork(request, timeout) {
  return new Promise((fulfill, reject) => {
    let timeoutId = setTimeout(reject, timeout);
    return fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}


function fromCache(request) {
  console.log('The service worker is serving the asset.');
  caches.open('v1')
    .then((cache) => cache.match(request))
    .then((matching) => matching || Promise.reject('no-match'));
}

// self.addEventListener('fetch', function(evt) {
//   console.log('The service worker is serving the asset.');
//   evt.respondWith(fromCache(evt.request));
// });