this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/ /',
        '/index.html',
        '/pathfinder.html',
        '/css/pathfinder.css',
        '/js/pathfinder.js',
        '/css/main.css',
        '/js/event.js',
      ]);
    })
  );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ');
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
