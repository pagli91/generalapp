/* Generalapp - service worker
   Cachea la app para que funcione sin internet.
   Si actualizás la app, cambiá el numero de version (v1 -> v2) para forzar la renovacion. */
const CACHE = 'generalapp-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); })
          .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; })
                             .map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;

  var accept = req.headers.get('accept') || '';
  var isHTML = req.mode === 'navigate' || accept.indexOf('text/html') !== -1;

  if (isHTML) {
    // La app: primero internet (para actualizarse), si no hay, la version cacheada.
    e.respondWith(
      fetch(req).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE).then(function(c){ c.put('./index.html', copy); });
        return resp;
      }).catch(function(){
        return caches.match('./index.html').then(function(r){ return r || caches.match('./'); });
      })
    );
  } else {
    // Iconos y manifest: primero cache, si no esta, lo pide y lo guarda.
    e.respondWith(
      caches.match(req).then(function(cached){
        return cached || fetch(req).then(function(resp){
          var copy = resp.clone();
          caches.open(CACHE).then(function(c){ try { c.put(req, copy); } catch(_){} });
          return resp;
        });
      })
    );
  }
});
