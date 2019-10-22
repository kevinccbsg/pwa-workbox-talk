importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.routing.registerNavigationRoute('/index.html');

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '383676' },
  // { url: /static\/media\/*\.(svg|woff|eot|ttf)/, revision: '383676' },
  // { url: /locales\/*\.json/, revision: '383676' },
]);

workbox.routing.registerRoute(
  // cahce JS bunlde
  /\.js$/,
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'js-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache for 10 hours.
        maxAgeSeconds: 1 * 10 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  // Cache CSS files.
  /\.css$/,
  // Use cache but update in the background.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache for 10 hours.
        maxAgeSeconds: 1 * 10 * 60 * 60,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  // Cache json locales.
  /\.json$/,
  // Use cache but update in the background.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'json-cache',
  }),
);

workbox.routing.registerRoute(
  // Cache image files.
  /https:\/\/(images-na.ssl-images-amazon|i.imgur).com\/.*.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new workbox.strategies.CacheFirst({
    // Use a custom cache name.
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  // cache API routes with cache header and status code 200
  /https:\/\/rallycoding.herokuapp.com\/api\/music_albums/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
        headers: {
          'X-Is-Cacheable': 'true',
        },
      }),
    ],
  }),
);
