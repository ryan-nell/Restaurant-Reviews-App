const cacheName = 'v1';

// Array consisting of cached files
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// Listen to registered service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      // Cache files
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Check if the event request url already exists
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      //Fetch request and 
      else {
        return fetch(event.request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, responseClone);
            })
            return response;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
  );
});
